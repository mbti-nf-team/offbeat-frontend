export type AuthorizeResponse = {
  redirect_url: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type TokenRequest = {
  code: string;
  state: string;
};
