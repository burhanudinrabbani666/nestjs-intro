import { Injectable } from '@nestjs/common';
import { HasingProviders } from './hasing.providers';
import * as bycrpt from 'bcrypt';

@Injectable()
export class BcryptProviders implements HasingProviders {
    public async hashPassword(data: string | Buffer): Promise<string> {
        const salt = await bycrpt.genSalt();
        return bycrpt.hash(data, salt);
    }

    public async comparePassword(
        data: string | Buffer,
        encrypted: string,
    ): Promise<boolean> {
        return await bycrpt.compare(data, encrypted);
    }
}
