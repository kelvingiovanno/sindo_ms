export type UserRole = 'VIEWER' | 'STAFF' | 'ADMIN';

export interface User {
    id: string;
    username: string;
    role: UserRole;
    fullname: string;
    password: string;
    isRevoked: boolean;
    createdAt: Date;
    updatedAt: Date;
}
