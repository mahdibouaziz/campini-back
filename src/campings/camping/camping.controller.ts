import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { CampingService } from './camping.service';
import { CreateCampingDto } from './dto/create-camping.dto';
import { UpdateCampingDto } from './dto/update-camping.dto';
import { Camping } from './entities/camping.entity';

@Controller('camping')
export class CampingController {
  constructor(private readonly campingService: CampingService) {}

  @UseGuards(JwtAuthGuard) //to force auth to create campings
  @Post()
  createCamping(@Body() createCampingDto: CreateCampingDto): Promise<Camping> {
    return this.campingService.createCamping(createCampingDto);
  }

  @Get()
  getAllCampings(): Promise<Camping[]> {
    return this.campingService.getAllCampings();
  }

  @Get(':id')
  findCampingById(@Param('id', ParseIntPipe) id: number): Promise<Camping> {
    return this.campingService.findCampingById(id);
  }

  @Patch(':id')
  updateCampingById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCampingDto: UpdateCampingDto,
  ): Promise<Camping> {
    return this.campingService.updateCampingById(id, updateCampingDto);
  }

  @Delete(':id')
  deleteCampingById(@Param('id', ParseIntPipe) id: number) {
    return this.campingService.deleteCampingById(id);
  }
}
