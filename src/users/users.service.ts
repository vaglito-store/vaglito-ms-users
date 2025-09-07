import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {
    this.logger.log('Database connected');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const new_user = this.userRepository.create(createUserDto);
    return this.userRepository.save(new_user);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const [data, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      total,
      page,
      lastPage: Math.ceil(total / limit),
      data,
    };
  }

  async findById(id: number) {
    const product = await this.userRepository.findOneBy({
      id,
    });

    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found.`);
    }

    return product;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const product = await this.findById(id);
    await this.userRepository.update(id, updateUserDto);
    return product;
  }
}
