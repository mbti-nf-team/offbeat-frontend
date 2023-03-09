import { ReactNode } from 'react';

import SearchCountryHeader from 'components/about/SearchCountryHeader';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <SearchCountryHeader>
      {children}
    </SearchCountryHeader>
  );
}

export default Layout;
