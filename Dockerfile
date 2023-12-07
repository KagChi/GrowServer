FROM ghcr.io/hazmi35/node:20-dev as build-stage

RUN corepack enable && corepack prepare pnpm@latest

COPY . .

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN pnpm prune --production

FROM ghcr.io/hazmi35/node:20

COPY --from=build-stage /tmp/build/. .

CMD ["node", "dist/app.js"]