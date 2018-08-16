import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from 'entities/spot.entity';

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,
  ) {}

  findAll(): Promise<Spot[]> {
    const spots = this.spotRepository
      .find({ relations: ["bookings"] })
      .then(spots => {
        const today = new Date()
        const newSpots = spots.map(spot => {
          if (spot.bookings.length && spot.status !== "out") {
            for (const booking of spot.bookings) {
              const bookedToday = booking.startDate < today && today < booking.endDate ? true : false;
              if (bookedToday) {
                spot.status = "booked"
                return spot
              }
            }
            spot.status = "free"
            return spot
          }
          if (spot.status === "available") {
            spot.status = "free"
            return spot
          } else {
            return spot;
          }
        })
        console.log(newSpots)
        return spots
      });
    return spots
  }

  async addSpot(spot: Spot) {
    return this.spotRepository.save(spot);
  }
}
