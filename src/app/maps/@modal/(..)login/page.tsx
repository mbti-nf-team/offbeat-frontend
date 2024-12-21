import LoginPage from '@/components/auth/LoginPage';

import BottomSheet from './BottomSheet';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined; }>;
};

async function Page({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <BottomSheet>
      <LoginPage code={params?.code} state={params?.state} />
    </BottomSheet>
  );
}

export default Page;
