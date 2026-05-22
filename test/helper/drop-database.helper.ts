import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(
    configService: ConfigService,
): Promise<void> {
    const appDataSource = await new DataSource({
        type: 'postgres',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        database: configService.get('database.database'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        synchronize: configService.get('database.synchronize'),
    }).initialize();

    await appDataSource.dropDatabase();
    await appDataSource.destroy();
}
