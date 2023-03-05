'use client';

import { Country } from 'lib/model/country';
import styled from 'styled-components';

type Props = {
  countries: Country[];
};

function CountryList({ countries }: Props) {
  return (
    <CountryListWrapper>
      {countries.map(({ code, koreanName, emoji }) => (
        <CountryItem role="button" tabIndex={0} key={code}>
          <div>{emoji}</div>
          <div>{koreanName}</div>
        </CountryItem>
      ))}
    </CountryListWrapper>
  );
}
export default CountryList;

const CountryListWrapper = styled.ul`
  user-select: none;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CountryItem = styled.li`
  cursor: pointer;
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
  transition: background-color 0.1s ease-in-out;

  @media(hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ theme }) => theme.gray100};
    }
  }
`;
