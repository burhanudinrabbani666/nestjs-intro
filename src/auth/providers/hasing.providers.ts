import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HasingProviders {
    abstract hashPassword(data: string | Buffer): Promise<string>;

    abstract comparePassword(
        data: string | Buffer,
        encrypted: string,
    ): Promise<boolean>;
}
