# ============================================================
# Next.js Standalone 모드 Dockerfile
# ============================================================
# 멀티스테이지 빌드로 이미지 크기 최적화 (~100MB)
# ARM64 아키텍처 (Graviton2)

# Stage 1: 빌드
FROM arm64v8/node:20-slim AS builder

WORKDIR /app

# corepack 활성화 및 yarn 설정
RUN corepack enable && corepack prepare yarn@4.10.3 --activate

# 의존성 파일만 먼저 복사 (캐시 활용)
COPY package.json yarn.lock .yarnrc.yml ./

# 의존성 설치 (ARM64 크로스 컴파일 시 lockfile 차이로 인해 --immutable 제외)
RUN yarn install

# 소스 코드 복사 (package 파일 제외하여 yarn install 결과 보존)
COPY src ./src
COPY public ./public
COPY next.config.ts tsconfig.json postcss.config.cjs ./

# 빌드
RUN yarn build

# Stage 2: 프로덕션 이미지
FROM arm64v8/node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 보안: non-root 사용자로 실행
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# standalone 산출물 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
