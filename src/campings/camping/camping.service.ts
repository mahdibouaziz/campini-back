import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCampingDto } from './dto/create-camping.dto';
import { UpdateCampingDto } from './dto/update-camping.dto';
import { Camping } from './entities/camping.entity';

@Injectable()
export class CampingService {
  constructor(
    @InjectRepository(Camping)
    private campingRepository: Repository<Camping>,
  ) {}

  async createCamping(
    createCampingDto: CreateCampingDto,
    user: User,
  ): Promise<Camping> {
    try {
      const camping = await this.campingRepository.save({
        ...createCampingDto,
        organiser: user,
      });

      delete camping.organiser;

      return camping;
    } catch (error) {
      throw new BadRequestException('Cannot create camping');
    }
  }

  async getCampingsForUser(user: User): Promise<Camping[]> {
    return await this.campingRepository.find({ organiser: user });
  }

  async getAllCampings(): Promise<Camping[]> {
    try {
      return await this.campingRepository.find();
    } catch (error) {
      throw new BadRequestException('error while finding campings');
    }
  }

  async findCampingById(id: number): Promise<Camping> {
    try {
      return await this.campingRepository.findOne(id);
    } catch (error) {
      throw new BadRequestException(
        `error while finding camping with id ${id}`,
      );
    }
  }

  async updateCampingById(
    id: number,
    updateCampingDto: UpdateCampingDto,
  ): Promise<Camping> {
    try {
      let result = await this.findCampingById(id);
      result = { ...result, ...updateCampingDto };
      await this.campingRepository.update(id, result);
      return result;
    } catch (error) {
      throw new BadRequestException(
        `error while updating camping with id ${id}`,
      );
    }
  }

  async deleteCampingById(id: number) {
    const result = await this.campingRepository.delete(id);
    if (result.raw.affectedRows == 1) {
      return {
        message: `deleted camping with id ${id}`,
      };
    }
    throw new BadRequestException(`error while deleting camping with id ${id}`);
  }
}
