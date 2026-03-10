import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            always: true,
        }),
    );

    app.use(cookieParser());

    app.setGlobalPrefix('api');

    const configService = app.get(ConfigService);

    const port = configService.getOrThrow<number>('SERVER_PORT');

    await app.listen(port);
}

void bootstrap();
