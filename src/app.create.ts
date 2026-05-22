import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export function appCreate(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    /** --------------------------------------- /
     * Swagger Documentation Config             /
     ----------------------------------------- */
    const swaggerConfig = new DocumentBuilder()
        .setTitle('NestJS MasterClass - Blog app API')
        .setDescription('Use the base API URL as http://localhost:3000')
        .setTermsOfService('http://localhost:3000/terms-and-service')
        .setLicense('MIT License', '')
        .addServer('http://localhost:3000')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    // Setup AWS s3 Bucket
    const configService = app.get(ConfigService);
    config.update({
        credentials: {
            accessKeyId: configService.get('appConfig.awsAccessKeyId') ?? '',
            secretAccessKey:
                configService.get('appConfig.awsSecretAccessKey') ?? '',
        },
        region: configService.get('appConfig.awsRegion') ?? '',
    });

    app.enableCors();
}
