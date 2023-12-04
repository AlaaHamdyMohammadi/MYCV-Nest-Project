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
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userServ: UsersService,
    private authServ: AuthService,
  ) {}

//   @Get('/whoami')
//   whoAmI(@Session() session: any) {
//     return this.userServ.findOne(session.userId);
//   }

  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any){
    session.userId = null
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    //this.userServ.create(body.email, body.password);
    const user = await this.authServ.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authServ.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

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
