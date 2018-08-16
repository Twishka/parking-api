import { Get, Controller, Param, Query, Post, Body } from '@nestjs/common';
import { Booking } from 'entities/booking.entity';
import { BookingService } from 'services/booking.service';

@Controller()
export class AppController {
  constructor(
    private readonly bookingService: BookingService,
  ) {}

  @Post()
  create(@Body() booking: Booking) {
    return this.bookingService.bookSpot(booking)
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
