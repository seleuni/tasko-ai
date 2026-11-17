import js from '@eslint/js';

// ESLint 최소 설정: 기본 추천 규칙 + JSX 문법 허용
export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // JSX 안에서 쓴 컴포넌트(motion 등)를 '사용함'으로 인식시키기 어려워 끈다
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
];
