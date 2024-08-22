import { IsNotEmpty } from 'class-validator';

export class CheckEarlyAccessCodeModel {
  @IsNotEmpty()
  code: string;
}

export class CheckWhitelistBody {
  @IsNotEmpty()
  address: string;
}
