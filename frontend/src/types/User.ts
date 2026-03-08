export type UserRole = 'ADMIN' | 'STAFF';

export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}