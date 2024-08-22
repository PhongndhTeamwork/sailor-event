import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CollectionDetailModel {
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @Transform(({ value }) => +value)
  network: number;
}
