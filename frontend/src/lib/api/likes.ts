import { api } from './client';
import { LikeResponse } from '@/types';

export const likesApi = {
  like: async (blogId: string): Promise<LikeResponse> => {
    const response = await api.post<LikeResponse>(`/blogs/${blogId}/like`);
    return response.data;
  },

  unlike: async (blogId: string): Promise<LikeResponse> => {
    const response = await api.delete<LikeResponse>(`/blogs/${blogId}/like`);
    return response.data;
  },
};
