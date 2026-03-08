import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { SignInDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Res({ passthrough: true }) res: Response,
        @Body() dto: SignInDto,
    ) {
        const action = await this.authService.signIn(
            dto.username,
            dto.password,
        );

        res.cookie('access', action.accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
        });

        res.cookie('refresh', action.refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
        });

        return action.user;
    }

    @Post('signout')
    @HttpCode(HttpStatus.OK)
    signOut(@Res() res: Response) {
        res.clearCookie('access');
        res.clearCookie('refresh');
    }
}
