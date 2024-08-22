import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class LoginWalletRequest {
  @IsNotEmpty()
  address: string;

  @IsOptional()
  signature: string;

  @IsOptional()
  @Transform(({ value }) => +value)
  network: number;

  @IsOptional()
  messageBytes: string;

  @IsOptional()
  randomNonce: string;
}
