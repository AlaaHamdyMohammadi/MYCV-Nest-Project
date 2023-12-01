/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToClass } from "class-transformer";

export class SerializeInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        // Run something before a request is handled
        // By the request handler
        console.log('Iam runnig before the handler' ,context);

        return next.handle().pipe(
            map((data: any) => {
                // Run before the response is sent out
                console.log('Iam running before response is sent out', data)
            })
        )
    }
}