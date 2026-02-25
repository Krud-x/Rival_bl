import { api } from './client';
import { Comment } from '@/types';

export const commentsApi = {
  create: async (blogId: string, data: { content: string }): Promise<Comment> => {
    const response = await api.post<Comment>(`/blogs/${blogId}/comments`, data);
    return response.data;
  },

  getByBlogId: async (blogId: string): Promise<Comment[]> => {
    const response = await api.get<Comment[]>(`/blogs/${blogId}/comments`);
    return response.data;
  },

  delete: async (commentId: string): Promise<void> => {
    await api.delete(`/blogs/comments/${commentId}`);
  },
};
