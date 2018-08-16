import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>
  ) {}

  async showBookings(): Promise<Booking[]> {
    return this.bookingRepository.find()
  }

  async bookSpot(booking: Booking) {
    return this.bookingRepository.save(booking);
  }
}
