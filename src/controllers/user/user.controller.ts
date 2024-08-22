import { validateMiddleware } from "@core/middleware/validate.middleware";
import { ResponseBuilder } from "@core/utils/response-builder";
import Router from "@koa/router";
import { AppState } from "@models/app.state";
import { ParameterizedContext } from "koa";
import { Context } from "vm";
import { UserInfo } from "@models/authorzization/user.info";
import { plainToClass } from "class-transformer";
import { GetUserInfo } from "@core/middleware/auth.middleware";
import { ApiError } from "@models/api-error";
import { AuthDiscordRequest } from "@models/auth/auth-discord.request";
import { APIEnum } from "@models/enums/api.category.enum";
import { ResponseCodeEnum } from "@models/enums/response-code.enum";
import axios, { HttpStatusCode } from "axios";
import { StatusCodes } from "http-status-codes";
import { getRepository } from "typeorm";
import {
  AccountEntity,
  UserDiscordEntity,
  UserTwitterEntity
} from "@entities/postgres-entities";
import { LoginRequest } from "@models/auth/login.request";
import Container from "typedi";
import { UserService } from "@services/user/user.service";
import console from "node:console";


const UserRoute = new Router({
  prefix: "/user"
});

//Login demo
// UserRoute.get(
//   "/demo-login/:wallet",
//   // GetUserInfo,
//   async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
//     const { wallet } = ctx.params;
//
//     let account: AccountEntity;
//     account = await getRepository(AccountEntity).findOne({ where: { rootAddress: wallet } });
//     if (!account) {
//       const newAccount = getRepository(AccountEntity).create(new AccountEntity({
//         rootAddress: wallet,
//         userName: "",
//         email: "",
//         avatar: "",
//         discordUid: "",
//         discordUsername: "",
//         twitterName: "",
//         twitterUsername: "",
//         twitterUid: "",
//         telegramUrl: "",
//         telegramUid: "",
//         telegramUsername: "",
//         ipAddress: "",
//         inviteCode: "",
//         referralCode: ""
//       }));
//       account = await getRepository(AccountEntity).save(newAccount);
//     }
//
//     ctx.state.user = account as any;
//     ctx.body = { message: "Login successfully" };
//   }
// );

// Login
UserRoute.post(
  "/login",
  GetUserInfo,
  validateMiddleware({
    body: LoginRequest
  }),
  async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
    const authenService = Container.get<UserService>(UserService);
    let user: any = ctx.state.user;
    user = user ? plainToClass(UserInfo, ctx.state.user) : null;

    const ipAddress =
      ctx.request.headers["cf-connecting-ip"] ||
      ctx.request.headers["x-real-ip"] ||
      ctx.request.headers["x-forwarded-for"];
    // || IP.address();

    const model = plainToClass(LoginRequest, (ctx.request as any).body);
    const token = await authenService.login(model, ipAddress as any, user);

    ctx.body = new ResponseBuilder(token).build();
  }
);

//Get profile
UserRoute.get("/profile", GetUserInfo, async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    const user = (ctx.state as any).user;
    if (!user) {
      ctx.status = HttpStatusCode.Unauthorized;
      return ctx.body = { message: "Unauthorized" };
    }
    const wallet = (user as any).walletAddress;
    // const { wallet } = ctx.params;
    const profile = await getRepository(AccountEntity).findOne({ where: { rootAddress: wallet } });
    if (!profile) {
      ctx.status = HttpStatusCode.NotFound;
      return ctx.body = { message: "Profile not found for address " + wallet };
    }
    ctx.status = HttpStatusCode.Ok;
    ctx.body = { profile: profile };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { message: "An error occurred", error };
  }
});


// Login by twitter
UserRoute.post(
  APIEnum.LOGIN_BY_TWITTER,
  GetUserInfo,
  validateMiddleware({
    body: AuthDiscordRequest,
  }),
  async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
    let user : any = ctx.state.user;
    user = user ? plainToClass(UserInfo, ctx.state.user) : null;
    const { code, redirectUri, challenge, type } = ctx.request.body as any;
    const TWITTER_OAUTH_TOKEN_URL = 'https://api.twitter.com/2/oauth2/token';

    const twClientId =
      type == 'event'
        ? process.env.EVENT_TWITTER_CLIENT_ID
        : process.env.TWITTER_CLIENT_ID;

    const twSecret =
      type == 'event'
        ? process.env.EVENT_TWITTER_CLIENT_SECRET
        : process.env.TWITTER_CLIENT_SECRET;
  console.log(twClientId,twSecret)
    const twitterOauthTokenParams = {
      client_id: twClientId,
      // based on code_challenge
      code_verifier: challenge || 'challenge',
      redirect_uri: redirectUri || process.env.MARKET_PRODUCT_URL,
      grant_type: 'authorization_code',
      code,
    };

    const BasicAuthToken = Buffer.from(
      `${twClientId}:${twSecret}`,
      'utf8',
    ).toString('base64');

    try {
      const res = await axios({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${BasicAuthToken}`,
        },
        url: TWITTER_OAUTH_TOKEN_URL,
        data: twitterOauthTokenParams,
        method: 'POST',
      });

      const userTwitter = await axios.get<{ data: any }>(
        'https://api.twitter.com/2/users/me',
        {
          headers: {
            'Content-type': 'application/json',
            // put the access token in the Authorization Bearer token
            Authorization: `Bearer ${res.data.access_token}`,
          },
        },
      );
      if (userTwitter && userTwitter.data) {
        const checkVenomTW = await getRepository(UserTwitterEntity)
          .createQueryBuilder('vut')
          .select('*')
          .where('username = :username', {
            username: userTwitter?.data?.data?.username,
          })
          .getRawOne();
        if (!checkVenomTW) {
          await getRepository(UserTwitterEntity).save({
            twitterId: userTwitter?.data?.data?.id,
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token,
            name: userTwitter?.data?.data?.name,
            username: userTwitter?.data?.data?.username,
          });
        } else {
          await getRepository(UserTwitterEntity)
            .createQueryBuilder()
            .update()
            .set({
              twitterId: userTwitter?.data?.data?.id,
              accessToken: res.data.access_token,
              refreshToken: res.data.refresh_token,
              name: userTwitter?.data?.data?.name,
              username: userTwitter?.data?.data?.username,
            })
            .where('twitter_id = :twitterId', {
              twitterId: userTwitter?.data?.data?.id,
            })
            .execute();
        }
      }

      const checkUsed = await getRepository(AccountEntity)
        .createQueryBuilder('acc')
        .select('*')
        .where('acc.id != :userId AND acc.twitter_uid = :twitterUid', {
          userId: user.id,
          twitterUid: userTwitter?.data?.data?.id,
        })
        .getRawOne();
      if (checkUsed) {
        throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0023);
      }
      const saveResult = await getRepository(AccountEntity)
        .createQueryBuilder()
        .update()
        .set({
          twitterUid: userTwitter?.data?.data?.id,
          twitterName: userTwitter?.data?.data?.name,
          twitterUsername: userTwitter?.data?.data?.username,
        })
        .where('id = :userId', {
          userId: user.id,
        })
        .returning('*')
        .updateEntity(true)
        .execute();
      ctx.body = new ResponseBuilder(saveResult).build();
    } catch (error) {
      // console.error(error);
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        error.response &&
        error.response.data.error_description ==
        'Value passed for the authorization code was invalid.'
          ? ResponseCodeEnum.CM0025
          : error._errorCode || ResponseCodeEnum.CM0017,
      );
    }
  },
);
// Login by discord
UserRoute.post(
  APIEnum.LOGIN_BY_DISCORD,
  GetUserInfo,
  validateMiddleware({
    body: AuthDiscordRequest
  }),
  async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
    try {
      let user: any = ctx.state.user;
      user = user ? plainToClass(UserInfo, ctx.state.user) : null;
      const { code, redirectUri } = (ctx.request as any).body;

      const tokenResponseData = await axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
          // Authorization: `Basic ${BasicAuthToken}`,
        },
        url: "https://discord.com/api/oauth2/token",
        data: {
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
          scope: "identify guilds.members.read guilds"
        },
        method: "POST"
      });

      const oauthData = await tokenResponseData.data;

      const userResult = await axios.get<{ data: any }>(
        "https://discord.com/api/users/@me",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `${oauthData?.token_type} ${oauthData?.access_token}`
          }
        }
      );
      oauthData.userData = await userResult.data;
      if (oauthData?.userData?.id) {
        const checkDiscord = await getRepository(UserDiscordEntity)
          .createQueryBuilder("vud")
          .select("*")
          .where("discord_id = :id", { id: oauthData?.userData?.id })
          .getRawOne();

        if (!checkDiscord) {
          await getRepository(UserDiscordEntity).save({
            discordId: oauthData?.userData?.id,
            username: oauthData?.userData?.username,
            email: oauthData?.userData?.email,
            flags: oauthData?.userData?.flags,
            avatar: oauthData?.userData?.avatar,
            discriminator: oauthData?.userData?.discriminator,
            mfaEnabled: oauthData?.userData?.mfa_enabled,
            accessToken: oauthData?.access_token,
            refreshToken: oauthData?.refresh_token,
            expireTime: oauthData?.expires_in
          });
        } else {
          await getRepository(UserDiscordEntity)
            .createQueryBuilder()
            .update()
            .set({
              discordId: oauthData?.userData?.id,
              username: oauthData?.userData?.username,
              email: oauthData?.userData?.email,
              flags: oauthData?.userData?.flags,
              avatar: oauthData?.userData?.avatar,
              discriminator: oauthData?.userData?.discriminator,
              mfaEnabled: oauthData?.userData?.mfa_enabled,
              accessToken: oauthData?.access_token,
              refreshToken: oauthData?.refresh_token,
              expireTime: oauthData?.expires_in
            })
            .where("discord_id = :id", { id: oauthData?.userData?.id })
            .execute();
        }
      }
      const checkUsed = await getRepository(AccountEntity)
        .createQueryBuilder("acc")
        .select("*")
        .where("acc.id != :userId AND acc.discord_uid = :discordUid", {
          userId: user.id,
          discordUid: oauthData.userData.id
        })
        .getRawOne();
      if (checkUsed) {
        throw new ApiError(StatusCodes.BAD_REQUEST, ResponseCodeEnum.CM0024);
      }
      const saveResult = await getRepository(AccountEntity)
        .createQueryBuilder()
        .update()
        .set({
          discordUid: oauthData.userData.id,
          discordUsername: oauthData.userData.username
        })
        .where("id = :userId", {
          userId: user.id
        })
        .returning("*")
        .updateEntity(true)
        .execute();

      ctx.body = new ResponseBuilder(saveResult).build();
    } catch (error) {
      console.error(error);
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        error.response &&
        error.response.data.redirect_uri[0] == "Not a well formed URL."
          ? ResponseCodeEnum.CM0025
          : error._errorCode || ResponseCodeEnum.CM0017
      );
    }
  }
);

// UserRoute.get(
//   "/claim-key",
//   GetUserInfo,
//   async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
//
//   }
// )

// Create Burner
// UserRoute.post(
//   "/create-burner",
//   GetUserInfo,
//   validateMiddleware({
//     body: BurnerBodyV2
//   }),
//   async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
//     const authenService = Container.get<UserService>(UserService);
//     let user: any = ctx.state.user;
//     user = user ? plainToClass(UserInfo, ctx.state.user) : null;
//
//     const token = await authenService.createBurnerV2((ctx.request as any).body, user);
//
//     ctx.body = new ResponseBuilder(token).build();
//   }
// );

// UserRoute.post(
//   "/deploy-burner",
//   GetUserInfo,
//   validateMiddleware({
//     body: BurnerBody
//   }),
//   async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
//     const authenService = Container.get<UserService>(UserService);
//     let user: any = ctx.state.user;
//     user = user ? plainToClass(UserInfo, ctx.state.user) : null;
//
//     const token = await authenService.deployBurner((ctx.request as any).body, user);
//
//     ctx.body = new ResponseBuilder(token).build();
//   }
// );

// User Profile
// UserRoute.get(
//   "/profile",
//   GetUserInfo,
//   async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
//     const authenService = Container.get<UserService>(UserService);
//     let user: any = ctx.state.user;
//     user = user ? plainToClass(UserInfo, ctx.state.user) : null;
//
//     const token = await authenService.getProfile(user);
//
//     ctx.body = new ResponseBuilder(token).build();
//   }
// );

// Create Burner
// UserRoute.post(
//   "/update-profile",
//   GetUserInfo,
//   validateMiddleware({
//     body: ProfileUpdateBody
//   }),
//   async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
//     const authenService = Container.get<UserService>(UserService);
//     let user: any = ctx.state.user;
//     user = user ? plainToClass(UserInfo, ctx.state.user) : null;
//
//     const token = await authenService.updateProfile((ctx.request as any).body, user);
//
//     ctx.body = new ResponseBuilder(token).build();
//   }
// );
//
// // User Profile
// UserRoute.get(
//   "/profile-event",
//   GetUserInfo,
//   async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
//     const authenService = Container.get<UserService>(UserService);
//     let user:any = ctx.state.user;
//     user = user ? plainToClass(UserInfo, ctx.state.user) : null;
//
//     const token = await authenService.getProfileEvent(user);
//
//     ctx.body = new ResponseBuilder(token).build();
//   }
// );
//
// UserRoute.get(
//   "/process-event",
//   GetUserInfo,
//   async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
//     const authenService = Container.get<UserService>(UserService);
//     let user: any = ctx.state.user;
//     user = user ? plainToClass(UserInfo, ctx.state.user) : null;
//
//     const token = await authenService.getProcessEvent(user);
//
//     ctx.body = new ResponseBuilder(token).build();
//   }
// );
//
// UserRoute.get(
//   "/tutorial",
//   validateMiddleware({
//     query: UserTutorialRequest
//   }),
//   async (ctx: ParameterizedContext<AppState, Context>): Promise<void> => {
//     const authenService = Container.get<UserService>(UserService);
//     let user: any = ctx.state.user;
//     user = user ? plainToClass(UserInfo, ctx.state.user) : null;
//
//     const token = await authenService.checkTutorial(ctx.request.query as any);
//
//     ctx.body = new ResponseBuilder(token).build();
//   }
// );

export { UserRoute };
