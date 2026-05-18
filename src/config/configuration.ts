export const appConfig = () => ({
    environment: process.env.NODE_ENV,
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(`${process.env.PORT}`, 10) || 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
        autoLoadEntities:
            process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
    },
});
