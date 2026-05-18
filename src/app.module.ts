import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { appConfig } from './config/configuration';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        UsersModule,
        PostsModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: !ENV ? '.env' : `.env.${ENV}.local`,
            load: [appConfig],
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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
