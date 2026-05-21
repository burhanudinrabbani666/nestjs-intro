import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { DataResponse } from '../../interfaces/data-response.interface';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
    constructor(private readonly configService: ConfigService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before....');
        return next.handle().pipe(
            map(
                (data) =>
                    ({
                        apiVersion: this.configService.get(
                            'appConfig.apiVersion',
                        ),
                        data: data,
                    }) as DataResponse,
            ),
        );
    }
}
