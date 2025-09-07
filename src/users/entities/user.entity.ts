import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: true,
  })
  available: boolean;

  @Column({ length: 255 })
  name: string;

  @Column('int')
  age: number;

  @Column({ length: 255 })
  email: string;

  @DeleteDateColumn()
  delete_at: string;
}
