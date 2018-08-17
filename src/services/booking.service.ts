import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'entities/booking.entity';
import { Rate } from 'entities/rate.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>
  ) {}

  async getBookings(start, end): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async bookSpot(booking: Booking) {
    return this.bookingRepository.save(booking);
  }

  async getRatesHistory(start, end): Promise<Rate[]> {
    return this.rateRepository.find();
  }
}
