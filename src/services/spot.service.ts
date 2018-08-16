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

  async findAll(): Promise<Spot[]> {
    return this.spotRepository.find();
  }

  async addSpot(spot: Spot) {
    return this.spotRepository.save(spot);
  }
}
