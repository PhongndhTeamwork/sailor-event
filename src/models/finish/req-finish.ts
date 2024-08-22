import { ServiceTypeEnum } from '@models/enums/config.enum';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FinishPVERequest {
  @IsNotEmpty()
  signature: string;

  @IsNotEmpty()
  win: boolean;

  @IsNotEmpty()
  session_id: string;

  @IsNotEmpty()
  ip_user: string;

  @IsNotEmpty()
  gold: number;

  @IsOptional()
  service_type: ServiceTypeEnum;
}
