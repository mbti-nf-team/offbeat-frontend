import { render } from '@testing-library/react';

import SearchCountry from '.';

describe('SearchCountry', () => {
  const countryName = 'korea';

  const renderSearchCountry = () => render((
    <SearchCountry countries={[{
      emoji: '',
      code: 'kr',
      englishName: countryName,
      koreanName: countryName,
      ranking: 1,
    }]}
    />
  ));

  it('나라 리스트가 나타나만 한다', () => {
    const { container } = renderSearchCountry();

    expect(container).toHaveTextContent(countryName);
  });
});
