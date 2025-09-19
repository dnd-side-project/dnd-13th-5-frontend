export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 허용할 커밋 타입
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'refactor',
        'chore',
        'rename',
        'remove',
        'fix',
        'build',
        'ci',
        'perf',
        'style',
        'docs',
        'hotfix',
      ],
    ],
    // 제목 형식 검사 (대문자/소문자 자유)
    'subject-case': [0, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
  },
};
