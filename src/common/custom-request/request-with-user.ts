import { Request } from 'express';

export interface RequestWithUserField extends Request {
    user: unknown;
}
