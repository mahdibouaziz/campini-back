import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Hash the password
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 'thisIsTheSalt');
  }

  // Compare 2 hashed passwords
  async comparePassword(
    passwordFromUser: string,
    passwordFromDb: string,
  ): Promise<boolean> {
    const passwordFromUserHashed = await this.hashPassword(passwordFromUser);
    if (passwordFromUserHashed != passwordFromDb) {
      return false;
    }
    return true;
  }

  // Find one User by a creteria
  async findOne(options?: any): Promise<UserDto> {
    return await this.userRepo.findOne(options);
  }

  //Find user by login and passwords
  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('User Not found', HttpStatus.UNAUTHORIZED);
    }

    //compare passwords
    const areEquals = await this.comparePassword(password, user.password);

    if (!areEquals) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  // find the user by the payload
  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.userRepo.findOne({ where: { username } });
  }

  //register a new user
  async createNewUser(createUserDto: CreateUserDto) {
    const { username, password, email, firstName, lastName, age } =
      createUserDto;

    // check if the username exists in the db
    const userInDb = await this.userRepo.findOne({
      where: { username },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.userRepo.create({
      username,
      password,
      email,
      firstName,
      lastName,
      age,
    });

    return await this.userRepo.save(user);
  }
}
