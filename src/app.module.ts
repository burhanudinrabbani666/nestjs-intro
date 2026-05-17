import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

@Module({
    imports: [
        UsersModule,
        PostsModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        TypeOrmModule.forRootAsync({
            imports: [],
            inject: [],
            useFactory: () => ({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                synchronize: true,
                database: 'nestjs_blog',
                username: 'rabbani',
                password: 'rabbani',
                autoLoadEntities: true,
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
