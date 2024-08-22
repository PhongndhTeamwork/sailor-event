import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class BindWalletModel {
  @IsNotEmpty()
  otp: string;

  @IsNotEmpty()
  walletAddress: string;

  @IsNotEmpty()
  @Transform(({ value }) => +value)
  chainNetwork: number;
}

export class ConnectEmailBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  otp: string;
}

export class BurnerBody {
  @IsNotEmpty()
  network: number;
}

export class BurnerBodyV2 {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  privateKey: string;

  @IsNotEmpty()
  publicKey: string;

  @IsNotEmpty()
  deployTx: string;

  @IsNotEmpty()
  @Transform(({ value }) => +value)
  mapId: number;

  @IsNotEmpty()
  @Transform(({ value }) => +value)
  network: number;
}

export class ProfileUpdateBody {
  @IsOptional()
  userName: string;

  @IsOptional()
  avatar: string;
}

export class UserTutorialRequest {
  @IsNotEmpty()
  walletAddress: string;
}
