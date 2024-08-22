FROM node:18-alpine@sha256:bf6c61feabc1a1bd565065016abe77fa378500ec75efa67f5b04e5e5c4d447cd as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

COPY . .

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:18-alpine@sha256:bf6c61feabc1a1bd565065016abe77fa378500ec75efa67f5b04e5e5c4d447cd

WORKDIR /app

COPY --from=builder /app  .

#ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 3000
RUN apk add build-base gcompat 

CMD yarn migrate:run; yarn start --max-old-space-size=4096


