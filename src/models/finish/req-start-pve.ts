import { ServiceTypeEnum } from '@models/enums/config.enum';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class StartPVERequest {
  @IsNotEmpty()
  signature: string;

  @IsNotEmpty()
  win: boolean;

  @IsNotEmpty()
  session_Id: string;

  @IsNotEmpty()
  ip_user: string;

  @IsNotEmpty()
  gold: number;

  @IsOptional()
  service_type: ServiceTypeEnum;
}
