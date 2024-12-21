import LoginPage from '@/components/auth/LoginPage';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined; }>;
};

async function Page({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <LoginPage code={params?.code} state={params?.state} />
  );
}

export default Page;
