import { Get, Controller, Param, Query, Post, Body } from '@nestjs/common';
import { SpotService } from 'services/spot.service';
import { Booking } from 'entities/booking.entity';
import { BookingService } from 'services/booking.service';
import { UserService } from 'services/user.service'
import { Spot } from 'entities/spot.entity'

@Controller()
export class AppController {
  constructor(
    private readonly spotService: SpotService,
    private readonly bookingService: BookingService,
    private readonly userService: UserService
  ) {}

  @Get()
  showSpots() {
    return this.spotService.findAll();
  }

  @Post()
  addSpot(@Body() spot: Spot) {
    return this.spotService.addSpot(spot)
  }

  @Post()
  create(@Body() booking: Booking) {
    return this.bookingService.bookSpot(booking)
  }

  @Get('/user/:id/balance')
  showBalance(@Param() params) {
    return this.userService.getBalance(params.id)
  }

  @Get('/user/:id/history')
  showUserHistory(@Query('start') start, @Query('end') end) {
    return [
      {'startDate': new Date(2018, 8, 2), 'endDate': new Date(2018, 8, 10), 'place': 26, 'cost': 240}, 
      {'startDate': new Date(2018, 8, 3), 'endDate': new Date(2018, 8, 5), 'place': 13, 'cost': 60}
    ];
  }

  @Get('/user')
  showUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/user/:id')
  getUser(@Param() params) {
    return this.userService.getUser(params.id);
  }

  @Get('/history')
  showHistory(@Query('start') start, @Query('end') end) {
    return this.bookingService.showBookings();
  }

  @Get('/history/rates')
  showRatesHistory(@Query('start') start, @Query('end') end) {
    return [
      {
        'rate': 30,
        'startDate': new Date(2018, 7, 21),
      },
      {
        'rate': 25,
        'startDate': new Date(2018, 6, 13),
      }
    ]
  }
}
