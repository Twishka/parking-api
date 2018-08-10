import { Get, Controller, Param, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import * as dateFns from 'date-fns';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  showSpots() {
    return [
      {'number': 1, 'status': 'free'},
      {'number': 2, 'status': 'booked'},
      {'number': 3, 'status': 'out'},
      {'number': 4, 'status': 'free'},
      {'number': 5, 'status': 'booked'},
      {'number': 6, 'status': 'out'},
      {'number': 7, 'status': 'free'}
    ];
  }

  @Post()
  create(@Body() params) {
    return {
      'status': 'success',
      'number': params.number,
      'endDate': params.endDate
    }
  }

  @Get('/user/:id/balance')
  showBalance(@Param() params) {
    console.log(params.id);
    return 100;
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
    return [
      {
        'id': 1, 
        'firstName': 'Иван', 
        'lastName': 'Сирко', 
        'apartment': 5,
        'phone': '+380634562647',
        'email': 'jonhsmith@mail.com',
        'balance': 428,
        'status': 'active',
        'cars': [
          {
            'number': 'АГ1488СС',
            'brand': 'Volkswagen',
            'model': 'Beetle'
          },
          {
            'number': 'АС1799ПШ',
            'brand': 'Volga',
            'model': 'Siber'
          },
        ],
      },
      {
        'id': 2, 
        'firstName': 'Елена', 
        'lastName': 'Троянская', 
        'apartment': 12,
        'phone': '+380638636924',
        'email': 'helen.horse@mail.com',
        'balance': 275235,
        'status': 'active',
        'cars': [
          {
            'number': 'ДО1984ББ',
            'brand': 'Aston Martin',
            'model': 'DB11'
          },
        ],
      }
    ]
  }

  @Get('/history')
  showHistory(@Query('start') start, @Query('end') end) {
    return [
      {
        'userId': 1,
        'spot': 5,
        'startDate': new Date(2018, 8, 6),
        'endDate': new Date(2018, 8, 10),
        'cost': 120
      },
      {
        'userId': 8,
        'spot': 3,
        'startDate': new Date(2018, 8, 15),
        'endDate': new Date(2018, 8, 17),
        'cost': 60
      }
    ]
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
