import { render, screen } from '@testing-library/react';

import Button from '.';

describe('Button', () => {
  const renderButton = () => render((
    <Button href={given.url}>
      버튼
    </Button>
  ));

  describe('"href" 속성 유무에 따라 버튼 또는 링크가 나타난다', () => {
    context('버튼인 경우', () => {
      given('url', () => undefined);

      it('"href" 속성이 없어야만 한다', () => {
        renderButton();

        expect(screen.getByText('버튼')).not.toHaveAttribute('href', '/test');
      });
    });

    context('링크인 경우', () => {
      given('url', () => '/test');

      it('href 속성이 존재해야만 한다', () => {
        renderButton();

        expect(screen.getByText('버튼')).toHaveAttribute('href', '/test');
      });
    });
  });
});
