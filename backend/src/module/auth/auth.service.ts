import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { Payload } from 'src/common/types';
import { StoreAccessService } from '../store-access/store-access.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly storeAccessService: StoreAccessService,
    ) {}

    async authenticate(username: string, password: string) {
        const user = await this.userService.getUserByUsername(username);

        if (!user || user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async login(userId: string) {
        const stores = await this.storeAccessService.getUserStoreAccess(userId);
        return {
            userId,
            stores,
        };
    }

    async selectStore(storeId: string, userId: string) {
        const storeAccess = await this.storeAccessService.validateStoreAccess(
            storeId,
            userId,
        );

        if (!storeAccess) {
            throw new ForbiddenException('Store access denied');
        }

        const payload: Payload = {
            sub: storeAccess.userId,
            username: storeAccess.users.username,
            role: storeAccess.users.role,
            storeId: storeAccess.storeId,
        };

        const accessToken = await this.gAccessToken(payload);
        const refreshToken = await this.gRefreshToken(payload);

        const expiresIn = Number(
            this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN'),
        );

        await this.prismaService.refresh.deleteMany({
            where: { userId: userId },
        });

        await this.prismaService.refresh.create({
            data: {
                token: refreshToken,
                userId,
                expiresIn: new Date(Date.now() + expiresIn * 1000),
            },
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async switchStore(storeId: string, userId: string) {
        const storeAccess = await this.storeAccessService.validateStoreAccess(
            storeId,
            userId,
        );

        if (!storeAccess) {
            throw new ForbiddenException('Store access denied');
        }

        const newPayload: Payload = {
            sub: storeAccess.userId,
            username: storeAccess.users.username,
            role: storeAccess.users.role,
            storeId: storeAccess.storeId,
        };

        const newAccessToken = await this.gAccessToken(newPayload);
        const newRefreshToken = await this.gRefreshToken(newPayload);

        const expiresIn = Number(
            this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN'),
        );

        await this.prismaService.refresh.deleteMany({
            where: { userId: userId },
        });

        await this.prismaService.refresh.create({
            data: {
                token: newRefreshToken,
                userId,
                expiresIn: new Date(Date.now() + expiresIn * 1000),
            },
        });

        return {
            newAccessToken,
            newRefreshToken,
        };
    }

    async logout(userId: string) {
        const deleteToken = await this.prismaService.refresh.deleteMany({
            where: { userId },
        });

        if (deleteToken.count === 0) {
            throw new NotFoundException('User not found');
        }
    }

    async refresh(token: string) {
        try {
            const payload = await this.vRefreshToken(token);

            const refreshToken = await this.prismaService.refresh.findFirst({
                where: { token },
                include: {
                    user: {
                        select: {
                            isRevoked: true,
                        },
                    },
                },
            });

            if (
                !refreshToken ||
                refreshToken.expiresIn < new Date() ||
                refreshToken.user.isRevoked
            ) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const accessToken = await this.gAccessToken(payload);

            return accessToken;
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    private async gAccessToken(payload: Payload): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
            expiresIn: Number(
                this.configService.getOrThrow<number>('JWT_ACCESS_EXPIRES_IN'),
            ),
        });
    }

    private async gRefreshToken(payload: Payload): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
            expiresIn: Number(
                this.configService.getOrThrow<number>('JWT_REFRESH_EXPIRES_IN'),
            ),
        });
    }

    private async vRefreshToken(token: string) {
        const payload = await this.jwtService.verifyAsync<Payload>(token, {
            secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        });

        const newPayload: Payload = {
            sub: payload.sub,
            username: payload.username,
            role: payload.role,
            storeId: payload.storeId,
        };

        return newPayload;
    }
}
