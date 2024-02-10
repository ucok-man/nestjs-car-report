import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { ErrDuplicatedRecord, ErrEmptyRecord } from './error/error';

@Injectable()
export class UsersService {
  private readonly log = new Logger(UsersService.name);

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string) {
    try {
      const user = this.repo.create({ email, password });
      return await this.repo.save(user);
    } catch (error) {
      if (error.message.toLowerCase().includes('unique constraint failed')) {
        throw new ErrDuplicatedRecord();
      }
      throw error;
    }
  }

  findAll() {
    return this.repo.find({});
  }
  async findById(id: number) {
    const user = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new ErrEmptyRecord();
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new ErrEmptyRecord();
    }
    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findById(id);
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);
    return this.repo.remove(user);
  }
}
