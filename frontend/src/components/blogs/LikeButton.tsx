'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { likesApi } from '@/lib/api/likes';
import { useAuth } from '@/lib/auth/AuthContext';

interface LikeButtonProps {
  blogId: string;
  initialLikesCount: number;
  initialLiked: boolean;
  onLikeUpdate?: (likesCount: number, liked: boolean) => void;
}

export function LikeButton({ blogId, initialLikesCount, initialLiked, onLikeUpdate }: LikeButtonProps) {
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [liked, setLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      if (liked) {
        const response = await likesApi.unlike(blogId);
        setLikesCount(response.likesCount);
        setLiked(response.liked);
        onLikeUpdate?.(response.likesCount, response.liked);
      } else {
        const response = await likesApi.like(blogId);
        setLikesCount(response.likesCount);
        setLiked(response.liked);
        onLikeUpdate?.(response.likesCount, response.liked);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Button variant="ghost" size="sm" disabled>
        ❤️ {likesCount}
      </Button>
    );
  }

  return (
    <Button 
      variant={liked ? "default" : "ghost"} 
      size="sm" 
      onClick={handleLike}
      disabled={isLoading}
    >
      {liked ? '❤️' : '🤍'} {likesCount}
    </Button>
  );
}
