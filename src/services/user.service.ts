import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan, Not } from 'typeorm';
import { User } from 'entities/user.entity';
import { Booking } from 'entities/booking.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ["cars"] });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: {id}, relations: ["cars"] });
  }

  async addUser(user: User) {
    return this.userRepository.save(user);
  }

  async getBalance(id: number) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return user.balance
    } else {
      return null
    }
  }

  async getUserHistory(id: number, start: Date, end: Date) {
    console.log(start, end)
    const startDate = start.toString().substring(0, 10)
    return await this.bookingRepository.find(
      { where: { user: id, startDate: Not(MoreThan(end)), endDate: Not(LessThan(start)) }, relations: ["user"] }
    );
  }
}
