/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Session } from 'inspector';

const scrypt = promisify(_scrypt);


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
            // 1. Generate a salt
            const salt = randomBytes(8).toString('hex');

            // 2. Hash the salt and the password together
            const hash = (await scrypt(password, salt, 32)) as Buffer;

            // 3. Join the hashed result and the salt together
            const result = salt + '.' + hash.toString('hex');

        // 3. Create a new user and save it
        const user = await this.usersServ.create(email, result);

        // 4. Return the user 
        return user;
    }

    async signin(email: string, password: string){
        const [user] = await this.usersServ.find(email);
        if(!user){
            throw new NotFoundException('User Not Found!');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('Invalid Password!');
        }
        return user;

    }
}