import { useRouter } from 'next/navigation';

import { fireEvent, render, screen } from '@testing-library/react';

import CountryItem from '.';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CountryItem', () => {
  const countryName = '대한민국';
  const countryCode = 'KR';
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  const renderCountryItem = () => render((
    <CountryItem code={countryCode} emoji="🇰🇷" koreanName={countryName} />
  ));

  it('나라 이름이 나타나야만 한다', () => {
    const { container } = renderCountryItem();

    expect(container).toHaveTextContent(countryName);
  });

  describe('나라 아이템을 선택한다', () => {
    it('router push 이벤트가 발생해야만 한다', () => {
      renderCountryItem();

      fireEvent.click(screen.getByText(countryName));

      expect(mockPush).toHaveBeenCalledWith(`/maps?country=${countryCode}`);
    });
  });
});
