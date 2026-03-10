import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { User } from 'generated/prisma/client';
import { JwtPayload } from 'src/common/types';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async authenticate(username: string, password: string) {
        const user = await this.userService.getUserByUsername(username);

        if (!user || user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async generateTokens(user: User) {
        const payload: JwtPayload = {
            sub: user.id,
            role: user.role,
            username: user.username,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.getOrThrow<number>(
                'JWT_ACCESS_EXPIRES_IN',
            ),
        });

        const refreshExpiresIn = this.configService.getOrThrow<number>(
            'JWT_REFRESH_EXPIRES_IN',
        );

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
            expiresIn: refreshExpiresIn,
        });

        await this.prismaService.refresh.create({
            data: {
                userId: user.id,
                token: refreshToken,
                expiresIn: new Date(Date.now() - refreshExpiresIn * 1000),
            },
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async logout(refreshToken: string) {
        const token = await this.prismaService.refresh.findFirst({
            where: { token: refreshToken },
        });

        if (!token) {
            throw new UnauthorizedException('Invalid token');
        }

        await this.prismaService.refresh.deleteMany({
            where: { token: refreshToken },
        });

        return { message: 'Logged out successfully' };
    }

    async refresh(token: string) {
        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(
                token,
                {
                    secret: this.configService.getOrThrow<string>(
                        'JWT_REFRESH_SECRET',
                    ),
                },
            );

            const refreshToken = await this.prismaService.refresh.findFirst({
                where: { token },
            });

            if (!refreshToken || refreshToken.expiresIn < new Date()) {
                throw new UnauthorizedException('Invalid or expired token');
            }

            const accessToken = await this.jwtService.signAsync(payload, {
                secret: this.configService.getOrThrow<string>(
                    'JWT_ACCESS_SECRET',
                ),
            });

            return accessToken;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
