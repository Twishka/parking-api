import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, MoreThan, LessThan, Between } from 'typeorm';
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

  async getBookings(start: Date, end: Date): Promise<Booking[]> {
    return this.bookingRepository.find(
      { where: { startDate: Not(MoreThan(end)), endDate: Not(LessThan(start)) } }
    );
  }

  async bookSpot(booking: Booking) {
    return this.bookingRepository.save(booking);
  }

  async getRatesHistory(start: Date, end: Date): Promise<Rate[]> {
    if(start && end) {
      return this.rateRepository.find(
        { where: { startDate: Not(MoreThan(end)), endDate: Not(LessThan(start)) } }
      );
    } else {
      return this.rateRepository.find()
    }
  }
}
