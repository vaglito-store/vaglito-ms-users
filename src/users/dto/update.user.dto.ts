import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNumber()
    @IsPositive()
    id: number;
}