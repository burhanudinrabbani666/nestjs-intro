import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'nestjs_blog',
    entities: ['**/*.entity.js'],
    migrations: ['migrations/*.js'],
});
