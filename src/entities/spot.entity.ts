import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from 'entities/booking.entity';

@Entity()
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  status: 'free' | 'booked' | 'out' | 'available';

  @OneToMany(type => Booking, booking => booking.spot)
  bookings: Booking[]
}
