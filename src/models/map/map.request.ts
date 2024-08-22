import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MapRequest {
  @IsNotEmpty()
  userAddress: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  mapId: number;
}

export class ConfigRequest {
  @IsNotEmpty()
  key: string;
}

export class ConfigBodyRequest {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: any;
}
