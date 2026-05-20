import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUserField } from '../../common/custom-request/request-with-user';
import { ActiveUserData } from '../interface/active-users.interface';

export const ActiveUser = createParamDecorator(
    (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<RequestWithUserField>();
        const user = request.user;
        console.log(field);

        return field ? user?.[field] : user;
    },
);
