import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';

export const baseUrl = `${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/`;
export const baseQuery = fetchBaseQuery({ baseUrl });

export const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  return await baseQuery(args, api, extraOptions);
};
