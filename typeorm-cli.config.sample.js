"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'nestjs_blog',
    entities: ['**/*.entity.js'],
    migrations: ['migrations/*.js'],
});
//# sourceMappingURL=typeorm-cli.config.sample.js.map