import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { ISkillItem } from '../../types/skills';

export interface IServerError {
  id: number;
  message: string;
  description: string;
  status: number;
}
export interface IClientSkillItem {
  label: string;
  category: string;
  priority: number;
}

export const skillApi = createApi({
  reducerPath: 'skillApi',
  baseQuery: customFetchBase,
  tagTypes: ['Skills'],
  endpoints: (build) => ({
    getSkills: build.query<ISkillItem[], void>({
      query: () => ({ url: `/environment`, method: 'GET' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ environment_id }) => ({ type: 'Skills' as const, environment_id })),
              { type: 'Skills', id: 'LIST' },
            ]
          : [{ type: 'Skills', id: 'LIST' }],
    }),
    addSkill: build.mutation<ISkillItem, IClientSkillItem>({
      query: (body) => ({
        url: '/environment',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Skills', id: 'LIST' }],
    }),
  }),
});

export const { useAddSkillMutation, useGetSkillsQuery } = skillApi;
