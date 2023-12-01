/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Expose, Exclude } from 'class-transformer';

// Expose: share this property, Exclude: not share this property

export class UserDto {
  @Expose()
  id: number;
  
  @Expose()
  email: string;
}