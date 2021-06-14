import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async updateUserById(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      const newUser = { ...user, ...updateUserDto };
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new UnauthorizedException("You're not authorized");
    }
  }
}
