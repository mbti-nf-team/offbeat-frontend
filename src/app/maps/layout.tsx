import React, { PropsWithChildren } from 'react';

type Props = {
  bottomSheet: React.ReactNode;
};

function Layout({ bottomSheet, children }: PropsWithChildren<Props>) {
  return (
    <>
      {children}
      {bottomSheet}
    </>
  );
}

export default Layout;
