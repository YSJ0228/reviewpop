// eslint.config.mjs
import { defineConfig } from "eslint/config";

export default defineConfig({
  root: true,

  // ESLint가 무시할 파일/폴더
  ignores: [
    ".next/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "dist/**",
    "public/**",
  ],

  // ESLint 확장 설정
  extends: [
    "next/core-web-vitals",              // Next.js 권장 규칙
    "plugin:@typescript-eslint/recommended", // TypeScript 권장 규칙
    "prettier",                           // Prettier와 충돌 방지
  ],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  rules: {
    // TypeScript 관련 커스텀 룰
    "@typescript-eslint/explicit-function-return-type": "off", // 함수 반환 타입 생략 허용
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // _로 시작하는 매개변수는 무시

    // 필요에 따라 추가적인 Next.js/React 커스텀 룰 가능
  },

  settings: {
    react: {
      version: "detect", // React 19 버전에 맞게 자동 감지
    },
  },
});