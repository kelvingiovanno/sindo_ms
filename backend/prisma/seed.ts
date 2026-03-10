import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient, UserRole } from '../generated/prisma/client';
// import bcrypt from 'bcrypt';

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 10),
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const passwordHash = 'superadmin123';

    await prisma.user.upsert({
        where: {
            username: 'superadmin',
        },
        update: {},
        create: {
            fullname: 'Super Admin',
            username: 'superadmin',
            password: passwordHash,
            role: UserRole.ADMIN,
        },
    });

    console.log('Super admin created');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
