import { INestApplication } from '@nestjs/common';
import { dropDatabase } from '../helper/drop-database.helper';
import { bootstarpNestApplication } from '../helper/bootstrap-nest=application.helper';
import { ConfigService } from '@nestjs/config';

describe('[userController] @Post Endpoints (e2e)', () => {
    let app: INestApplication;
    let config: ConfigService;

    beforeEach(async () => {
        app = await bootstarpNestApplication(); // Instanting the app
        config = app.get(ConfigService); // Extract the config
    });

    afterEach(async () => {
        await dropDatabase(config);
        await app.close();
    });

    it.todo('/users - Endpoint is public');
    it.todo('/users - firstName is mandatory');
    it.todo('/users - lastName is mandatory');
    it.todo('/users - email is mandatory');
    it.todo('/users - valid request succesfully create user');
    it.todo('/users - password is not returned in response');
    it.todo('/users - googleId is not returned in response');
});
