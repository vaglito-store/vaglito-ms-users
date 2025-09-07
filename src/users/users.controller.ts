import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Delete,
  Body,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      const users = await this.userService.findAll(paginationDto);
      return users;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Forbidden',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }
}
