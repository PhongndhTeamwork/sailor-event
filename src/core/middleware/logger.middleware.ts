import { logger } from '@core/logger';
import { Context, Middleware, Next } from 'koa';

export const loggerMiddleware: Middleware = async (
  ctx: Context,
  next: Next,
) => {
  logger.info(`Start: ${ctx.method} ${ctx.url}`);

  if (Object.keys((ctx.request as any).body|| {}).length > 0) {
    // TODO: Make it configurable
    const body = JSON.stringify((ctx.request as any).body).replace(
      /"password":".*?"/g,
      '"password":"[MASKED]"',
    );
    logger.info(`Params: ${body}`);
  }

  await next();

  logger.info(`End: ${ctx.method} ${ctx.url}`);
};
