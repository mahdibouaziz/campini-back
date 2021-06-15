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

  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      console.log(user);
      const user1 = await this.userRepository.findOneOrFail(user.id);
      const newUser = { ...user1, ...updateUserDto };
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new UnauthorizedException("You're not authorized");
    }
  }
}
