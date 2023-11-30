/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}


    // All of this methods to access API Repository
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({id});
  }

  find(email: string) {
    return this.repo.find({where: {email}});
  }

  //Partial: is a type helper defined in typescript 
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if(!user){
        throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user)
  }

  remove() {}
}
