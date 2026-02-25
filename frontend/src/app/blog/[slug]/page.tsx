'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { blogsApi } from '@/lib/api/blogs';
import { commentsApi } from '@/lib/api/comments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { LikeButton } from '@/components/blogs/LikeButton';
import { CommentItem } from '@/components/comments/CommentItem';
import { CommentForm } from '@/components/comments/CommentForm';
import { BlogWithCounts, Comment } from '@/types';
import { formatDate } from '@/lib/utils';
import { useAuth } from '@/lib/auth/AuthContext';

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { user: currentUser } = useAuth();
  
  const [blog, setBlog] = useState<BlogWithCounts | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlog();
  }, [slug]);

  const loadBlog = async () => {
    try {
      const data = await blogsApi.getBySlug(slug);
      setBlog(data);
      // Load comments after blog is loaded
      loadComments(data.id);
    } catch (error) {
      console.error('Error loading blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadComments = async (blogId: string) => {
    try {
      const data = await commentsApi.getByBlogId(blogId);
      setComments(data);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleLikeUpdate = (likesCount: number, liked: boolean) => {
    if (blog) {
      setBlog({ ...blog, likesCount });
    }
  };

  const handleCommentAdded = (comment: Comment) => {
    setComments([comment, ...comments]);
  };

  const handleCommentDeleted = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
        <p className="text-muted-foreground">The blog you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span>By {blog.user.name || blog.user.email}</span>
          <span>•</span>
          <span>{formatDate(blog.createdAt)}</span>
          <span>•</span>
          <span>{blog.likesCount} likes</span>
          <span>•</span>
          <span>{blog.commentsCount} comments</span>
        </div>

        {blog.summary && (
          <p className="text-lg text-muted-foreground mb-6 italic">{blog.summary}</p>
        )}

        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-wrap">{blog.content}</p>
        </div>

        <div className="mt-8 pt-8 border-t">
          <LikeButton 
            blogId={blog.id} 
            initialLikesCount={blog.likesCount}
            initialLiked={false}
            onLikeUpdate={handleLikeUpdate}
          />
        </div>
      </article>

      <section>
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        
        <div className="mb-8">
          <CommentForm blogId={blog.id} onCommentAdded={handleCommentAdded} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{comments.length} Comments</CardTitle>
          </CardHeader>
          <CardContent>
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <CommentItem 
                    key={comment.id} 
                    comment={comment} 
                    currentUser={currentUser}
                    onDelete={handleCommentDeleted}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
