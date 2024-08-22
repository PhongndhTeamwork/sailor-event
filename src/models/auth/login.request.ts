import { IsNotEmpty, IsOptional } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  address: string;

  @IsOptional()
  network: number;

  @IsNotEmpty()
  signature: any;

  @IsNotEmpty()
  signData: any;
}
