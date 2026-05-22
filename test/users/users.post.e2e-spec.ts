import { INestApplication } from '@nestjs/common';
import { dropDatabase } from '../helper/drop-database.helper';
import { bootstarpNestApplication } from '../helper/bootstrap-nest=application.helper';
import { ConfigService } from '@nestjs/config';
import { App } from 'supertest/types';
import request from 'supertest';
import {
    completeUser,
    missingEmail,
    missingFirstName,
    missingPassword,
} from './users.post.e2e-spec.sample-data';

describe('[userController] @Post Endpoints (e2e)', () => {
    let app: INestApplication<App>;
    let config: ConfigService;
    let httpServer: App;

    beforeEach(async () => {
        app = await bootstarpNestApplication(); // Instanting the app
        config = app.get(ConfigService); // Extract the config
        httpServer = app.getHttpServer();
    });

    afterEach(async () => {
        await dropDatabase(config);
        await app.close();
    });

    it('/users - Endpoint is public', () => {
        return request(httpServer).post('/users').send({}).expect(400);
    });

    it('/users - firstName is mandatory', () => {
        return request(httpServer)
            .post('/users')
            .send(missingFirstName)
            .expect(400);
    });

    it('/users - email is mandatory', () => {
        return request(httpServer)
            .post('/users')
            .send(missingEmail)
            .expect(400);
    });

    it('/users - password is mandatory', () => {
        return request(httpServer)
            .post('/users')
            .send(missingPassword)
            .expect(400);
    });

    it.todo('/users - valid request succesfully create user');
    it.todo('/users - password is not returned in response');
    it.todo('/users - googleId is not returned in response');
});
