import { render, screen } from '@testing-library/react';

import StarRating from '.';

describe('StarRating', () => {
  const generateNextImageUrl = (url: string) => `/_next/image?url=%2F${url}&w=256&q=75`;

  const renderStarRating = () => render((
    <StarRating type={given.type} maxRating={5} rating={given.rating} />
  ));

  context('type이 detail인 경우', () => {
    given('rating', () => 4.2);

    it('className은', () => {
      renderStarRating();

      expect(screen.getByTestId('decimal-empty-star')).toHaveClass('');
    });
  });

  // context('type이 list인 경우', () => {
  //   given('rating', () => 4.2);

  // });

  describe('rating에 따라 star상태가 변경된다.', () => {
    context('rating이 첫번째 소수점자리가 0.3미만인 경우', () => {
      given('rating', () => 4.2);

      it('empty 별이 보여야만 한다', () => {
        renderStarRating();

        expect(screen.getByTestId('decimal-empty-star')).toBeInTheDocument();
      });
    });

    context('rating이 첫번째 소수점자리가 0.3이상 0.8미만인 경우', () => {
      given('rating', () => 4.5);

      it('half 별이 보여야만 한다', () => {
        renderStarRating();

        expect(screen.getByTestId('decimal-half-star')).toBeInTheDocument();
      });
    });

    context('rating이 첫번째 소수점자리가 0.8초과인 경우', () => {
      given('rating', () => 4.9);

      it('fill 별이 보여야만 한다', () => {
        renderStarRating();

        expect(screen.getByTestId('decimal-fill-star')).toBeInTheDocument();
      });
    });
  });
});
