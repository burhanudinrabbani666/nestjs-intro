import { Request } from 'express';
import { JwtPayloadInterface } from '../../auth/interface/jwt-payload.interface';

export interface RequestWithUserField extends Request {
    user: JwtPayloadInterface;
}
