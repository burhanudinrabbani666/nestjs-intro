import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class PaginationProvider {
    public async paginateQuery<T extends ObjectLiteral>(
        paginationQuery: PaginationQueryDto,
        repository: Repository<T>,
    ) {
        const { limit, page } = paginationQuery;
        const result = await repository.find({
            take: limit ? limit : 10,
            skip: (page ? page - 1 : 0) * (limit ? limit : 10),
        });

        return result;
    }
}
