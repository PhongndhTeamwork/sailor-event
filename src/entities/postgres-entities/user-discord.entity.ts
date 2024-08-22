import {
  Column,
  Entity
} from "typeorm";
import { PostgresBaseEntity } from "@entities/postgres-entities/base.entity";

@Entity("user_discord")
export class UserDiscordEntity extends PostgresBaseEntity {
  @Column({
    name: "discord_id"
  })
  discordId: string;

  @Column({nullable : true})
  bot :boolean;

  @Column({nullable : true})
  email: string;

  @Column({nullable : true})
  system: boolean ;

  @Column({nullable : true})
  flags:number;

  @Column({nullable : true})
  username: string;

  @Column({nullable : true})
  avatar:  string;

  @Column({nullable : true})
  discriminator: string;

  @Column({nullable : true})
  verified:boolean;

  @Column({
    name: "mfa_enabled", nullable: true
  })
  mfaEnabled: boolean;

  @Column({
    name: "created_timestamp", nullable: true
  })
  createdTimestamp: number;

  @Column({
    name: "default_avatar_url", nullable: true
  })
  defaultAvatarURL: string;

  @Column({nullable: true})
  tag: string;

  @Column({
    name: "avatar_url", nullable: true
  })
  avatarURL: string;

  @Column({
    name: "display_avatar_url", nullable: true
  })
  displayAvatarURL: string;

  @Column({
    name: "access_token", nullable: true
  })
  accessToken: string;

  @Column({
    name: "refresh_token", nullable: true
  })
  refreshToken: string;

  @Column({
    name: "expire_time", nullable: true
  })
  expireTime: number;

  constructor(partial: Partial<UserDiscordEntity>) {
    super();
    Object.assign(this, partial);
  }
}
