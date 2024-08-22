import { NFTOrderEnum } from '@models/enums/collection.enum';
import { PaginationQuery } from '@models/pagination-query';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetTypeModel extends PaginationQuery {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  limit: number;

  @IsOptional()
  status: string;

  @IsNotEmpty()
  type: string;

  @IsOptional()
  minPrice: string;

  @IsOptional()
  maxPrice: string;

  @IsOptional()
  @IsEnum(NFTOrderEnum)
  @Transform(({ value }) => +value)
  orderBy: NFTOrderEnum;

  @IsOptional()
  title: string;

  @IsOptional()
  @Transform(({ value }) => +value)
  network: number;
}
