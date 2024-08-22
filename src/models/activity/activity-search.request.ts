import { IsNotEmpty } from 'class-validator';
import { PaginationQuery } from '../pagination-query';

export class ActivitySearchRequest extends PaginationQuery {
  @IsNotEmpty()
  userAddress?: string;

  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  page: number;
}

export class ActivityFinishJourneyRequest {
  @IsNotEmpty()
  journeyId: string;
}
