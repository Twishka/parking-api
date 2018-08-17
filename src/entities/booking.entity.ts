import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'entities/user.entity';
import { Spot } from 'entities/spot.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("date")
  startDate: Date;

  @Column("date")
  endDate: Date;

  @ManyToOne(type => User, user => user.bookings)
  user: User;

  @ManyToOne(type => Spot, spot => spot.bookings)
  spot: Spot;
}
