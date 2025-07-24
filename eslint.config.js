import path from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 기본 JS/TS/React 설정
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      react: pluginReact,
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    settings: {
      react: {
        version: 'detect', // React version warning 방지
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,

      // 사용되지 않는 import 감지하고 error로 처리
      'unused-imports/no-unused-imports': 'error',

      // React 관련 룰 수동 설정
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // import 관련
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
      'import/no-unresolved': 'off', // optional: false positive 방지
      'import/prefer-default-export': 'off',

      // 기타 코드 스타일
      'comma-dangle': ['error', 'always-multiline'],
    },
  },

  // TypeScript 설정 포함
  ...tseslint.configs.recommended,

  // Airbnb-base 확장
  ...compat.extends('airbnb-base'),

  // config 파일 예외 설정
  {
    files: ['eslint.config.js'],
    rules: {
      'no-underscore-dangle': 'off',
      'import/no-extraneous-dependencies': ['error', { packageDir: __dirname }],
    },
  },

  // 테스트, 설정 파일에서 devDependencies 허용
  {
    files: [
      '**/*.test.{js,ts,jsx,tsx}',
      '**/*.spec.{js,ts,jsx,tsx}',
      '**/vite.config.{js,ts}',
      '**/playwright.config.{ts,cts}',
      '**/eslint.config.js',
    ],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
    },
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
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
      'import/prefer-default-export': 'off',
    },
  },
];
