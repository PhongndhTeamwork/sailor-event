import { Column, Entity } from "typeorm";
import { PostgresBaseEntity } from "@entities/postgres-entities/base.entity";

@Entity("whitelist")
export class WhitelistEntity extends PostgresBaseEntity {
  @Column({ name: "wallet_address" })
  walletAddress: string;

  @Column()
  type: string;


  constructor(partial: Partial<WhitelistEntity>) {
    super();
    Object.assign(this, partial);
  }
}
