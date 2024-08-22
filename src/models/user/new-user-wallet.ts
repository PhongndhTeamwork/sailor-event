import { NetworkTypeEnum } from '@models/enums/netwok.enum';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class NewUserWalletModel {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsEnum(NetworkTypeEnum)
  networkType: NetworkTypeEnum;
}
