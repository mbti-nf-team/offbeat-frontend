import {
  checkNumberValue, codeToFlag, generateArrayOfNumber,
} from 'utils';

describe('codeToFlag', () => {
  it('flag 이모지 유니코드로 변경되어야만 한다.', () => {
    const result = codeToFlag('KR');

    expect(result).toBe('🇰🇷');
  });
});

describe('generateArrayOfNumber', () => {
  it('넘겨준 값에 따른 길이의 배열을 반환해야만한다', () => {
    const result = generateArrayOfNumber(5);

    expect(result.length).toBe(5);
  });
});

describe('checkNumberValue', () => {
  context('number type이 아닌 경우', () => {
    it('0을 반환해야 한다', () => {
      const result = checkNumberValue(null);

      expect(result).toBe(0);
    });
  });

  context('number type인 경우', () => {
    it('그대로 입력된 값을 반환해야만 한다.', () => {
      const result = checkNumberValue(100);

      expect(result).toBe(100);
    });
  });
});
