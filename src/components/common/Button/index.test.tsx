import { render, screen } from '@testing-library/react';

import Button from '.';

describe('Button', () => {
  const renderButton = () => render((
    <Button href={given.url} isExternalLink={given.isExternalLink}>
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

      context('외부 링크인 경우', () => {
        given('isExternalLink', () => true);

        it('href 속성아 존재해야만 하고 target 속성은 "_blank"가 존재해야만 한다', () => {
          renderButton();

          expect(screen.getByText('버튼')).toHaveAttribute('href', '/test');
          expect(screen.getByText('버튼')).toHaveAttribute('target', '_blank');
        });
      });

      context('외부 링크가 아닌 경우', () => {
        given('isExternalLink', () => false);

        it('href 속성아 존재해야만 하고 target 속성은 없어야만 한다', () => {
          renderButton();

          expect(screen.getByText('버튼')).toHaveAttribute('href', '/test');
          expect(screen.getByText('버튼')).not.toHaveAttribute('target', '_blank');
        });
      });
    });
  });
});
