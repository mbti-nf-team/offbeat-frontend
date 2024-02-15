import LoginPage from '@/components/auth/LoginPage';

import BottomSheet from './BottomSheet';

type Props = {
  searchParams: { [key: string]: string | undefined; };
};

function Page({ searchParams }: Props) {
  return (
    <BottomSheet>
      <LoginPage code={searchParams?.code} state={searchParams?.state} />
    </BottomSheet>
  );
}

export default Page;
