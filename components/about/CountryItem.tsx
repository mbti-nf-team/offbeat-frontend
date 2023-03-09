import { memo } from 'react';

import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';

type Props = {
  koreanName: string;
  emoji: string;
};

const countryItemVariants: Variants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: [0, 0.71, 0.2, 1.01],
    },
  },
  exit: {
    opacity: 0,
  },
};

function CountryItem({ emoji, koreanName }: Props) {
  return (
    <CountryItemWrapper
      role="button"
      tabIndex={0}
      layout
      variants={countryItemVariants}
      initial="closed"
      animate="open"
      exit="exit"
    >
      <div>{emoji}</div>
      <div>{koreanName}</div>
    </CountryItemWrapper>
  );
}

export default memo(CountryItem);

const CountryItemWrapper = styled(motion.li)`
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
