'use client';

import { useState } from 'react';
import { Comment, User } from '@/types';
import { formatDate } from '@/lib/utils';
import { commentsApi } from '@/lib/api/comments';
import { Button } from '@/components/ui/Button';

interface CommentItemProps {
  comment: Comment;
  currentUser?: User | null;
  onDelete?: (commentId: string) => void;
}

export function CommentItem({ comment, currentUser, onDelete }: CommentItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = currentUser?.id === comment.userId;

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    setIsDeleting(true);
    try {
      await commentsApi.delete(comment.id);
      onDelete?.(comment.id);
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border-b py-4 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-sm">
          {comment.user.name || comment.user.email}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatDate(comment.createdAt)}
          </span>
          {isOwner && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          )}
        </div>
      </div>
      <p className="text-sm text-foreground">{comment.content}</p>
    </div>
  );
}
