/* eslint-disable import/prefer-default-export */
export const codeToFlag = (code: string): string => String.fromCodePoint(
  ...code.toUpperCase()
    .split('')
    .map((c) => 127397 + c.charCodeAt(0)),
);
