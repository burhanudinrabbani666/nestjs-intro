import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        UsersModule,
        PostsModule,
        AuthModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'nestjs_blog',
            username: 'rabbani',
            password: 'rabbani',
            synchronize: true,
            entities: [],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
