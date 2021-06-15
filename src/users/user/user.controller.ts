import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.updateUserById(id, updateUserDto);
  }

  // @Post('upload-image')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './uploads/profileImages',
  //       filename: (req, file, cb) => {
  //         const filename: string =
  //           path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
  //         const extension: string = path.parse(file.originalname).ext;
  //         cb(null, `${filename}${extension}`);
  //       },
  //     }),
  //   }),
  // )
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return await { imagePath: file.path };
  // }
}
