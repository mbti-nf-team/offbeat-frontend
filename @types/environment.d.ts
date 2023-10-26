/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: string;
    NEXT_PUBLIC_NAVER_SEARCH_CLIEND_ID: string;
    NEXT_PUBLIC_NAVER_SEARCH_CLIEND_SECRET: string;
    NEXT_PUBLIC_ORIGIN: string;
    NEXT_PUBLIC_API_HOST: string;
    API_HEADER_TOKEN: string;
  }
}
