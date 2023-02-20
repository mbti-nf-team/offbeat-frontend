'use client';

import { ReactElement, ReactNode, useState } from 'react';

import { useServerInsertedHTML } from 'next/navigation';

import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';
import lightTheme from 'styles/theme';

function StyledComponentsRegistry({ children }: { children: ReactNode }): ReactElement {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();

    return styles;
  });

  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={lightTheme}>
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  );
}

export default StyledComponentsRegistry;
