import Router from "@koa/router";
import { ParameterizedContext } from "koa";
import { AppState } from "@models/app.state";
import { Context } from "vm";
import * as console from "node:console";
import { getRepository } from "typeorm";
import { WhitelistEntity } from "@entities/postgres-entities";
import { HttpStatusCode } from "axios";
import Container from "typedi";
import { WhitelistService } from "@services/whitelist.service";
import { PuzzleEventKeyService } from "@services/puzzle-event-key.service";
import { GetUserInfo } from "@middleware/auth.middleware";

const WhitelistRoute = new Router({
  prefix: "/whitelist"
});

WhitelistRoute.get("/check-eligibility/:wallet" , async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    // const user = (ctx.status as any).user;
    // if (!user) {
    //   ctx.status = HttpStatusCode.Unauthorized;
    //   return ctx.body = { message: "Unauthorized" };
    // }
    // const wallet = (user as any).walletAddress;

    const {wallet} = ctx.params;
    const whitelist  = await getRepository(WhitelistEntity).findOne({where : {walletAddress : wallet}})
    if(whitelist) {
      return ctx.body = { eligible : true };
    }
    ctx.body = { eligible : false };
  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});

WhitelistRoute.get("/claim-whitelist",GetUserInfo, async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    const user = (ctx.state as any).user;
    if (!user) {
      ctx.status = HttpStatusCode.Unauthorized;
      return ctx.body = { message: "Unauthorized" };
    }
    const wallet = (user as any).walletAddress;

    // const { wallet } = ctx.params;
    const whitelistService = Container.get<WhitelistService>(WhitelistService);
    const result = await whitelistService.addWallet(wallet);
    if (typeof (result) === "string") {
      return ctx.body = { message: result };
    }
    return ctx.body = { whitelist: result };

  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});

WhitelistRoute.get("/claim-key",GetUserInfo, async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    const user = (ctx.state as any).user;
    if (!user) {
      ctx.status = HttpStatusCode.Unauthorized;
      return ctx.body = { message: "Unauthorized" };
    }
    const wallet = (user as any).walletAddress;

    // const { wallet } = ctx.params;
    const puzzleEventKey = Container.get<PuzzleEventKeyService>(PuzzleEventKeyService);
    const result = await puzzleEventKey.addKey(wallet);
    if (typeof (result) === "string") {
      return ctx.body = { message: result };
    }
    return ctx.body = { key: result };

  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});



export { WhitelistRoute };