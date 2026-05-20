import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import profileConfig from './config/profile.config';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthModule } from '../auth/auth.module';
import { CreateUserProviders } from './providers/create-user.providers';
import { FindOneUserByEmailProviders } from './providers/find-one-user-by-email.providers';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersCreateManyProvider,
        CreateUserProviders,
        FindOneUserByEmailProviders,
    ],
    exports: [UsersService],
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User]),
        ConfigModule.forFeature(profileConfig),
    ],
})
export class UsersModule {}
