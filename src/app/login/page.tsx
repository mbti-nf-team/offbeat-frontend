import LoginPage from '@/components/auth/LoginPage';

type Props = {
  searchParams: { [key: string]: string | undefined; };
};

async function Page({ searchParams }: Props) {
  return (
    <LoginPage code={searchParams?.code} state={searchParams?.state} />
  );
}

export default Page;
