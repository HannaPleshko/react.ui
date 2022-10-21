import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';

export interface IServerError {
  id: number;
  message: string;
  description: string;
  status: number;
}

export interface IRTQError {
  status: string;
  error: string;
}

export const errorsApi = createApi({
  reducerPath: 'errorsApi',
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    getErrors: build.query<IServerError[], void>({
      query: () => ({ url: `/errors`, method: 'GET' }),
    }),
  }),
});

export const { useGetErrorsQuery } = errorsApi;
