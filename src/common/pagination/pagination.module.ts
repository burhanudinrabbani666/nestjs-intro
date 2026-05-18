import { Module } from '@nestjs/common';
import { PaginationProvider } from './provider/pagination.provider';

@Module({
    providers: [PaginationProvider],
})
export class PaginationModule {}
