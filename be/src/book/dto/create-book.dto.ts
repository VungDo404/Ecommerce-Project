import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
export class CreateBookDto {
  @IsString()
  thumbnail: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  slider: string[];

  @IsString()
  mainText: string;

  @IsString()
  author: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  sold: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsString()
  category: string;
}
