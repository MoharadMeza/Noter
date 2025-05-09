import { FlatCompat } from '@eslint/eslintrc'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import sonarjs from 'eslint-plugin-sonarjs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Determine if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development'

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: [
      // Build artifacts
      'node_modules/**',
      'dist/**',
      '.next/**',
      'out/**',
      'build/**',
      '.vscode/**',

      // Scripts folder
      'scripts/**',

      // Temp folder
      'src/libs/components/temp/**',

      // Other common ignores
      'coverage/**',
      'public/**',
      '*.config.js',
    ],
  },
  // JavaScript files config
  {
    files: ['*.js', '*.mjs'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
  },
  // TypeScript files config
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
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'sonarjs/no-implicit-dependencies': 'warn',
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
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{lodash,axios,redux,express,@reduxjs/**,@apollo/**}',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '{lodash/*,axios/*,redux/*,express/*}',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '**/*.{container,component}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '**/*.{.ts,.js}',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@libs/utils/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '**/*.d.ts',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '**/*.{scss,module.scss}',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '**/*.css',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '*.{css,scss,sass,less}',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
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
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'next',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended'
  ),
]

export default eslintConfig
