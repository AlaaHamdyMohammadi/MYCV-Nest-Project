/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        console.log(request.session.userId);
        return 'Hi There!';
    }
)