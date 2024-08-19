import {
  codeToFlag, getSettledValue, numberWithComma, targetFalseThenValue,
} from '@/utils';

describe('codeToFlag', () => {
  it('flag 이모지 유니코드로 변경되어야만 한다.', () => {
    const result = codeToFlag('KR');

    expect(result).toBe('🇰🇷');
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

describe('targetFalseThenValue', () => {
  const value = 'result';

  context('target이 false인 경우', () => {
    it('value를 그대로 반환해야만 한다', () => {
      const result = targetFalseThenValue(false)(value);

      expect(result).toBe(value);
    });
  });

  context('target이 true인 경우', () => {
    it('undefined를 반환해야만 한다', () => {
      const result = targetFalseThenValue(true)(value);

      expect(result).toBeUndefined();
    });
  });
});

describe('getSettledValue', () => {
  const defaultValue = 'default';

  context('fulfilled 상태인 경우', () => {
    it('성공한 결과값이 반환되어야만 한다', async () => {
      const result = await Promise.allSettled([Promise.resolve('success')]);
      const settledValue = getSettledValue(result[0], defaultValue);

      expect(settledValue).toBe('success');
    });
  });

  context('rejected 상태인 경우', () => {
    it('default value가 반환되어야만 한다', async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      const result = await Promise.allSettled([Promise.reject('error')]);
      const settledValue = getSettledValue(result[0], defaultValue);

      expect(settledValue).toBe(defaultValue);
    });
  });

  context('결과 값이 null인 경우', () => {
    it('default value가 반환되어야만 한다', () => {
      const result = null;
      const settledValue = getSettledValue(result, defaultValue);

      expect(settledValue).toBe(defaultValue);
    });
  });

  context('결과 값이 undefined인 경우', () => {
    it('default value가 반환되어야만 한다', () => {
      const result = undefined;
      const settledValue = getSettledValue(result, defaultValue);

      expect(settledValue).toBe(defaultValue);
    });
  });
});
