/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import Koa, { Context } from 'koa';
import { AppState } from '@models/app.state';
import Router from '@koa/router';
import { config } from '@config/app';
import { loggerMiddleware } from '@core/middleware/logger.middleware';
import { errorHandlerMiddleware } from '@core/middleware/error-handler.middleware';
import { useContainer } from 'typeorm';
import Container from 'typedi';
import { UserRoute } from '@controllers/user/user.controller';
import { QuizRoute } from "@controllers/sailor/quiz.controller";
import { PuzzleRoute } from "@controllers/sailor/puzzle.controller";
import { WhitelistRoute } from "@controllers/sailor/whitelist.controller";

// import { startConsumer } from './kafkaConsumer';

useContainer(Container);
const app = new Koa<AppState, Context>();
app.use(cors());
app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    jsonLimit: config.app.jsonLimit,
  }),
);
app.use(loggerMiddleware);
app.use(errorHandlerMiddleware);

const router = new Router();

const webRoutes = [UserRoute, QuizRoute, PuzzleRoute, WhitelistRoute];
// router.use(HealthRoute.routes());

router.use(`${config.app.api_prefix}`, ...webRoutes.map((e) => e.routes()));

app.use(router.routes()).use(router.allowedMethods());
// Tích hợp Kafka
// startConsumer();

// Tích hợp socket.io
// const server = http.createServer(app.callback());
// export const io = new Server(server, {
//   cors: { origin: '*' },
// });

// // Xử lý kết nối Socket.io
// io.on('connection', (socket) => {
//   socket.on(SOCKET_EVENTS.JOIN_ROOM, (mapId) => {
//     socket.join(mapId);
//   });
// });
if (process.env.NODE_ENV != 'development') {
  console.info = function () {};
  console.warn = function () {};
  console.log = function () {};
}

export default app;
