import LoginPage from '@/components/auth/LoginPage';

import LoginBottomSheet from './LoginBottomSheet';

type Props = {
  searchParams: { [key: string]: string | undefined; };
};

function Page({ searchParams }: Props) {
  return (
    <LoginBottomSheet>
      <LoginPage code={searchParams?.code} state={searchParams?.state} />
    </LoginBottomSheet>
  );
}

export default Page;
