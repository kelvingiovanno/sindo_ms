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
import { User } from 'generated/prisma/client';
import { LocalGuard, JwtGuard } from 'src/common/guards';
import { type AuthRequest } from 'src/common/types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalGuard)
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Req() req: Request) {
        const user = req.user as User;
        return await this.authService.login(user.id);
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
        });

        return {
            accessToken: action.accessToken,
        };
    }

    @UseGuards(JwtGuard)
    @Post('switch-store')
    @HttpCode(HttpStatus.OK)
    async switchStore(
        @Req() req: AuthRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = req.user;

        const action = await this.authService.switchStore(
            user.storeId,
            user.sub,
        );

        res.clearCookie('refreshToken');

        res.cookie('refreshToken', action.newRefreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            path: '/auth/refresh',
        });

        return {
            accessToken: action.newAccessToken,
        };
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Req() req: Request) {
        const refreshToken = req.cookies.refreshToken as string;
        const accessToken = await this.authService.refresh(refreshToken);
        return {
            accessToken: accessToken,
        };
    }

    @UseGuards(JwtGuard)
    @Post('signout')
    @HttpCode(HttpStatus.OK)
    async signout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const refreshToken = req.cookies.refreshToken as string;
        await this.authService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return { message: 'Signed out successfully' };
    }
}
