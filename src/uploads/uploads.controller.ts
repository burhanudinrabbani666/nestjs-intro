import {
    Controller,
    Inject,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { type Express } from 'express';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
    constructor(
        @Inject(UploadsService)
        private readonly uploadsService: UploadsService,
    ) {}

    @UseInterceptors(FileInterceptor('file'))
    @Post('file')
    @ApiHeaders([
        { name: 'Content-Type', description: 'multipart/form-data' },
        { name: 'Authorization', description: 'Bearer token' },
    ])
    @ApiOperation({ summary: 'Uplaod new image To server' })
    public uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.uploadsService.uploadFile(file);
    }
}
