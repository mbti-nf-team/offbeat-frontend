export const codeToFlag = (code: string): string => String.fromCodePoint(
  ...code.toUpperCase()
    .split('')
    .map((c) => 127397 + c.charCodeAt(0)),
);

export const generateArrayOfNumber = (length: number) => Array.from({ length }, (_, i) => i);

export const checkNumberValue = (value?: number | null): number => {
  if (typeof value === 'number') {
    return value;
  }

  return 0;
};
