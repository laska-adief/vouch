# --- STAGE 1: Dependencies ---
FROM node:20-alpine AS deps
WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies including devDeps for the build
RUN npm ci

# --- STAGE 2: Builder ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client (crucial for the Linux environment)
RUN npx prisma generate
RUN npm run build

# --- STAGE 3: Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create your custom group and user
RUN addgroup --system --gid 1001 portfolio
RUN adduser --system --uid 1001 vouch

# 1. Copy Standalone files (transpiled JS)
# Standalone mode only copies the bare minimum to run the app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=vouch:portfolio /app/.next/standalone ./
COPY --from=builder --chown=vouch:portfolio /app/.next/static ./.next/static

# 2. Copy Prisma files for production migrations
COPY --from=builder --chown=vouch:portfolio /app/prisma ./prisma

USER vouch

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Automatically run migrations on startup then start the server
CMD npx prisma migrate deploy && node server.js