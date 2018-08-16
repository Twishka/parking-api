import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'entities/user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(type => User, user => user.bookings)
    user: User;
}
