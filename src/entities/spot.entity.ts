import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  status: 'free' | 'booked' | 'out';
}
