export type BlogPost = {
  title: string;
  link: string;
  description: string;
  thumbnail: string;
};

export interface NaverSearchBlog<T = boolean> {
  total_count: number | null;
  posts: T extends true ? BlogPost[] : null;
}
