import { Booking } from '../entities/booking.entity';

export class SpotDto {
  number: number;
  bookings: Booking[];
  status: 'out' | 'free' | 'booked';
}
