import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CampingService } from './camping.service';
import { CreateCampingDto } from './dto/create-camping.dto';
import { UpdateCampingDto } from './dto/update-camping.dto';

@Controller('camping')
export class CampingController {
  constructor(private readonly campingService: CampingService) {}

  @Post()
  create(@Body() createCampingDto: CreateCampingDto) {
    return this.campingService.create(createCampingDto);
  }

  @Get()
  findAll() {
    return this.campingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampingDto: UpdateCampingDto) {
    return this.campingService.update(+id, updateCampingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campingService.remove(+id);
  }
}
