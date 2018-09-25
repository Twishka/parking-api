import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from '../entities/spot.entity';
import { SpotDto } from '../dto/spot.dto';

const determineStatus = (spot: Spot): 'out' | 'free' | 'booked'  => {
  if (spot.closedForMaintenance) return 'out';
  if (!spot.bookings.length) return 'free';
  const today = new Date();
  return !!spot.bookings
    .find(booking => new Date(booking.startDate) < today && today < new Date(booking.endDate))
    ? 'booked' : 'free';
};

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,
  ) {}

  async getSpots(): Promise<SpotDto[]> {
    const spots = await this.spotRepository.find({relations: ['bookings']});
    return spots.map(spot => ({
      number: spot.number,
      bookings: spot.bookings,
      status: determineStatus(spot),
    }));
  }

  async addSpot(spot: Spot) {
    return this.spotRepository.save(spot);
  }

  async getSpotById(id: number) {
    return this.spotRepository.findOne({ where: {id} });
  }
}
