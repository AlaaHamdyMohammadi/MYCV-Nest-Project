/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userServ: UsersService){}
    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        // console.log(body);
        this.userServ.create(body.email, body.password)
    }
}
