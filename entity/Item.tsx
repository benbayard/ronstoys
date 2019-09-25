import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import {
  IsNumber,
  IsString,
  IsPositive,
  IsInt,
  IsOptional,
  MinLength
} from 'class-validator';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  @IsString()
  @MinLength(1)
  name: string;

  @Column({ type: 'text' })
  @IsString()
  @MinLength(1)
  description: string;

  @Column({ type: 'int4' })
  @IsPositive()
  @IsNumber()
  price: number;

  @Column({ type: 'real' })
  @IsPositive()
  @IsNumber()
  height: number;

  @Column({ type: 'real' })
  @IsPositive()
  @IsNumber()
  width: number;

  @Column({ type: 'real' })
  @IsPositive()
  @IsNumber()
  length: number;

  @Column({ type: 'smallint' })
  @IsPositive()
  @IsInt()
  quantity: number;

  @Column({ type: 'simple-array' })
  @IsOptional()
  @MinLength(1, { each: true })
  @IsString({ each: true })
  accessories: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
