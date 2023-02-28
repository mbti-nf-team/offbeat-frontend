import CountryList from 'ui/about/CountryList';

export const metadata = {
  title: 'About',
};

const MOCK_COUNTRY_DATA = [{
  id: '1',
  name: '일본',
  emoji: '🇯🇵',
}, {
  id: '2',
  name: '대만',
  emoji: '🇹🇼',
}];

function Page() {
  return (
    <div>
      <CountryList countries={MOCK_COUNTRY_DATA} />
    </div>
  );
}

export default Page;
