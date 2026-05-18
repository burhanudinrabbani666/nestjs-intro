import { Injectable } from '@nestjs/common';
import { HasingProviders } from './hasing.providers';

@Injectable()
export class BcryptProviders implements HasingProviders {
    hashPassword(data: string | Buffer): Promise<string> {
        throw new Error('Method not Implemented');
    }

    comparePassword(
        data: string | Buffer,
        encrypted: string,
    ): Promise<boolean> {
        throw new Error('Method not Implemented');
    }
}
