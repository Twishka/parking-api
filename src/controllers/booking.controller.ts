import { Get, Controller, Param, Query, Post, Body } from '@nestjs/common';
import { Booking } from 'entities/booking.entity';
import { BookingService } from 'services/booking.service';

@Controller()
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
  ) {}

  @Post()
  create(@Body() booking: Booking) {
    return this.bookingService.bookSpot(booking)
  }

  @Get('/history')
  showHistory(@Query('start') start, @Query('end') end) {
    return this.bookingService.getBookings(start, end);
  }

  @Get('/history/rates')
  showRatesHistory(@Query('start') start, @Query('end') end) {
    return this.bookingService.getRatesHistory(start, end);
  }
}
