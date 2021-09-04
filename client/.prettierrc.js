/**
 * Prettier 옵션
 * - https://prettier.io/docs/en/options.html
 */
module.exports = {
  // 한 줄 최대 문자 수
  printWidth: 80,
  // 들여쓰기 시, 탭 너비
  tabWidth: 2,
  // 스페이스 대신 탭 사용
  useTabs: false,
  // 문장 끝 세미콜론 사용
  semi: true,
  // 작은 따옴표 사용
  singleQuote: true,
  // ES5 Object, Array에 꼬리 콤마 사용
  trailingComma: 'es5',
  // 중괄호 내에 공백 사용
  bracketSpacing: true,
  // 화살표 함수 단일 인자 시, 괄호 생략
  arrowParens: 'avoid',
  // 마크다운 포매팅 제외
  proseWrap: 'never',
  // 개행문자 유지 (혼합일 경우, 첫 줄 개행문자로 통일)
  endOfLine: 'auto',
};
