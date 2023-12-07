FROM ghcr.io/hazmi35/node:20-dev-alpine as build-stage

RUN corepack enable && corepack prepare pnpm@latest

COPY . .

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN pnpm prune --production

FROM ghcr.io/hazmi35/node:20-alpine

COPY --from=build-stage /tmp/build/package.json .
COPY --from=build-stage /tmp/build/pnpm-lock.yaml .
COPY --from=build-stage /tmp/build/node_modules ./node_modules
COPY --from=build-stage /tmp/build/dist ./dist

CMD ["node", "dist/app.js"]