import { NetworkTypeEnum } from '@models/enums/netwok.enum';
import { Expose, Transform } from 'class-transformer';

export class UserInfoResponse {
  @Expose()
  @Transform(({ value }) => +value)
  id: number;

  @Expose({ name: 'user_name' })
  userName: string;

  @Expose()
  email: string;

  @Expose({ name: 'root_address' })
  rootAddress: string;

  @Expose()
  avatar: string;

  @Expose({ name: 'discord_uid' })
  discordUid: string;

  @Expose({ name: 'discord_username' })
  discordUserName: string;

  @Expose({ name: 'twitter_name' })
  twitterName: string;

  @Expose({ name: 'twitter_username' })
  twitterUserName: string;

  @Expose({ name: 'twitter_uid' })
  twitterUid: string;

  @Expose({ name: 'telegram_url' })
  telegramUrl: string;

  @Expose({ name: 'telegram_uid' })
  telegramUid: string;

  @Expose({ name: 'telegram_username' })
  telegramUserName: string;

  @Expose({ name: 'ip_address' })
  ipAddress: string;

  @Expose()
  @Transform(({ value }) => +value)
  activated: number;
}

export class UserProfileResponse {
  @Expose()
  @Transform(({ value }) => +value)
  id: number;

  @Expose({ name: 'user_name' })
  userName: string;

  @Expose()
  email: string;

  @Expose()
  address: string;

  @Expose()
  network: NetworkTypeEnum;

  @Expose()
  avatar: string;

  @Expose({ name: 'discord_uid' })
  discordUid: string;

  @Expose({ name: 'discord_username' })
  discordUserName: string;

  @Expose({ name: 'twitter_name' })
  twitterName: string;

  @Expose({ name: 'twitter_username' })
  twitterUserName: string;

  @Expose({ name: 'twitter_uid' })
  twitterUid: string;

  @Expose({ name: 'telegram_url' })
  telegramUrl: string;

  @Expose({ name: 'telegram_uid' })
  telegramUid: string;

  @Expose({ name: 'telegram_username' })
  telegramUserName: string;

  @Expose()
  website: string;

  @Expose()
  community: any;

  @Expose()
  @Transform(({ value }) => +value)
  point: number;

  @Expose()
  @Transform(({ value }) => +value)
  activated: number;
}
