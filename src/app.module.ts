import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import appConfig from './config/configuration';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { PaginationModule } from './common/pagination/pagination.module';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        UsersModule,
        PostsModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: !ENV ? '.env' : `.env.${ENV}.local`,
            load: [appConfig, databaseConfig],
            validationSchema: environmentValidation,
        }),
        AuthModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('database.host'),
                port: +configService.get('database.port'),
                database: configService.get('database.database'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                synchronize: configService.get('database.synchronize'),
                autoLoadEntities: configService.get(
                    'database.autoLoadEntities',
                ),
                // entities: [User, Posts],
            }),
        }),
        TagsModule,
        MetaOptionsModule,
        PaginationModule,
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
    ],
})
export class AppModule {}
