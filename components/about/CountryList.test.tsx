import { render } from '@testing-library/react';

import CountryList from './CountryList';

describe('CountryList', () => {
  const countries = [{
    code: 'KP',
    koreanName: '북한',
    englishName: 'Korea, Democratic People"S Republic of',
    emoji: '🇰🇵',
  }, {
    code: 'KR',
    koreanName: '대한민국',
    englishName: 'Korea, Republic of',
    emoji: '🇰🇷',
  }];

  const renderCountryList = () => render((
    <CountryList
      keyword={given.keyword}
      countries={countries}
    />
  ));

  context('keyword가 존재하지 않는 경우', () => {
    given('keyword', () => '');

    it('전체 나라 리스트가 나타나야만 한다', () => {
      const { container } = renderCountryList();

      expect(container).toHaveTextContent(countries[0].koreanName);
      expect(container).toHaveTextContent(countries[1].koreanName);
    });
  });

  context('keyword가 존재하는 경우', () => {
    context('keyword와 일치하는 나라가 존재하는 경우', () => {
      given('keyword', () => countries[1].koreanName);

      it('keyword와 일치하는 나라만 나타나만 한다', () => {
        const { container } = renderCountryList();

        expect(container).not.toHaveTextContent(countries[0].koreanName);
        expect(container).toHaveTextContent(countries[1].koreanName);
      });
    });

    context('keyword와 일치하는 나라가 존재하지 않는 경우', () => {
      given('keyword', () => 'test');

      it('나라 리스트가 나타나지 않아먄 한다', () => {
        const { container } = renderCountryList();

        expect(container).not.toHaveTextContent(countries[0].koreanName);
        expect(container).not.toHaveTextContent(countries[1].koreanName);
      });
    });
  });
});
