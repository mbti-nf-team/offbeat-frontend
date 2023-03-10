import { ReactElement, ReactNode } from 'react';

import { ThemeProvider } from 'styled-components';
import lightTheme from 'styles/theme';

interface Props {
  theme?: typeof lightTheme;
  children: ReactNode;
}

function MockTheme({ theme = lightTheme, children }: Props): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default MockTheme;
