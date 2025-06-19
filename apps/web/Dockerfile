FROM node:18-alpine AS base

FROM base AS prune
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune web --docker


FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=prune /app/out/json/ .
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/node_modules /app/node_modules

COPY --from=prune /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo build --filter=web

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 web-group
RUN adduser --system --uid 1001 web-user
USER web-user

# Copy dependencies, build and public dirctories
COPY --from=installer --chown=web-user:web-group /app/node_modules /app/node_modules
COPY --from=prune --chown=web-user:web-group /app/out/json/ .
COPY --from=builder --chown=web-user:web-group /app/apps/web/.next /app/apps/web/.next
COPY --from=builder --chown=web-user:web-group /app/apps/web/public /app/apps/web/public

WORKDIR /app/apps/web

CMD [ "npm", "run", "start" ]


