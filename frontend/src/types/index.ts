export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  userId: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name?: string;
    email: string;
  };
  _count?: {
    likes: number;
    comments: number;
  };
}

export interface BlogWithCounts extends Blog {
  likesCount: number;
  commentsCount: number;
}

export interface Like {
  id: string;
  userId: string;
  blogId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  blogId: string;
  createdAt: string;
  user: {
    id: string;
    name?: string;
    email: string;
  };
}

export interface CreateCommentDto {
  content: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface FeedResponse {
  data: BlogWithCounts[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface LikeResponse {
  liked: boolean;
  likesCount: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: any;
}
