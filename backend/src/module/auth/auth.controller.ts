import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    ParseUUIDPipe,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
import { LocalGuard, JwtGuard } from 'src/common/guards';
import type { LocalRequest, JwtRequest } from 'src/common/types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalGuard)
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Req() req: LocalRequest) {
        const user = req.user;
        const action = await this.authService.storeAccess(user.id);
        return {
            userId: user.id,
            stores: action,
        };
    }

    @Post('select-store')
    @HttpCode(HttpStatus.OK)
    async selectStore(
        @Body('storeId', ParseUUIDPipe) storeId: string,
        @Body('userId', ParseUUIDPipe) userId: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const action = await this.authService.selectStore(storeId, userId);

        res.cookie('refreshToken', action.refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            path: '/api/auth/refresh',
        });

        return action;
    }

    @UseGuards(JwtGuard)
    @Post('switch-store')
    @HttpCode(HttpStatus.OK)
    async switchStore(
        @Req() req: JwtRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = req.user;

        const action = await this.authService.switchStore(
            user.storeId,
            user.id,
        );

        res.clearCookie('refreshToken');

        res.cookie('refreshToken', action.newRefreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            path: '/api/auth/refresh',
        });

        return {
            accessToken: action.newAccessToken,
        };
    }

    @UseGuards(JwtGuard)
    @Post('store-access')
    @HttpCode(HttpStatus.OK)
    async storeAccess(@Req() req: JwtRequest) {
        const user = req.user;
        return await this.authService.storeAccess(user.id);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Req() req: Request) {
        const refreshToken = req.cookies.refreshToken as string;
        return await this.authService.refresh(refreshToken);
    }

    @UseGuards(JwtGuard)
    @Post('signout')
    @HttpCode(HttpStatus.OK)
    async signout(
        @Req() req: JwtRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        const userId = req.user.id;
        await this.authService.logout(userId);
        res.clearCookie('refreshToken');
        return { message: 'Signed out successfully' };
    }
}
