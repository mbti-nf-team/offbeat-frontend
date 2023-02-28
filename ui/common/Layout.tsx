'use client';

import { PropsWithChildren } from 'react';

import styled from 'styled-components';

function Layout({ children }: PropsWithChildren) {
  return (
    <LayoutWrapper>
      <ContentBox>
        {children}
      </ContentBox>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  height: 100%;
  background-color: #EBEDF0;
`;

const ContentBox = styled.div`
  height: auto;
  width: auto;
  max-width: 430px;
  min-height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.gray100};
  margin: 0 auto;
  padding: 0;

  &::before {
    z-index: 10;
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-left: 1px solid #D2C6C6;
  }

  &::after {
    z-index: 10;
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-right: 1px solid #D2C6C6;
  }

  @media (max-width: 430px) {
    width: 100%;
    max-width: initial;

    &::before {
      content: none;
    }

    &::after {
      content: none;
    }
  }
`;

export default Layout;
