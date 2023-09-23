import { render, screen } from '@testing-library/react';

import ResultCard from '.';

describe('ResultCard', () => {
  const generateNextImageUrl = (url: string) => `/_next/image?url=%2F${url}&w=256&q=75`;

  const renderResultCard = () => render((
    <ResultCard url="#" description="description" title="title" thumbnail={given.thumbnail} />
  ));

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
