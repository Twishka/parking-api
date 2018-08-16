import { Get, Controller, Param, Query, Post, Body } from '@nestjs/common';
import { UserService } from 'services/user.service'

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get('/user')
  showUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/user/:id')
  getUser(@Param() params) {
    return this.userService.getUser(params.id);
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
}
