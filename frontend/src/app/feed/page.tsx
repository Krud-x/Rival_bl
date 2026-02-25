'use client';

import { useState, useEffect } from 'react';
import { blogsApi } from '@/lib/api/blogs';
import { BlogCard } from '@/components/blogs/BlogCard';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { FeedResponse, BlogWithCounts } from '@/types';

export default function FeedPage() {
  const [blogs, setBlogs] = useState<BlogWithCounts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    loadFeed();
  }, [page]);

  const loadFeed = async () => {
    setIsLoading(true);
    try {
      const response: FeedResponse = await blogsApi.getPublicFeed(page, limit);
      setBlogs(response.data);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 gradient-text">Public Feed</h1>
        <p className="text-muted-foreground">Discover the latest blogs from our community</p>
      </div>
      
      {blogs.length === 0 ? (
        <div className="text-center py-16 bg-white/50 rounded-2xl backdrop-blur-sm">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-muted-foreground text-lg font-medium">No blogs yet.</p>
          <p className="text-muted-foreground">Be the first to publish a blog!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="border-purple-200 hover:bg-purple-50"
          >
            Previous
          </Button>
          <span className="flex items-center px-4 text-sm font-medium text-purple-700">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="border-purple-200 hover:bg-purple-50"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
