import { api } from './client';
import { Blog, BlogWithCounts, FeedResponse } from '@/types';

// Helper to transform _count to likesCount/commentsCount
const transformBlog = (blog: any): BlogWithCounts => ({
  ...blog,
  likesCount: blog._count?.likes ?? 0,
  commentsCount: blog._count?.comments ?? 0,
});

const transformFeedResponse = (response: any): FeedResponse => ({
  ...response,
  data: response.data.map(transformBlog),
});

export const blogsApi = {
  create: async (data: { title: string; content: string; summary?: string; isPublished?: boolean }): Promise<Blog> => {
    const response = await api.post<Blog>('/blogs', data);
    return response.data;
  },

  getAll: async (): Promise<Blog[]> => {
    const response = await api.get<Blog[]>('/blogs');
    return response.data;
  },

  getById: async (id: string): Promise<Blog> => {
    const response = await api.get<Blog>(`/blogs/${id}`);
    return response.data;
  },

  update: async (id: string, data: { title?: string; content?: string; summary?: string; isPublished?: boolean }): Promise<Blog> => {
    const response = await api.patch<Blog>(`/blogs/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/blogs/${id}`);
  },

  getPublicFeed: async (page: number = 1, limit: number = 10): Promise<FeedResponse> => {
    const response = await api.get<any>('/public/feed', {
      params: { page, limit },
    });
    return transformFeedResponse(response.data);
  },

  getBySlug: async (slug: string): Promise<BlogWithCounts> => {
    const response = await api.get<any>(`/public/blogs/${slug}`);
    return transformBlog(response.data);
  },
};
