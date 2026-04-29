import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import-x'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import sonarjs from 'eslint-plugin-sonarjs'

const isDevelopment = process.env.NODE_ENV === 'development'

const eslintConfig = [
  prettierConfig,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.next/**',
      'out/**',
      'build/**',
      '.vscode/**',
      'scripts/**',
      'src/libs/components/temp/**',
      'coverage/**',
      'public/**',
      'prisma/generated/**',
      'next-env.d.ts',
      '*.config.js',
    ],
  },
  {
    files: ['*.js', '*.mjs'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      sonarjs,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'sonarjs/no-implicit-dependencies': 'off',
      'no-console': isDevelopment ? 'off' : ['warn', { allow: ['warn', 'error'] }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'react/**', group: 'external', position: 'before' },
            { pattern: 'next', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external', position: 'before' },
            { pattern: 'next-intl', group: 'external', position: 'before' },
            { pattern: 'next-intl/**', group: 'external', position: 'before' },
            {
              pattern:
                '{axios,axios/**,lodash,lodash/**,@tanstack/**,zustand,zustand/**,zod,zod/**,react-hook-form,@hookform/**,jose,clsx,tailwind-merge,typescript-cookie,server-only}',
              group: 'external',
              position: 'after',
            },
            { pattern: '@server/**', group: 'internal', position: 'before' },
            { pattern: '@db-client', group: 'internal', position: 'before' },
            { pattern: '@db-models', group: 'internal', position: 'before' },
            { pattern: '@config/**', group: 'internal', position: 'before' },
            { pattern: '@libs/**', group: 'internal', position: 'before' },
            {
              pattern: '@*/**/*.{css,scss,sass,less,module.css,module.scss}',
              group: 'internal',
              position: 'after',
            },
            { pattern: '@components/**', group: 'internal', position: 'before' },
            { pattern: '@app-types/**', group: 'internal', position: 'before' },
            { pattern: '@app/**', group: 'internal', position: 'before' },
            { pattern: '@/**', group: 'internal', position: 'before' },
            { pattern: '**/*.{container,component}', group: 'internal', position: 'after' },
            { pattern: '**/*.d', group: 'internal', position: 'after' },
            { pattern: '**/*.{scss,module.scss}', group: 'internal', position: 'after' },
            { pattern: '**/*.css', group: 'internal', position: 'after' },
            { pattern: '*.{css,scss,sass,less}', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '.',
              message: "Use absolute imports instead: import { x } from '@/path/to/file'",
            },
            {
              name: '..',
              message: "Use absolute imports instead: import { x } from '@/path/to/file'",
            },
            {
              name: './',
              message: "Use absolute imports instead: import { x } from '@/path/to/file'",
            },
            {
              name: '../',
              message: "Use absolute imports instead: import { x } from '@/path/to/file'",
            },
          ],
          patterns: [
            {
              group: ['.*'],
              message: "Use absolute imports instead: import { x } from '@/path/to/file'",
            },
          ],
        },
      ],
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
  },
]

export default eslintConfig
