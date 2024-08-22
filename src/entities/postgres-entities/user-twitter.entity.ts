import {
  Column,
  Entity
} from "typeorm";
import { PostgresBaseEntity } from "@entities/postgres-entities/base.entity";
import { UserDiscordEntity } from "@entities/postgres-entities/user-discord.entity";

@Entity("user_twitter")
export class UserTwitterEntity extends PostgresBaseEntity {
  @Column({nullable : true})
  sortIndex:number;

  @Column({nullable : true})
  timestamp:number;

  @Column({nullable : true})
  username: string;

  @Column({ name: "twitter_id" ,nullable : true})
  twitterId:string;

  @Column({ name: "access_token",nullable : true })
  accessToken:  string;

  @Column({ name: "refresh_token" ,nullable : true})
  refreshToken: string;

  @Column({ name: "name" ,nullable : true})
  name: string;

  constructor(partial: Partial<UserDiscordEntity>) {
    super();
    Object.assign(this, partial);
  }
}
