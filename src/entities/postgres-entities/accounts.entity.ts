import { Column, Entity } from "typeorm";
import { PostgresBaseEntity } from "@entities/postgres-entities/base.entity";

@Entity("accounts")
export class AccountEntity extends PostgresBaseEntity {
  @Column({ name: "user_name" })
  userName: string;

  @Column({ name: "root_address" })
  rootAddress: string;

  @Column({ nullable: true })
  email: string;

  @Column({  nullable: true })
  avatar: string;

  @Column({ name: "discord_uid", nullable: true })
  discordUid: string;

  @Column({ name: "discord_username", nullable: true })
  discordUsername: string;

  @Column({ name: "twitter_name", nullable: true })
  twitterName: string;

  @Column({ name: "twitter_username", nullable: true })
  twitterUsername: string;

  @Column({ name: "twitter_uid", nullable: true })
  twitterUid: string;

  @Column({ name: "telegram_url", nullable: true })
  telegramUrl: string;

  @Column({ name: "telegram_uid", nullable: true })
  telegramUid: string;

  @Column({ name: "telegram_username", nullable: true })
  telegramUsername: string;

  @Column({ name: "ip_address", nullable: true })
  ipAddress: string;

  @Column({ name: "invite_code", nullable: true })
  inviteCode: string;

  @Column({ name: "referral_code", nullable: true })
  referralCode: string;

  constructor(partial: Partial<AccountEntity>) {
    super();
    Object.assign(this, partial);
  }
}
