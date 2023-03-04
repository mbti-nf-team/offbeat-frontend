'use client';

import styled from 'styled-components';

type Props = {
  countries: {
    id: number;
    code: string;
    name: string;
    emoji: string;
  }[]
};

function CountryList({ countries }: Props) {
  return (
    <CountryListWrapper>
      {countries.map(({ id, name, emoji }) => (
        <CountryItem key={id}>
          <div>{emoji}</div>
          <div>{name}</div>
        </CountryItem>
      ))}
    </CountryListWrapper>
  );
}
export default CountryList;

const CountryListWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CountryItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.black};
  gap: 16px;

  /* TODO - 폰트 정의 */
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
`;
