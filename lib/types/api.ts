import { AxiosRequestConfig, Method } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {
  url: string;
  method?: Method;
  isBFF?: boolean;
}
