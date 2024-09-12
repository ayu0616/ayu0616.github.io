FROM node:22-alpine

ENV PNPM_HOME=/pnpm

WORKDIR /app
RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "dev"]
