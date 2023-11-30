/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, Get, Param, Patch, Query } from '@nestjs/common';
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

    @Get('/:id')
    findUser(@Param('id') id: string){
        return this.userServ.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string){
        return this.userServ.find(email);
    }
}
