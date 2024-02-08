type Method =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK';

export type UrlPrefixType = 'public' | 'google' | 'bff';

export interface FetchRequest<T = any> {
  url: string;
  params?: T;
  method?: Method;
  type?: UrlPrefixType;
  headers?: Record<string, any>;
  config?: Omit<RequestInit, 'method' | 'headers'>;
}
