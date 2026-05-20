import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import profileConfig from './config/profile.config';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersCreateManyProvider } from './provider/users-create-many.provider';
import { CreateUserProviders } from './providers/create-user.providers';
import { FindOneUserByEmailProviders } from './providers/find-one-user-by-email.providers';
import jwtConfig from '../auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

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
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
    ],
})
export class UsersModule {}
