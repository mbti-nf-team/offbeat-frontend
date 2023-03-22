'use client';

import { ReactNode } from 'react';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

import lightTheme from '../styles/theme';

export const GlobalStyle = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }

  [data-rsbs-overlay], [data-rsbs-backdrop], [data-rsbs-root]:after {
    z-index: 10;
    max-width: 430px;
    margin: 0 auto;
  }

  [data-rsbs-backdrop] {
    background-color: transparent;
  }

  [data-rsbs-overlay] {
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    box-shadow: 0px -8px 32px rgba(19, 17, 24, 0.12), 0px 1px 3px rgba(19, 17, 24, 0.16);
  }

  [data-rsbs-header] {
    padding-bottom: 12px;
  }

  [data-rsbs-header]:before {
    width: 96px;
    height: 5px;
    border-radius: 4px;
  }
`;

function GlobalStyleThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default GlobalStyleThemeProvider;
