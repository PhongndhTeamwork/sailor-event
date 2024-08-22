import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class VerifyTaskRequest {
  @IsNotEmpty()
  day: number;

  @IsNotEmpty()
  taskIndex: number;
}

export class ClaimTaskRequest {
  @IsNotEmpty()
  day: number;
}

export class GachaPlayRequest {
  @IsNotEmpty()
  turn: number;

  @IsNotEmpty()
  day: number;
}

export class GachaHistoryRequest {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  limit: number;

  @IsOptional()
  startTime: number;

  @IsOptional()
  endTime: number;
}

export class leaderBoardRequest {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  limit: number;

  @IsOptional()
  @IsString()
  walletAddress: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  event: number;
}

export class GachaWinnerRequest {
  @IsNotEmpty()
  day: number;
}

export class claimLeaderBoardRequest {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  event: number;
}

export class setClaimLeaderBoard {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  event: number;

  @IsNotEmpty()
  txHash: string;
}

export class enterCodeReferralRequest {
  @IsNotEmpty()
  referralCode: string;
}

export class claimReferralRequest {
  @IsNotEmpty()
  event: number;

  @IsNotEmpty()
  condition: number;
}

export class claimReferralAllRequest {
  @IsNotEmpty()
  event: number;

  @IsNotEmpty()
  condition: any;
}

export class processReferralRequest {
  @IsNotEmpty()
  event: number;
}
