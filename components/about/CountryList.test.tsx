import { render } from '@testing-library/react';

import CountryList from './CountryList';

describe('CountryList', () => {
  const countries = [{
    code: 'KP',
    koreanName: '๋ถํ',
    englishName: 'Korea, Democratic People"S Republic of',
    emoji: '๐ฐ๐ต',
  }, {
    code: 'KR',
    koreanName: '๋ํ๋ฏผ๊ตญ',
    englishName: 'Korea, Republic of',
    emoji: '๐ฐ๐ท',
  }];

  const renderCountryList = () => render((
    <CountryList
      keyword={given.keyword}
      countries={countries}
    />
  ));

  context('keyword๊ฐ ์กด์ฌํ์ง ์๋ ๊ฒฝ์ฐ', () => {
    given('keyword', () => '');

    it('์ ์ฒด ๋๋ผ ๋ฆฌ์คํธ๊ฐ ๋ํ๋์ผ๋ง ํ๋ค', () => {
      const { container } = renderCountryList();

      expect(container).toHaveTextContent(countries[0].koreanName);
      expect(container).toHaveTextContent(countries[1].koreanName);
    });
  });

  context('keyword๊ฐ ์กด์ฌํ๋ ๊ฒฝ์ฐ', () => {
    context('keyword์ ์ผ์นํ๋ ๋๋ผ๊ฐ ์กด์ฌํ๋ ๊ฒฝ์ฐ', () => {
      given('keyword', () => countries[1].koreanName);

      it('keyword์ ์ผ์นํ๋ ๋๋ผ๋ง ๋ํ๋๋ง ํ๋ค', () => {
        const { container } = renderCountryList();

        expect(container).not.toHaveTextContent(countries[0].koreanName);
        expect(container).toHaveTextContent(countries[1].koreanName);
      });
    });

    context('keyword์ ์ผ์นํ๋ ๋๋ผ๊ฐ ์กด์ฌํ์ง ์๋ ๊ฒฝ์ฐ', () => {
      given('keyword', () => 'test');

      it('๋๋ผ ๋ฆฌ์คํธ๊ฐ ๋ํ๋์ง ์์๋จ ํ๋ค', () => {
        const { container } = renderCountryList();

        expect(container).not.toHaveTextContent(countries[0].koreanName);
        expect(container).not.toHaveTextContent(countries[1].koreanName);
      });
    });
  });
});
