/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userServ: UsersService,
    private authServ: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    // console.log(body);
    //this.userServ.create(body.email, body.password);
    return this.authServ.signup(body.email, body.password);
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto){
    return this.authServ.signin(body.email, body.password);
  }

  //   @UseInterceptors(new SerializeInterceptor(UserDto))

  @Get('/:id')
  findUser(@Param('id') id: string) {
    console.log('handler is running...');
    const user = this.userServ.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userServ.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    return this.userServ.remove(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userServ.update(parseInt(id), body);
  }
}
