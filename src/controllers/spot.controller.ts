import { Get, Controller, Post, Body } from '@nestjs/common';
import { SpotService } from '../services/spot.service';
import { Spot } from '../entities/spot.entity';

@Controller()
export class SpotController {
  constructor(
    private readonly spotService: SpotService,
  ) {}

  @Get()
  showSpots() {
    return this.spotService.getSpots();
  }

  @Post()
  addSpot(@Body() spot: Spot) {
    return this.spotService.addSpot(spot);
  }
}
