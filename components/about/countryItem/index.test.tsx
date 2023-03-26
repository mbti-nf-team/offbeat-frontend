import { render } from '@testing-library/react';

import CountryItem from '.';

describe('CountryItem', () => {
  const countryName = '대한민국';

  const renderCountryItem = () => render((
    <CountryItem emoji="🇰🇷" koreanName={countryName} />
  ));

  it('나라 이름이 나타나야만 한다', () => {
    const { container } = renderCountryItem();

    expect(container).toHaveTextContent(countryName);
  });
});
