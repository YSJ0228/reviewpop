// eslint.config.mjs
import nextConfig from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

const config = [
  // ESLint가 무시할 파일/폴더
  {
    ignores: [
      ".next/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
      "dist/**",
      "public/**",
    ],
  },

  // Next.js 권장 규칙 (core-web-vitals 포함)
  ...nextConfig,

  // TypeScript 권장 규칙
  ...tseslint.configs.recommended,

  // Prettier와 충돌 방지
  prettierConfig,

  // 사용자 정의 규칙
  {
    rules: {
      // TypeScript 관련 커스텀 룰
      "@typescript-eslint/explicit-function-return-type": "off", // 함수 반환 타입 생략 허용
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // _로 시작하는 매개변수는 무시
    },

    settings: {
      react: {
        version: "detect", // React 19 버전에 맞게 자동 감지
      },
    },
  },
];

export default config;