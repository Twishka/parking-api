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
  getUser(@Param() params: {id: number}) {
    return this.userService.getUser(params.id);
  }

  @Get('/user/:id/balance')
  showBalance(@Param() params: {id: number}) {
    return this.userService.getBalance(params.id)
  }

  @Get('/user/:id/history')
  showUserHistory(@Param() params: {id: number}, @Query('start') start: Date, @Query('end') end: Date) {
    return this.userService.getUserHistory(params.id, start, end)
  }
}
