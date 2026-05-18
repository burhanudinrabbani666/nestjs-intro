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

    /** Explanation Step by Step
     * Paginates a TypeORM repository query and returns structured data with metadata and navigation links.
     *
     * @typeParam T - Entity type that extends `ObjectLiteral` (any TypeORM entity)
     * @param paginationQuery - DTO containing pagination parameters (`limit` and `page`)
     * @param repository - TypeORM `Repository<T>` of the target entity
     * @returns A `Promise<Paginated<T>>` containing:
     *   - `data`  — the fetched records for the current page
     *   - `meta`  — pagination metadata (current page, total pages, total items, items per page)
     *   - `links` — navigation URLs (first, last, current, next, previous)
     *
     *
     *
     * ### How it works, step by step:
     *
     * **Step 1 — Resolve defaults**
     * Destructures `limit` and `page` from `paginationQuery`.
     * Falls back to `limit = 10` and `page = 1` if not provided.
     *
     * **Step 2 — Fetch paginated records**
     * Calls `repository.find()` with:
     *   - `take` → how many rows to fetch (= limit)
     *   - `skip` → how many rows to skip (= (page - 1) * limit)
     *
     * **Step 3 — Build the base URL**
     * Reconstructs the full request URL from `this.request` (protocol + host + path)
     * using the native `URL` class, to be used for building navigation links.
     *
     * **Step 4 — Count total items**
     * Calls `repository.count()` to get the total number of records in the table.
     *
     * **Step 5 — Calculate total pages**
     * Divides `totalItems` by `limit` and rounds up with `Math.ceil()`.
     *
     * **Step 6 — Determine next & previous page**
     *   - `nextPage`     → `currentPage + 1`, clamped at `totalPages`
     *   - `previousPage` → `currentPage - 1`, clamped at `1`
     *
     * **Step 7 — Assemble and return the final response**
     * Builds the `Paginated<T>` object with `data`, `meta`, and `links`, then returns it.
     */
    public async paginateQuery<T extends ObjectLiteral>(
        paginationQuery: PaginationQueryDto,
        repository: Repository<T>,
    ): Promise<Paginated<T>> {
        const { limit, page } = paginationQuery;
        const result = await repository.find({
            take: limit ? limit : 10,
            skip: (page ? page - 1 : 0) * (limit ? limit : 10),
        });

        const baseURL =
            this.request.protocol + '://' + this.request.headers.host + '/';
        const newUrl = new URL(this.request.url, baseURL);
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
