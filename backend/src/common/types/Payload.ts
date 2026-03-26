import { UserRole } from 'generated/prisma/enums';

export interface Payload {
    id: string;
    fullname: string;
    username: string;
    role: UserRole;
    storeId: string;
}
