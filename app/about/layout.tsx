import { ReactNode } from 'react';

import SearchCountryHeader from 'ui/about/SearchCountryHeader';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <SearchCountryHeader />
      {children}
    </>
  );
}

export default Layout;
