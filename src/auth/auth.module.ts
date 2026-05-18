import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { HasingProviders } from './providers/hasing.providers';
import { BcryptProviders } from './providers/bcrypt.providers';

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: HasingProviders,
            useClass: BcryptProviders,
        },
    ],
    exports: [AuthService],
    imports: [forwardRef(() => UsersModule)],
})
export class AuthModule {}
