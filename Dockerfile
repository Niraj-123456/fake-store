ARG APP_NAME=web
FROM node:18-alpine AS base

FROM base AS prune
ARG APP_NAME
RUN apk update && apk add --no-cache libc6-compat

WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune --scope=$APP_NAME --docker


FROM base AS installer
ARG APP_NAME
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=prune /app/out/json/ .

RUN npm install

FROM base AS builder
ARG APP_NAME
WORKDIR /app
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=prune /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo build --filter=$APP_NAME

FROM base AS runner
ARG APP_NAME
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 app-group && \
    adduser --system --uid 1001 app-user
USER app-user

# Copy dependencies, build and public dirctories
COPY --from=installer --chown=app-user:app-group /app/node_modules /app/node_modules
COPY --from=prune --chown=app-user:app-group /app/out/json/ .
COPY --from=builder --chown=app-user:app-group /app/apps/$APP_NAME/.next /app/apps/$APP_NAME/.next
COPY --from=builder --chown=app-user:app-group /app/apps/$APP_NAME/public /app/apps/$APP_NAME/public

WORKDIR /app/apps/$APP_NAME

CMD [ "npm", "run", "start" ]


