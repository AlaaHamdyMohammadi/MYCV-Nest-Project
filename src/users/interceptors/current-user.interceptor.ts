/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private userServ: UsersService){

    }

    async intercept(context: ExecutionContext, handler: CallHandler){
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};
        if(userId){
            const user = await this.userServ.findOne(userId);
            request.currentUser = user;
        }
        return handler.handle();
    }

}