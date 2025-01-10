import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/data/decorators/public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @Put(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.userService.remove(userId);
  }
}
