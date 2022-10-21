import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { resetResumeSlice, ResumeState } from '../reducers/ResumeSlice';
import { resetResumeUtilsSlice } from '../reducers/ResumeUtilsSlice';
import { resetServiceSlice } from '../reducers/ServiceSlice';

export interface IServerError {
  id: number;
  message: string;
  description: string;
  status: number;
}
interface IDownloadResume {
  resume_id: string;
  docType: string;
}

export const resumeApi = createApi({
  reducerPath: 'resumeApi',
  baseQuery: customFetchBase,
  tagTypes: ['Resumes'],
  endpoints: (build) => ({
    getResume: build.query<ResumeState[], string>({
      query: (resume_id: string) => ({ url: `/resume/${resume_id}`, method: 'GET' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Resumes' as const, id })),
              { type: 'Resumes', id: 'LIST' },
            ]
          : [{ type: 'Resumes', id: 'LIST' }],
    }),
    getAllResume: build.query<ResumeState[], void>({
      query: () => ({ url: `/resume`, method: 'GET' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Resumes' as const, id })),
              { type: 'Resumes', id: 'LIST' },
            ]
          : [{ type: 'Resumes', id: 'LIST' }],
    }),
    addResume: build.mutation({
      query: (body) => ({
        url: '/resume/upload',
        method: 'POST',
        body,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(resetResumeSlice());
          dispatch(resetResumeUtilsSlice());
          dispatch(resetServiceSlice());
          localStorage.removeItem('persist:root');
          return data.data;
        } catch (err) {}
      },
      invalidatesTags: [{ type: 'Resumes', id: 'LIST' }],
    }),
    downloadResume: build.query<string, IDownloadResume>({
      query: ({ resume_id, docType }) => ({
        url: `/resume/download?id=${resume_id}&type=${docType}`,
        method: 'GET',
        responseHandler: async (response) => {
          const link = document.createElement('a');
          const file = window.URL.createObjectURL(await response.blob());

          link.setAttribute('href', file);
          link.download = resume_id.concat('.', docType);

          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(file);
        },
        cache: 'no-cache',
      }),
    }),
    removeResume: build.mutation({
      query: ({ id }) => ({
        url: `/resume/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: [{ type: 'Resumes', id: 'LIST' }],
    }),
  }),
});

export const {
  useAddResumeMutation,
  useGetResumeQuery,
  useGetAllResumeQuery,
  useDownloadResumeQuery,
  useRemoveResumeMutation,
} = resumeApi;
