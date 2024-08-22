import { Service } from "typedi";
import axios from "axios";
import { getRepository } from "typeorm";
import { UserDiscordEntity } from "@entities/postgres-entities";

@Service()
export class TaskService {
  // async addWallet(wallet: string): Promise<string | WhitelistEntity> {
  //
  // }
  async checkUserNameDiscord(
    memberID: string,
    validateChar: string
  ): Promise<any> {
    try {
      const getAccess = await getRepository(UserDiscordEntity)
        .createQueryBuilder("vud")
        .select(`vud.access_token, vud.refresh_token`)
        .where("vud.discord_id = :discordId", { discordId: memberID })
        .getRawOne();
      try {
        const userData = await axios.get(`https://discord.com/api/users/@me`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${getAccess.access_token}`
          }
        });
        return userData && userData.data
          ? userData.data.global_name.includes(validateChar)
          : false;
      } catch (error) {
        if (error.message.includes("401")) {
          const tokenResponseData = await axios({
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
              // Authorization: `Basic ${BasicAuthToken}`,
            },
            url: "https://discord.com/api/oauth2/token",
            data: {
              client_id: process.env.DISCORD_CLIENT_ID,
              client_secret: process.env.DISCORD_CLIENT_SECRET,
              refresh_token: getAccess.refresh_token,
              grant_type: "refresh_token"
            },
            method: "POST"
          });

          const oauthData = await tokenResponseData.data;
          await getRepository(UserDiscordEntity)
            .createQueryBuilder()
            .update(UserDiscordEntity)
            .set({
              accessToken: oauthData?.access_token,
              refreshToken: oauthData?.refresh_token,
              expireTime: oauthData?.expires_in
            })
            .where("discord_id = :id", { id: memberID })
            .execute();

          const userData = await axios.get(
            `https://discord.com/api/users/@me`,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${oauthData?.access_token}`
              }
            }
          );

          return userData && userData.data
            ? userData.data.global_name.includes(validateChar)
            : false;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async checkJoinDiscord(guildID: string, memberID: string): Promise<any> {
    try {
      const getAccess = await getRepository(UserDiscordEntity)
        .createQueryBuilder("vud")
        .select(`vud.access_token, vud.refresh_token`)
        .where("vud.discord_id = :discordId", { discordId: memberID })
        .getRawOne();
      try {
        const guild = await axios.get(
          `https://discord.com/api/users/@me/guilds`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${getAccess.access_token}`
            }
          }
        );
        const checkGuild = guild.data.find((it) => it.id == guildID);
        return !!checkGuild;
      } catch (error) {
        if (error.message.includes("401")) {
          const tokenResponseData = await axios({
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
              // Authorization: `Basic ${BasicAuthToken}`,
            },
            url: "https://discord.com/api/oauth2/token",
            data: {
              client_id: process.env.DISCORD_CLIENT_ID,
              client_secret: process.env.DISCORD_CLIENT_SECRET,
              refresh_token: getAccess.refresh_token,
              grant_type: "refresh_token"
            },
            method: "POST"
          });

          const oauthData = await tokenResponseData.data;
          await getRepository(UserDiscordEntity)
            .createQueryBuilder()
            .update(UserDiscordEntity)
            .set({
              accessToken: oauthData?.access_token,
              refreshToken: oauthData?.refresh_token,
              expireTime: oauthData?.expires_in
            })
            .where("discord_id = :id", { id: memberID })
            .execute();

          const guild = await axios.get(
            `https://discord.com/api/users/@me/guilds`,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${oauthData?.access_token}`
              }
            }
          );
          const checkGuild = guild.data.find((it) => it.id == guildID);
          return !!checkGuild;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }



}