'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { commentsApi } from '@/lib/api/comments';
import { useAuth } from '@/lib/auth/AuthContext';
import { Comment } from '@/types';

interface CommentFormProps {
  blogId: string;
  onCommentAdded?: (comment: Comment) => void;
}

export function CommentForm({ blogId, onCommentAdded }: CommentFormProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const comment = await commentsApi.create(blogId, { content });
      setContent('');
      onCommentAdded?.(comment);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <p className="text-sm text-muted-foreground">
        Please log in to leave a comment.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Write your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />
      <Button type="submit" disabled={isLoading || !content.trim()}>
        {isLoading ? 'Posting...' : 'Post Comment'}
      </Button>
    </form>
  );
}
