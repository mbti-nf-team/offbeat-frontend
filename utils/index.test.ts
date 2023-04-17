import {
  checkEmpty, checkNumberValue, codeToFlag, generateArrayOfNumber, numberWithComma,
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

describe('checkEmpty', () => {
  context('value가 undefined이거나 빈 배열인 경우', () => {
    it('빈 배열을 반환해야만 한다', () => {
      const result = checkEmpty();

      expect(result).toEqual([]);
    });
  });

  context('value가 undefined이거나 빈 배열이 아닌 경우', () => {
    const mockArray = ['test', 'test2'];

    it('입력된 값이 반환되어야 한다', () => {
      const result = checkEmpty(mockArray);

      expect(result).toEqual(mockArray);
    });
  });
});

describe('numberWithComma', () => {
  context('숫자인 경우', () => {
    it('콤마가 붙은 숫자 string형이 반환되어야만 한다', () => {
      const result = numberWithComma(1000000);

      expect(result).toBe('1,000,000');
    });
  });

  context('값이 존재하지 않을 경우', () => {
    context('두번째 파라미터를 넘겨주지 않을 경우', () => {
      it('0이 반횐돠어야만 한다', () => {
        const result = numberWithComma();

        expect(result).toBe('0');
      });
    });

    context('두번째 파라미터가 false인 경우', () => {
      it('""가 반횐돠어야만 한다', () => {
        const result = numberWithComma(null, false);

        expect(result).toBe('');
      });
    });

    context('두번째 파라미터가 true인 경우', () => {
      it('0이 반횐돠어야만 한다', () => {
        const result = numberWithComma(null, true);

        expect(result).toBe('0');
      });
    });
  });
});
