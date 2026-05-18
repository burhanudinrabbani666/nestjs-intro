import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { type Request } from 'express';
import { Paginated } from '../interface/paginated.interface';

@Injectable()
export class PaginationProvider {
    constructor(
        @Inject(REQUEST)
        private readonly request: Request,
    ) {}

    public async paginateQuery<T extends ObjectLiteral>(
        paginationQuery: PaginationQueryDto,
        repository: Repository<T>,
    ): Promise<Paginated<T>> {
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
        const totalPages = Math.ceil(
            totalItems / (paginationQuery.limit ?? 10),
        );
        const nextPage =
            paginationQuery.page === totalPages
                ? paginationQuery.page
                : (paginationQuery.page ?? 1) + 1;
        const previousPage =
            paginationQuery.page === 1
                ? paginationQuery.page
                : (paginationQuery.page ?? 1) - 1;

        const finalResponse: Paginated<T> = {
            data: result,
            meta: {
                itemPerPage: limit ?? 10,
                totalNumbers: totalItems,
                currentPage: paginationQuery.page ?? 1,
                totalPage: totalPages,
            },
            links: {
                first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
                last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
                current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
                next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
                previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
            },
        };
        return finalResponse;
    }
}
