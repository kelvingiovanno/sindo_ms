import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import {
    Prisma,
    PrismaClient,
    InventoryStatus,
    UserRole,
} from '../generated/prisma/client';
import { faker } from '@faker-js/faker';

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

    const user = await prisma.user.upsert({
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

    const stores = await Promise.all(
        Array.from({ length: 3 }).map(() => {
            const name = `PT ${faker.company.name()} Diesel`;

            return prisma.store.upsert({
                where: { name },
                update: {},
                create: { name },
            });
        }),
    );

    await prisma.storeAccess.createMany({
        data: stores.map((store) => ({
            userId: user.id,
            storeId: store.id,
        })),
    });

    const categories = await Promise.all(
        [
            'Engine Parts',
            'Hydraulic System',
            'Electrical Components',
            'Filters',
            'Cooling System',
            'Fuel System',
        ].map((name) =>
            prisma.inventoryCategory.create({
                data: {
                    name,
                },
            }),
        ),
    );

    const models = await Promise.all(
        [
            'S6R',
            'S12R',
            'S16R',
            'S4L2',
            'S4Q2',
            '6BT',
            '4BT',
            'QSB6.7',
            'QSC8.3',
            'ISX15',
            'YANMAR 4TNV98',
            'YANMAR 3TNV88',
            'YANMAR 6LY2',
            'CAT C7',
            'CAT C9',
            'CAT 320D',
            'KUBOTA V3300',
            'KUBOTA D902',
            'PERKINS 1104D',
            'PERKINS 403D',
            'ISUZU 4JJ1',
            'ISUZU 6HK1',
        ].map((name) =>
            prisma.inventoryModel.create({
                data: {
                    name,
                },
            }),
        ),
    );

    const brands = await Promise.all(
        [
            'Caterpillar Marine',
            'Cummins Marine',
            'Yanmar Marine',
            'Volvo Penta',
            'MAN Energy Solutions',
            'MTU Friedrichshafen',
            'Scania Marine',
            'Deutz Marine',
        ].map((name) =>
            prisma.inventoryBrand.create({
                data: { name },
            }),
        ),
    );

    const inventoryUnits = await Promise.all(
        [
            { name: 'pieces', symbol: 'pcs' },
            { name: 'unit', symbol: 'unit' },
            { name: 'set', symbol: 'set' },
            { name: 'box', symbol: 'box' },
            { name: 'pack', symbol: 'pack' },
            { name: 'kilogram', symbol: 'kg' },
            { name: 'gram', symbol: 'g' },
            { name: 'liter', symbol: 'L' },
            { name: 'milliliter', symbol: 'mL' },
            { name: 'meter', symbol: 'm' },
            { name: 'roll', symbol: 'roll' },
            { name: 'pair', symbol: 'pair' },
            { name: 'kit', symbol: 'kit' },
            { name: 'dozen', symbol: 'doz' },
            { name: 'drum', symbol: 'drum' },
            { name: 'pail', symbol: 'pail' },
            { name: 'barrel', symbol: 'bbl' },
            { name: 'carton', symbol: 'ctn' },
        ].map((unit) =>
            prisma.inventoryUnit.create({
                data: {
                    name: unit.name,
                    symbol: unit.symbol,
                },
            }),
        ),
    );

    const suppliers = await Promise.all(
        Array.from({ length: 10 }).map(() => {
            return prisma.supplier.create({
                data: {
                    name: faker.person.fullName(),
                    phone: faker.phone.number(),
                    email: faker.internet.email(),
                    address: faker.location.streetAddress(),
                },
            });
        }),
    );

    await Promise.all(
        Array.from({ length: 50 }, () => {
            const store = faker.helpers.arrayElement(stores);
            const category = faker.helpers.arrayElement(categories);
            const brand = faker.helpers.arrayElement(brands);
            const model = faker.helpers.arrayElement(models);
            const unit = faker.helpers.arrayElement(inventoryUnits);
            const supplier = faker.helpers.arrayElement(suppliers);

            const cost = new Prisma.Decimal(
                faker.number.float({ min: 10, max: 500 }),
            );

            const stock = new Prisma.Decimal(
                faker.number.int({ min: 30, max: 300 }),
            );

            const minStock = new Prisma.Decimal(
                faker.number.int({ min: 30, max: 300 }),
            );

            const price = cost.mul(faker.number.float({ min: 1.2, max: 1.8 }));

            let status: InventoryStatus;

            if (stock > minStock) {
                status = 'IN_STOCK';
            } else if (stock < minStock) {
                status = 'IN_STOCK';
            } else {
                status = 'OUT_OF_STOCK';
            }

            return prisma.inventory.create({
                data: {
                    storeId: store.id,
                    sku: faker.string.uuid().slice(-5),
                    name: `${brand.name} ${faker.commerce.productName()}`,
                    partnumber: faker.string.alphanumeric(8).toUpperCase(),
                    description: faker.commerce.productDescription(),
                    cost,
                    price,
                    stock: stock,
                    minStock: minStock,
                    status: status,
                    categoryId: category.id,
                    brandId: brand.id,
                    modelId: model.id,
                    unitId: unit.id,
                    supplierId: supplier.id,
                },
            });
        }),
    );

    console.log('seeded');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
