import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from 'entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ["cars"] });
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({ where: {id}, relations: ["cars"] });
  }

  async addUser(user: User) {
    return this.userRepository.save(user);
  }

  async getBalance(id: number) {
    const user = await this.userRepository.findOne(id);
    return user.balance
  }
}
