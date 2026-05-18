import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { type Request } from 'express';

@Injectable()
export class PaginationProvider {
    constructor(
        @Inject(REQUEST)
        private readonly request: Request,
    ) {}

    public async paginateQuery<T extends ObjectLiteral>(
        paginationQuery: PaginationQueryDto,
        repository: Repository<T>,
    ) {
        const { limit, page } = paginationQuery;
        const result = await repository.find({
            take: limit ? limit : 10,
            skip: (page ? page - 1 : 0) * (limit ? limit : 10),
        });

        /**
         *  Create The Request URL
         */

        const baseURL =
            this.request.protocol + '://' + this.request.headers.host + '/';
        const newUrl = new URL(this.request.url, baseURL);

        /**
         * Calculate page number
         */

        const totalItems = await repository.count();
        const totalPages = Math.ceil(totalItems / (paginationQuery.limit ?? 1));
        const nextPage =
            paginationQuery.page === totalPages
                ? paginationQuery.page
                : (paginationQuery.page ?? 1) + 1;
        const previousPage =
            paginationQuery.page === 1
                ? paginationQuery.page
                : (paginationQuery.page ?? 1) - 1;

        return result;
    }
}
