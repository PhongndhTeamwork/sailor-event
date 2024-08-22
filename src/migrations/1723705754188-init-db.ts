import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1723705754188 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "accounts" (
                "id" bigserial PRIMARY KEY,
                "user_name" TEXT NULL,
                "root_address" TEXT NOT NULL,
                "email" TEXT NULL,
                "avatar" TEXT NULL,
                "discord_uid" TEXT NULL,
                "discord_username" TEXT NULL,
                "twitter_name" TEXT NULL,
                "twitter_username" TEXT NULL,
                "twitter_uid" TEXT NULL,
                "telegram_uid" TEXT NULL,
                "telegram_username" TEXT NULL,
                "ip_address" TEXT NULL,
                "activated" smallint NULL default 0,
                "created_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text),
                "updated_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "wallets" (
                "id" bigserial PRIMARY KEY,
                "user_id" bigint NOT NULL,
                "address" TEXT NOT NULL,
                "format_address" TEXT NOT NULL,
                "private_key" TEXT NOT NULL,
                "public_key" TEXT NOT NULL,
                "status" int4 NOT NULL default 0,
                "network" int4 NOT NULL,
                "type" int2 NOT NULL default 0,
                "deploy_tx" TEXT NOT NULL,
                "map_id" int8 NOT NULL,
                "created_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text),
                "updated_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "user_twitter" (
                "id" bigserial PRIMARY KEY,
                "sortindex" integer , 
                "timestamp" bigint , 
                "username" character varying ,
                "twitter_id" text NULL DEFAULT NULL,
                "access_token" text NULL DEFAULT NULL,
                "name" text NULL DEFAULT NULL,
                "refresh_token" text NULL,
                "created_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text),
                "updated_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text)
            )
        `);
        await queryRunner.query(`CREATE INDEX "user_twitter_username_idx" ON "user_twitter" ("username") `);
        await queryRunner.query(`CREATE INDEX "user_twitter_sortindex_idx" ON "user_twitter" ("sortindex") `);

        await queryRunner.query(`CREATE TABLE "user_discord" (
            "id" bigserial PRIMARY KEY, 
            "discord_id" character varying , 
            "bot" boolean , 
            "system" boolean , 
            "flags" integer , 
            "username" character varying , 
            "avatar" character varying , 
            "discriminator" character varying , 
            "verified" boolean , 
            "mfa_enabled" boolean , 
            "created_timestamp" bigint , 
            "default_avatar_url" character varying , 
            "tag" character varying , 
            "avatar_url" character varying , 
            "display_avatar_url" character varying , 
            "access_token" text NULL,
            "refresh_token" text NULL,
            "email" text NULL,
            "expire_time" int8 NULL,
            "created_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text),
            "updated_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text)
            )`);
        await queryRunner.query(`CREATE INDEX "user_discord_tag_idx" ON "user_discord" ("tag") `);
        await queryRunner.query(`CREATE INDEX "user_discord_discord_id_idx" ON "user_discord" ("discord_id") `);
        await queryRunner.query(`
            CREATE TABLE "config" (
                "id" bigserial PRIMARY KEY,
                "key_config" text, 
                "value_config" text,
                "created_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text),
                "updated_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text)
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "nonce_config" (
                "id" bigserial PRIMARY KEY,
                "name" text NULL,
                "value" numeric NULL default 1,
                "created_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text),
                "updated_at" TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'::text)
            )
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "wallets"`);
        await queryRunner.query(`DROP TABLE "user_twitter"`);
        await queryRunner.query(`DROP TABLE "user_discord"`);
        await queryRunner.query(`DROP TABLE "config"`);
        await queryRunner.query(`DROP TABLE "nonce_config"`);
      }

}
