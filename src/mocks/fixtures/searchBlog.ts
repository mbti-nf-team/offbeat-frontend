import { NaverSearchBlog } from '@/lib/types/blog';

const FIXTURE_NAVER_SEARCH_BLOG: NaverSearchBlog<true> = {
  posts: [{
    description: 'description',
    link: 'link',
    thumbnail: 'image/url',
    title: 'title',
  }],
  total_count: 100,
};

export default FIXTURE_NAVER_SEARCH_BLOG;
