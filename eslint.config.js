import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // JavaScript/TypeScript 기본 설정
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Airbnb 설정 (포맷팅 규칙 제외)
  ...compat.extends('airbnb-base').map(config => ({
    ...config,
    rules: {
      ...config.rules,
      // Prettier와 충돌하는 포맷팅 규칙들 비활성화
      'comma-dangle': 'off',
      'max-len': 'off',
      'object-curly-newline': 'off',
      'object-curly-spacing': 'off',
      'operator-linebreak': 'off',
      'implicit-arrow-linebreak': 'off',
      'function-paren-newline': 'off',
      'arrow-parens': 'off',
      'brace-style': 'off',
      'space-before-function-paren': 'off',
      'multiline-ternary': 'off',
      'newline-per-chained-call': 'off',
      indent: 'off',
      quotes: 'off',
      semi: 'off',
    },
  })),

  // Prettier 충돌 방지 (모든 포맷팅 규칙 자동 비활성화)
  ...compat.extends('prettier'),

  // 프로젝트별 설정
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      // '@/*' alias를 internal로 분류 (import/order 정렬 일관성)
      'import/internal-regex': '^@/',
    },
    rules: {
      // 사용하지 않는 import 정리
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // React 설정
      'react/react-in-jsx-scope': 'off', // React 17+ 자동 import
      'react/prop-types': 'off', // TypeScript 사용으로 불필요
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',

      // Import 관련
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-unresolved': 'error',
      'import/prefer-default-export': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // TypeScript 관련
      '@typescript-eslint/no-unused-vars': 'off', // unused-imports가 처리
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // 코드 품질
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // 설정 파일 예외 처리
  {
    files: ['eslint.config.js'],
    rules: {
      'no-underscore-dangle': 'off',
      'import/no-extraneous-dependencies': ['error', { packageDir: __dirname }],
    },
  },

  // 빌드/설정 파일들
  {
    files: [
      '**/tailwind.config.{js,cjs,mjs,ts}',
      '**/postcss.config.{js,cjs,mjs,ts}',
      '**/vite.config.{js,ts}',
      '**/playwright.config.{ts,cts}',
    ],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },

  // 테스트 파일
  {
    files: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // TypeScript 타입 정의 파일
  {
    files: ['**/types.ts', '**/*.d.ts'],
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  {
    ignores: ['dist/', 'build/', 'node_modules/'],
  },
];
