import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import cypressPlugin from 'eslint-plugin-cypress';
import chaiFriendlyPlugin from 'eslint-plugin-chai-friendly';

export default [
  {
    ignores: ['node_modules/**', 'cypress/reports/**', 'cypress/videos/**', 'cypress/screenshots/**']
  },
  {
    files: ['cypress/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'cypress': cypressPlugin,
      'chai-friendly': chaiFriendlyPlugin
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-namespace': 'off',
      'cypress/no-unnecessary-waiting': 'warn'
    }
  }
];
