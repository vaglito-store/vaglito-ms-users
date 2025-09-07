import {
  Controller,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common';
import { UpdateUserDto } from './dto/update.user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @MessagePattern({ cmd: 'create_product' })
  async create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'find_all_products' })
  async findAll(@Payload() paginationDto: PaginationDto) {
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

  @MessagePattern({ cmd: 'find_one_product' })
  async findOne(
    @Payload(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.findById(id);
  }

  @MessagePattern({ cmd: 'update_product' })
  update(
    @Payload() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  remove(
    @Payload(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.remove(id)
  }
}
