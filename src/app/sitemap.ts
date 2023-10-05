import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_ORIGIN,
      lastModified: new Date(),
    },
  ];
}
