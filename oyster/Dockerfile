FROM node:20-slim AS base

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

ENV NODE_ENV=production

RUN npm run build

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


ENV PORT=3000

CMD npm run start