import { Injectable } from '@nestjs/common';
import { CreateCampingDto } from './dto/create-camping.dto';
import { UpdateCampingDto } from './dto/update-camping.dto';

@Injectable()
export class CampingService {
  create(createCampingDto: CreateCampingDto) {
    return 'This action adds a new camping';
  }

  findAll() {
    return `This action returns all camping`;
  }

  findOne(id: number) {
    return `This action returns a #${id} camping`;
  }

  update(id: number, updateCampingDto: UpdateCampingDto) {
    return `This action updates a #${id} camping`;
  }

  remove(id: number) {
    return `This action removes a #${id} camping`;
  }
}
