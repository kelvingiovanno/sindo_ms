import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(username: string, password: string) {
        const user = await this.prismaService.user.findUnique({
            where: { username },
        });

        if (!user || user.password !== password) {
            throw new ForbiddenException('Invalid credentials');
        }

        const accessToken = await this.jwtService.signAsync(user, {
            secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.getOrThrow<number>(
                'JWT_ACCESS_EXPIRES_IN',
            ),
        });

        const refreshToken = await this.jwtService.signAsync(user, {
            secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.getOrThrow<number>(
                'JWT_REFRESH_EXPIRES_IN',
            ),
        });

        return {
            accessToken,
            refreshToken,
            user,
        };
    }
}
