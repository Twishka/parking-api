import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { SpotController } from './controllers/spot.controller';
import { SpotService } from './services/spot.service';
import { BookingService } from './services/booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserService } from './services/user.service';
import { BookingController } from './controllers/booking.controller';
import { Spot } from './entities/spot.entity';
import { Booking } from './entities/booking.entity';
import { Car } from './entities/car.entity';
import { User } from './entities/user.entity';
import { Rate } from './entities/rate.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'lermex.site',
      port: 18874,
      username: 'postgres',
      password: '212a418416367de527745b4731f94336',
      database: 'parking_api_database',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Spot, Booking, Car, User, Rate]),
  ],
  controllers: [BookingController, UserController, SpotController],
  providers: [SpotService, BookingService, UserService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}