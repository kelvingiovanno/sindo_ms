import type { UserRole } from '../user';

export interface Auth {
    id: string;
    fullname: string;
    username: string;
    role: UserRole;
    storeId: string;
}
