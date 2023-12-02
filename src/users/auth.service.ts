/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService{
    constructor(private usersServ: UsersService){}
}