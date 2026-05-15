import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Posts } from './posts/posts.entity';

@Module({
    imports: [
        UsersModule,
        PostsModule,
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
                entities: [User, Posts],
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
