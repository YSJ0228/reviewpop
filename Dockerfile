# ============================================================
# Next.js Standalone 모드 Dockerfile
# ============================================================
# 멀티스테이지 빌드로 이미지 크기 최적화 (~100MB)
# ARM64 아키텍처 (Graviton2)

# Stage 1: 빌드
FROM arm64v8/node:20-slim AS builder

WORKDIR /app

# corepack 활성화 및 yarn 설정
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

# 의존성 파일 복사
COPY package.json yarn.lock .yarnrc.yml ./

# 의존성 설치
RUN yarn install --immutable

# 소스 코드 복사 및 빌드
COPY . .
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
