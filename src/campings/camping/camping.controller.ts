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
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { User } from 'src/users/user/entities/user.entity';
import { CampingService } from './camping.service';
import { CreateCampingDto } from './dto/create-camping.dto';
import { UpdateCampingDto } from './dto/update-camping.dto';
import { Camping } from './entities/camping.entity';

@Controller('camping')
export class CampingController {
  constructor(private readonly campingService: CampingService) {}

  @Get('all')
  getAllCampings(): Promise<Camping[]> {
    return this.campingService.getAllCampings();
  }

  @Get('user')
  @UseGuards(AuthGuard())
  getCampingsForUser(@GetUser() user: User): Promise<Camping[]> {
    return this.campingService.getCampingsForUser(user);
  }

  @UseGuards(JwtAuthGuard) //to force auth to create campings
  @Post()
  createCamping(
    @Body() createCampingDto: CreateCampingDto,
    @GetUser() user: User,
  ): Promise<Camping> {
    return this.campingService.createCamping(createCampingDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateCampingById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCampingDto: UpdateCampingDto,
  ): Promise<Camping> {
    return this.campingService.updateCampingById(id, updateCampingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteCampingById(@Param('id', ParseIntPipe) id: number) {
    return this.campingService.deleteCampingById(id);
  }

  @Get(':id')
  findCampingById(@Param('id', ParseIntPipe) id: number): Promise<Camping> {
    return this.campingService.findCampingById(id);
  }
}
