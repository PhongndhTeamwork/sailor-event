import { Expose } from 'class-transformer';

export class TokenResponse {
  @Expose()
  id: number;

  @Expose({ name: 'wallet_address' })
  walletAddress: string;

  @Expose({ name: 'balance' })
  balance: string;

  @Expose({ name: 'token' })
  token: string;

  @Expose({ name: 'chain' })
  chain: string;
}
