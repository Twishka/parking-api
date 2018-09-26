import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, MoreThan, LessThan } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { Rate } from '../entities/rate.entity';
import { Spot } from '../entities/spot.entity';
import { SpotService } from './spot.service';
import { UserService } from './user.service';
import { BookingDto } from '../dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,

    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,

    private readonly spotService: SpotService,
    private readonly userService: UserService,
  ) {}

  async getBookings(start: Date, end: Date): Promise<Booking[]> {
    if (!start || !end) {
      return this.bookingRepository.find();
    }
    return this.bookingRepository.find(
      { where: { startDate: Not(MoreThan(end)), endDate: Not(LessThan(start)) } },
    );
  }

  async bookSpot(bookingInput: BookingDto) {
    if (Object.keys(bookingInput).length === 0) {
      throw new BadRequestException('Wrong input format');
    }
    const spot = await this.spotService.getSpotById(bookingInput.spotId);
    const user = await this.userService.getUser(bookingInput.userId);
    if (!spot || !user) {
      throw new BadRequestException('userId or spotId missing');
    }

    if (bookingInput.endDate < bookingInput.startDate) {
      throw new BadRequestException('startDate has to be earlier than endDate');
    }

    const taken = await this.bookingRepository.find(
      { where: {
          spot,
          startDate: Not(MoreThan(bookingInput.endDate)),
          endDate: Not(LessThan(bookingInput.startDate)),
      } },
    );

    if (taken.length > 0) {
      throw new BadRequestException('The spot is already taken');
    }

    const booking: Booking = {
      startDate: bookingInput.startDate,
      endDate: bookingInput.endDate,
      spot,
      user,
    };
    return this.bookingRepository.save(booking);
  }

  async getRatesHistory(start: Date, end: Date): Promise<Rate[]> {
    if (start && end) {
      return this.rateRepository.find(
        { where: { startDate: Not(MoreThan(end)), endDate: Not(LessThan(start)) } },
      );
    } else {
      return this.rateRepository.find();
    }
  }

  async getCurrentRate(): Promise<number  | undefined> {
    const rate = await this.rateRepository.findOne({order: {id: 'DESC'}});
    return !!rate ? rate.rate : rate;
  }
}
