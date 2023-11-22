import { MetadataRoute } from 'next';

function manifest(): MetadataRoute.Manifest {
  return {
    name: 'offbeat',
    short_name: 'offbeat',
    description: '여행에서 ✌️진짜✌️ 로컬 여행지 찾기',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

export default manifest;
