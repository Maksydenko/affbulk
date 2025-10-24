import rcPlugin from 'eslint-plugin-react';
import rcHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';

const flatCompat = new FlatCompat({
  baseDirectory: import.meta.url
});

const eslintConfig = [
  ...flatCompat.extends(
    'plugin:perfectionist/recommended-natural-legacy',
    'plugin:@typescript-eslint/recommended'
  ),
  {
    ignores: ['node_modules']
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      react: rcPlugin,
      'react-hooks': rcHooksPlugin,
      'simple-import-sort': simpleImportSortPlugin
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '_'
        }
      ],
      'arrow-body-style': ['error', 'as-needed'],
      curly: ['error', 'all'],
      'func-style': ['error', 'expression'],
      'no-empty-pattern': 'error',
      'no-useless-rename': 'error',
      'object-shorthand': ['error', 'always'],
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-jsx-props': 'off',
      'prefer-template': 'error',
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true
        }
      ],
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/button-has-type': 'error',
      'react/jsx-no-useless-fragment': [
        'error',
        {
          allowExpressions: false
        }
      ],
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          ignoreCase: true,
          reservedFirst: true,
          shorthandLast: true
        }
      ],
      'react/self-closing-comp': 'error',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react$', '^[a-z]'],
            ['^@'],
            ['^@/app'],
            ['^@/pages'],
            ['^@/widgets'],
            ['^@/features'],
            ['^@/entities'],
            ['^@/shared'],
            ['^@/'],
            ['\\/api$'],
            ['\\/config$'],
            ['\\/lib$'],
            ['\\/model$'],
            ['\\/ui$'],
            ['\\.provider$'],
            ['\\.context$'],
            ['\\.service$'],
            ['\\.util$'],
            ['\\.data$'],
            ['\\.const$'],
            ['\\.config$'],
            ['\\.enum$'],
            ['\\.type$'],
            ['\\.interface$'],
            ['^\\.\\.*/use[A-Z].*$', '^\\.*/use[A-Z].*$'],
            ['^\\.\\.(?!/?$)', '^\\.(?!/?$)'],
            ['^.+\\.json$'],
            ['^.+\\.svg$'],
            ['^.+\\.s?css$']
          ]
        }
      ]
    }
  }
];

export default eslintConfig;
