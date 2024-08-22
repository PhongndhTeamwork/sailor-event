import {
  IsEnum,
  IsNotEmpty,
  ValidateIf,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';
import { PaginationQuery } from '../pagination-query';
import {
  CollectionActivitySearchTypeEnum,
  CollectionActivityTypeEnum,
} from '../enums/collection.enum';
import { Transform } from 'class-transformer';
import { NetworkTypeEnum } from '@models/enums/netwok.enum';

export class ActivitySearchRequest extends PaginationQuery {
  @ValidateIf(
    (searchType) =>
      searchType.searchBy !== CollectionActivitySearchTypeEnum.USER,
  )
  @IsOptional()
  address: string;

  @IsNotEmpty()
  @IsEnum(CollectionActivitySearchTypeEnum)
  searchBy: CollectionActivitySearchTypeEnum;

  @IsOptional()
  @IsArray()
  @IsEnum(CollectionActivityTypeEnum, { each: true })
  activityType?: number[];

  @ValidateIf(
    (searchType) =>
      searchType.searchBy === CollectionActivitySearchTypeEnum.USER,
  )
  @IsNotEmpty()
  userAddress?: string;

  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  page: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  network: number;
}

export class CreateWalletModel {
  @IsNotEmpty()
  network: NetworkTypeEnum;
}

export class GetAssetsModel {
  @IsOptional()
  network: NetworkTypeEnum;
}

export class TransferNftModel {
  @IsNotEmpty()
  network: NetworkTypeEnum;

  @IsNotEmpty()
  nftId: string;

  @IsNotEmpty()
  to: string;
}

export class TransferTokenModel {
  @IsNotEmpty()
  network: NetworkTypeEnum;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  to: string;
}
