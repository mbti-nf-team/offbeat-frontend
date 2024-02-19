import { User } from '@/lib/types/auth';

export type AuthorizeResponse = {
  redirect_url: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type TokenRefreshResponse = {
  access_token: string;
};

export type TokenRequest = {
  code: string;
  state: string;
};

export type UserResponse = User;
