import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async createCamping(createCampingDto: CreateCampingDto): Promise<Camping> {
    try {
      return await this.campingRepository.save(createCampingDto);
    } catch (error) {
      throw new BadRequestException('Cannot create camping');
    }
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
