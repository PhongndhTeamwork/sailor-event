import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UserFollowRequest {
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  communityId: number;
}
