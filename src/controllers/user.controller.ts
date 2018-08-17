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
  showUserHistory(@Param() params, @Query('start') start, @Query('end') end) {
    return this.userService.getUserHistory(params.id, start, end)
  }
}
