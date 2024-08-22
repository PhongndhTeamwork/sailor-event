import Router from "@koa/router";
import { ParameterizedContext } from "koa";
import { AppState } from "@models/app.state";
import { Context } from "vm";
// import { QuizModel } from "@entities/mongo-model/quiz.entity";
import * as console from "node:console";
import QuizModel from "@entities/mongo-model/quiz.entity";
import AccountHistoryModel from "@entities/mongo-model/account-history.entity";
import { HttpStatusCode } from "axios";

const QuizRoute = new Router({
  prefix: "/quiz"
});

QuizRoute.get("/random-quiz", async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    // const quizzes = await QuizController.getAllQuizzes(); // Assuming you have a method to get quizzes
    const randomQuizId = Math.ceil(Math.random() * 30);
    const quiz = await QuizModel.findOne({ quizId: randomQuizId }).lean();
    // transform result
    delete (quiz as any).answerId;
    delete (quiz as any)._id;
    (quiz as any).options.map((option: any) => {
      delete option._id;
      return option;
    });
    // quiz = TransformData.removeRedundantData(quiz);
    ctx.body = { quiz: quiz };
  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});
QuizRoute.get("/verify-quiz/:quizId/:puzzleId", async (ctx: ParameterizedContext<AppState, Context>) => {
  try {
    const user = (ctx.status as any).user;
    if (!user) {
      ctx.status = HttpStatusCode.Unauthorized;
      return ctx.body = { message: "Unauthorized" };
    }
    const wallet = (user as any).walletAddress;

    // const {wallet } = ctx.params;
    const { quizId, puzzleId } = ctx.params;
    const queryParams = ctx.request.query;
    const answerId = queryParams.answerId;

    const accountHistory = await AccountHistoryModel.findOne({ walletAddress: wallet, puzzleId });
    if (!accountHistory) {
      return ctx.body = { message: "You have not finished task yet" };
    }
    if ((accountHistory as any).checkQuiz === true) {
      return ctx.body = { message: "You have already finished this puzzle" };
    }

    const quiz = await QuizModel.findOne({ quizId: quizId });
    if ((quiz as any).answerId === +answerId) {
      (accountHistory as any).checkQuiz = true;
      const result = await accountHistory.save();
      ctx.body = { message: result };
    } else {
      ctx.body = { message: "Answer false" };
    }

  } catch (error) {
    console.log(error);
    ctx.status = HttpStatusCode.InternalServerError;
    ctx.body = { message: "An error occurred", error };
  }
});


export { QuizRoute };