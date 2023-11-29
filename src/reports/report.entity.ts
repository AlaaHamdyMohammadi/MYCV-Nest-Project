/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;
}