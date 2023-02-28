import { render } from '@testing-library/react';

import CountryList from './CountryList';

describe('CountryList', () => {
  const countryName = 'korea';

  const renderCountryList = () => render((
    <CountryList countries={[{
      emoji: '',
      id: '1',
      name: countryName,
    }]}
    />
  ));

  it('나라 리스트가 나타나만 한다', () => {
    const { container } = renderCountryList();

    expect(container).toHaveTextContent(countryName);
  });
});
