/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, Get, Param, Patch, Delete, Query, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

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
        const user = this.userServ.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string){
        return this.userServ.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: number){
        return this.userServ.remove(id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.userServ.update(parseInt(id), body);
    }
}
