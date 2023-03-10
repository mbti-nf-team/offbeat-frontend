import { memo } from 'react';

import styled from 'styled-components';

type Props = {
  koreanName: string;
  emoji: string;
};

function CountryItem({ emoji, koreanName }: Props) {
  return (
    <CountryItemWrapper
      role="button"
      tabIndex={0}
    >
      <div>{emoji}</div>
      <div>{koreanName}</div>
    </CountryItemWrapper>
  );
}

export default memo(CountryItem);

const CountryItemWrapper = styled.li`
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
