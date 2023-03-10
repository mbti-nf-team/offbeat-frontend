import { render } from '@testing-library/react';

import MockTheme from 'utils/test/MockTheme';

import CountryItem from './CountryItem';

describe('CountryItem', () => {
  const countryName = 'λνλ―Όκ΅­';

  const renderCountryItem = () => render((
    <MockTheme>
      <CountryItem emoji="π°π·" koreanName={countryName} />
    </MockTheme>
  ));

  it('λλΌ μ΄λ¦μ΄ λνλμΌλ§ νλ€', () => {
    const { container } = renderCountryItem();

    expect(container).toHaveTextContent(countryName);
  });
});
