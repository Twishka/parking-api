import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { SpotController } from './controllers/spot.controller';
import { SpotService } from './services/spot.service';
import { BookingService } from './services/booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Spot } from './entities/spot.entity';
import { Booking } from './entities/booking.entity';
import { Car } from './entities/car.entity';
import { User } from 'entities/user.entity';
import { Rate } from './entities/rate.entity';
import { UserService } from './services/user.service';
import { BookingController } from './controllers/booking.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Spot, Booking, Car, User, Rate]),
  ],
  controllers: [BookingController, UserController, SpotController],
  providers: [SpotService, BookingService, UserService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}