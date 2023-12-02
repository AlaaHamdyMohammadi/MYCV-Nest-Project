/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService{
    constructor(private usersServ: UsersService){}

    async signup(email: string, password: string){
        // 1. See if email is in use
        const users = await this.usersServ.find(email);
        if(users.length){
            throw new BadRequestException('Email in use');
        }

        // 2. Hash the users password

        // 3. Create a new user and save it

        // 4. Return the user 
    }

    signin(){}
}