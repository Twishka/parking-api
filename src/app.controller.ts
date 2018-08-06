import { Get, Controller, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import * as dateFns from 'date-fns';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  showSpots() {
    return [
      {'number': 1, status: 'free'},
      {'number': 2, status: 'booked'},
      {'number': 3, status: 'out'},
      {'number': 4, status: 'free'},
      {'number': 5, status: 'booked'},
      {'number': 6, status: 'out'},
      {'number': 7, status: 'booked'},
      {'number': 8, status: 'free'},
      {'number': 9, status: 'booked'},
      {'number': 10, status: 'free'},
    ];
  }

  @Post()
  create(@Body() params) {
    return `Spot #${params.number} is booked for ${dateFns.format(params.date, 'DD.MM.YYYY')}`;
  }

  @Get('/user/:id/balance')
  showBalance(@Param() params) {
    console.log(params.id);
    return 100;
  }

  @Get('/user/:id/history')
  showHistory(@Param() params) {
    return [
      {'date': new Date(2018, 8, 2), 'place': 26, 'cost': 30}, 
      {'date': new Date(2018, 8, 3), 'place': 26, 'cost': 30}
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
}
