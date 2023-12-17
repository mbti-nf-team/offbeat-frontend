import { fireEvent, render, screen } from '@testing-library/react';

import ResultCard from '.';

describe('ResultCard', () => {
  const handleClick = jest.fn();
  const generateNextImageUrl = (url: string) => `/_next/image?url=%2F${url}&w=256&q=75`;
  const url = 'test.com';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderResultCard = () => render((
    <ResultCard url={url} description="description" title="title" thumbnail={given.thumbnail} onClickCard={handleClick} />
  ));

  describe('card를 클릭한다', () => {
    it('url과 함께 클릭이벤트가 발생한다', () => {
      renderResultCard();

      fireEvent.click(screen.getByTestId('result_card'));

      expect(handleClick).toHaveBeenCalledWith(url);
    });
  });

  context('썸네일이 존재하지 않는 경우', () => {
    given('thumbnail', () => undefined);

    it('빈 썸네일이 나타나야만 한다', () => {
      renderResultCard();

      expect(screen.getByTestId('empty-thumbnail')).toBeInTheDocument();
    });
  });

  context('썸네일이 존재하는 경우', () => {
    given('thumbnail', () => '/test');

    it('썸네일 image가 보여야만 한다', () => {
      renderResultCard();

      expect(screen.getByTestId('thumbnail')).toHaveAttribute('src', generateNextImageUrl('test'));
    });
  });
});
