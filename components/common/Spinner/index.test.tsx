import { render, screen } from '@testing-library/react';

import Spinner from '.';

describe('Spinner', () => {
  const renderSpinner = () => render((
    <Spinner isLoading={given.isLoading} />
  ));

  context('로딩중인 경우', () => {
    given('isLoading', () => true);

    it('로딩 스피너가 나타나야만 한다', () => {
      renderSpinner();

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  context('로딩중이 아닌 경우', () => {
    given('isLoading', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderSpinner();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
