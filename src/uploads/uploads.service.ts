import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import type { Express } from 'express';
import { Repository } from 'typeorm';
import { Upload } from './upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadToAwsProvider } from './providers/upload-to-aws.provider';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from './interfaces/upload-file.interfaces';
import { fileTypes } from './enums/file-type.enum';

@Injectable()
export class UploadsService {
    constructor(
        /**
         * Inject uplaodRepository
         */
        @InjectRepository(Upload)
        private readonly uploadRpository: Repository<Upload>,
        /**
         * Inject uploadToAws
         */
        private readonly uploadToAwsProvider: UploadToAwsProvider,
        /**
         * Inject ConfigService
         */
        private readonly configService: ConfigService,
    ) {}

    public async uploadFile(file: Express.Multer.File) {
        try {
            if (
                !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                    file.mimetype,
                )
            ) {
                throw new BadRequestException('Mime type not supported');
            }
            // Upload to the file to AWS S3
            const name = await this.uploadToAwsProvider.fileUpload(file);

            // Generate to a new entry in database
            const uploadFile: UploadFile = {
                name,
                path: `https://${this.configService.get('appConfig.awsCloudFront')}/${name}`,
                type: fileTypes.IMAGE,
                mime: file.mimetype,
                size: file.size,
            };

            const upload = this.uploadRpository.create(uploadFile);

            return await this.uploadRpository.save(upload);
        } catch (error) {
            throw new ConflictException(error);
        }
    }
}
