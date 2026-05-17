/**
 * Root ESLint Config - Basic workspace settings only
 * Individual projects have their own eslint.config.ts
 */
import markdown from '@eslint/markdown';

const MARKDOWN_FILES = ['**/*.md'];
const AGENTS_MARKDOWN_FILES = ['./.agents/skills/**/*.md'];

const markdownRecommendedConfigs = markdown.configs.recommended.map(config => ({
  ...config,
  files: MARKDOWN_FILES
}));

const markdownRecommendedRuleNames = [...new Set(markdown.configs.recommended.flatMap(config => Object.keys(config.rules ?? {})))];
const markdownRulesOffForAgents = Object.fromEntries(markdownRecommendedRuleNames.map(ruleName => [ruleName, 'off']));

export default [
  {
    name: 'root/workspace-ignore',
    ignores: [
      // App specific
      'frontend/dist/',
      'frontend/public/',
      'backend/target/',
      // Docs specific
      'docs/.nuxt/',
      'docs/.output/',
      // Common
      '**/node_modules/',
      '**/.vite/',
      '**/.cache/',
      '**/*.d.ts',
      '**/coverage/'
    ]
  },
  ...markdownRecommendedConfigs,
  {
    name: 'root/markdown-final-overrides',
    files: MARKDOWN_FILES,
    language: 'markdown/gfm',
    rules: {
      'markdown/no-missing-label-refs': 'off',
      'markdown/no-multiple-h1': 'off',
      'markdown/fenced-code-language': 'warn'
    }
  },
  {
    name: 'root/agents-markdown-overrides',
    files: AGENTS_MARKDOWN_FILES,
    language: 'markdown/gfm',
    rules: {
      ...markdownRulesOffForAgents,
      'markdown/fenced-code-language': 'warn'
    }
  }
];
