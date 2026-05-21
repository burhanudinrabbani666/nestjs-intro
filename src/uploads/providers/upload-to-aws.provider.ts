/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import path from 'node:path';
import { v4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
    constructor(private readonly configService: ConfigService) {}

    public async fileUpload(file: Express.Multer.File) {
        const s3 = new S3();

        try {
            const uploadResult = await s3
                .upload({
                    Bucket:
                        this.configService.get('appConfig.awsBucketName') ?? '',
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    Body: file.buffer,
                    Key: this.generateFileName(file),
                    ContentType: '',
                })
                .promise();

            return uploadResult.Key;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    private generateFileName(file: Express.Multer.File) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const name = file.originalname.split('.')[0];

        // extract file name
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        name.replace(/\s/g, '').trim();

        // Remove white spaces
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        const extension = path.extname(file.originalname);

        // Extract the extension
        // Generate time stamp
        const timestamp = new Date().toString().trim();

        // return
        return `${name}-${timestamp}-${v4()}${extension}`;
    }
}
