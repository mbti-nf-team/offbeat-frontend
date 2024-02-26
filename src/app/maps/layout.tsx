import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  modal: ReactNode;
};

function Layout({ modal, children }: PropsWithChildren<Props>) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

export default Layout;
