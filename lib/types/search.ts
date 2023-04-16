export type BlogPost = {
  title: string;
  link: string;
  description: string;
  thumbnail: string;
};

export interface NaverSearchBlog<T = boolean> {
  total_count: number;
  posts: T extends true ? BlogPost[] : undefined;
}
