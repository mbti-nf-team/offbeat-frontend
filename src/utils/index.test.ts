import { codeToFlag, numberWithComma } from '@/utils';

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
