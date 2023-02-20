import { render } from '@testing-library/react';

import Page from './page';

describe('Page', () => {
  const renderPage = () => render((
    <Page />
  ));

  it('Should be visible "Next.js"', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('Next.js');
  });
});
