import Router from "@koa/router";
import { ParameterizedContext } from "koa";
import { AppState } from "@models/app.state";
import { Context } from "vm";
import * as console from "node:console";
import PuzzleModel from "@entities/mongo-model/puzzle.entity";
import { RandomNumber } from "@src/utils/random";
import AccountHistoryModel from "@entities/mongo-model/account-history.entity";
import Container from "typedi";
import { GetUserInfo } from "@middleware/auth.middleware";
import { TaskService } from "@services/task.service";
import { getRepository } from "typeorm";
import { AccountEntity } from "@entities/postgres-entities";
import { HttpStatusCode } from "axios";
import { UserAction } from "@models/enums/user-action";
// import { AccountHistoryService } from "@services/account-history.service";

const PuzzleRoute = new Router({
  prefix: "/puzzle"
});
PuzzleRoute.get("/", GetUserInfo, async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    const user = (ctx.state as any).user;
    if (!user) {
      ctx.status = HttpStatusCode.Unauthorized;
      return ctx.body = { message: "Unauthorized" };
    }
    const puzzles = await PuzzleModel.find();
    ctx.body = { puzzles: puzzles };
  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});

PuzzleRoute.get("/info/:id", GetUserInfo, async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    const user = (ctx.state as any).user;
    if (!user) {
      ctx.status = HttpStatusCode.Unauthorized;
      return ctx.body = { message: "Unauthorized" };
    }
    const { id } = ctx.params;

    const puzzle = await PuzzleModel.findOne({ puzzleId: +id });
    if (!puzzle) {
      ctx.status = HttpStatusCode.NotFound;
      return ctx.body = { message: "Can not find puzzle " + id };
    }
    ctx.body = { puzzle: puzzle };
  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});

// PuzzleRoute.get("/get-free", async (ctx: ParameterizedContext<AppState, Context>) => {
//   try {
//     const user = (ctx.state as any).user;
//     if (!user) {
//       ctx.status = HttpStatusCode.Unauthorized;
//       return ctx.body = { message: "Unauthorized" };
//     }
//     const wallet = (user as any).walletAddress;
//     // const { wallet } = ctx.params;
//
//     // const accountHistoryService = Container.get<AccountHistoryService>(AccountHistoryService);
//     // const openedPuzzles = await accountHistoryService.getActivatedPuzzle(wallet);
//
//     const number: number[] = RandomNumber.getUniqueRandomNumbers(3, 3, 9, []);
//     if (number.length === 0) {
//       return ctx.body = { message: "You have already unlocked all the free puzzles" };
//     } else if (number.length < 3) {
//       return ctx.body = { message: `Only ${number.length} puzzles have been unlocked because you have to complete the first 2 puzzles by yourself.` };
//     }
//     for (let i = 0; i < number.length; i++) {
//       const newAccountHistory = await AccountHistoryModel.create({
//         walletAddress: wallet,
//         puzzleId: number[i],
//         checkTask: true
//       });
//       await newAccountHistory.save();
//     }
//     ctx.body = { puzzles: number };
//   } catch (error) {
//     ctx.status = HttpStatusCode.InternalServerError;
//     ctx.body = { message: "An error occurred", error };
//   }
// });
PuzzleRoute.get("/get-process", GetUserInfo, async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    const user = (ctx.state as any).user;
    if (!user) {
      ctx.status = HttpStatusCode.Unauthorized;
      return ctx.body = { message: "Unauthorized" };
    }
    const wallet = (user as any).walletAddress;

    // const { wallet } = ctx.params;
    const process = await AccountHistoryModel.find({
      walletAddress: wallet,
      typeAction: UserAction.PLAY_PUZZLE
    }).lean();
    ctx.body = { process: process };
  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});
PuzzleRoute.get("/get-status/:id", GetUserInfo, async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    const user = (ctx.state as any).user;
    if (!user) {
      ctx.status = HttpStatusCode.Unauthorized;
      return ctx.body = { message: "Unauthorized" };
    }
    const wallet = (user as any).walletAddress;

    // const { id, wallet } = ctx.params;
    const { id } = ctx.params;
    const status = await AccountHistoryModel.findOne({ walletAddress: wallet, puzzleId: id });
    if (!status) {
      ctx.status = HttpStatusCode.NotFound;
      ctx.body = { message: "Do not have status for this puzzle" };
    }
    ctx.body = { status: status };
  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});
PuzzleRoute.get("/verify-task/:puzzleId", GetUserInfo, async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    const user = (ctx.state as any).user;
    if (!user) {
      ctx.status = HttpStatusCode.Unauthorized;
      return ctx.body = { message: "Unauthorized" };
    }
    const wallet = (user as any).walletAddress;

    // const { puzzleId, wallet } = ctx.params;
    const { puzzleId } = ctx.params;
    const status = await AccountHistoryModel.findOne({ walletAddress: wallet, puzzleId: puzzleId });
    if (status) {
      return ctx.body = { message: "This task already done" };
    }

    const taskService = Container.get<TaskService>(TaskService);
    const checkUser = await getRepository(AccountEntity).findOne({ where: { rootAddress: wallet } });
    if (!checkUser) {
      ctx.status = 401;
      return ctx.body = { message: "Check your account" };
    }

    const guildId = "1229273360186347592";
    switch (puzzleId) {
      case 2 :
        if (!checkUser.discordUid) {
          ctx.status = 200;
          return ctx.body = { message: "Please open second puzzle before do this task" };
        }
        if (!await taskService.checkJoinDiscord(guildId, checkUser.discordUid)) {
          ctx.status = 400;
          return ctx.body = { message: "Please finish this task" };
        }
        break;
      case 6 :
        if (!checkUser.discordUid) {
          ctx.status = 200;
          return ctx.body = { message: "Please open second puzzle before do this task" };
        }
        if (!await taskService.checkUserNameDiscord(checkUser.discordUid, "#StarkSailor ")) {
          ctx.status = 400;
          return ctx.body = { message: "Please finish this task" };
        }
        break;
    }
    const newAccountHistory = await AccountHistoryModel.create({
      walletAddress: wallet,
      puzzleId: puzzleId,
      checkTask: true,
      typeAction: UserAction.PLAY_PUZZLE
    });
    await newAccountHistory.save();
    ctx.body = { status: newAccountHistory };
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});
PuzzleRoute.get("/claim-gift", GetUserInfo, async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    const user = (ctx.state as any).user;
    if (!user) {
      ctx.status = HttpStatusCode.Unauthorized;
      return ctx.body = { message: "Unauthorized" };
    }
    const wallet = (user as any).walletAddress;

    console.log(wallet);

    //? Get 3 free puzzle
    const number: number[] = RandomNumber.getUniqueRandomNumbers(3, 3, 9, []);
    for (let i = 0; i < number.length; i++) {
      const newAccountHistory = await AccountHistoryModel.create({
        walletAddress: wallet,
        puzzleId: number[i],
        typeAction: UserAction.PLAY_PUZZLE,
        checkTask: true,
        checkQuiz: true
      });
      await newAccountHistory.save();
    }

    //? Update User Action
    const claimGiftAction = await AccountHistoryModel.findOne({
      walletAddress: wallet,
      typeAction: UserAction.CLAIM_GIFT
    });
    if (claimGiftAction) {
      return ctx.body = { message: "You have been already claimed gift" };
    }

    const newAccountHistory = await AccountHistoryModel.create({
      walletAddress: wallet,
      typeAction: UserAction.CLAIM_GIFT
    });
    await newAccountHistory.save();
    ctx.body = { message: "Claimed gift successfully" };
  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});
PuzzleRoute.get("/check-claim-gift", GetUserInfo, async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    console.log("NGU")
    const user = (ctx.state as any).user;
    if (!user) {
      ctx.status = HttpStatusCode.Unauthorized;
      return ctx.body = { message: "Unauthorized" };
    }
    const wallet = (user as any).walletAddress;


    const claimGiftAction = await AccountHistoryModel.findOne({
      walletAddress: wallet,
      typeAction: UserAction.CLAIM_GIFT
    });
    if (claimGiftAction) {
      return ctx.body = { message: true };
    }
    ctx.body = { message: false };
  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});


export { PuzzleRoute };
