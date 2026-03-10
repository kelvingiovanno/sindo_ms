import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { User } from 'generated/prisma/client';
import { JwtAuthGuard } from 'src/common/guards';
import type { AuthRequest } from 'src/common/types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Post('me')
    @HttpCode(HttpStatus.OK)
    me(@Req() req: AuthRequest) {
        return req.user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = req.user;
        const tokens = await this.authService.generateTokens(user as User);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
        });

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('signout')
    @HttpCode(HttpStatus.OK)
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @Body('refresh_token') refreshToken: string,
    ) {
        const cookies = req.cookies;

        for (const cookie in cookies) {
            res.clearCookie(cookie);
        }

        await this.authService.logout(refreshToken);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body('refresh_token') refreshToken: string) {
        const accessToken = await this.authService.refresh(refreshToken);
        return {
            accessToken: accessToken,
        };
    }
}
