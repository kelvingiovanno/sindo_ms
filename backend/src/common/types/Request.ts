import { Request } from 'express';
import { Payload } from './Payload';
import { User } from 'generated/prisma/client';

export interface JwtRequest extends Request {
    user: Payload;
}

export interface LocalRequest extends Request {
    user: User;
}
