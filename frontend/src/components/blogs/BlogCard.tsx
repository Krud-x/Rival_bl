'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BlogWithCounts } from '@/types';
import { formatDate, truncateText } from '@/lib/utils';

interface BlogCardProps {
  blog: BlogWithCounts;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <Link href={`/blog/${blog.slug}`}>
          <CardTitle className="hover:text-primary transition-colors">
            {blog.title}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground">
          By {blog.user.name || blog.user.email} • {formatDate(blog.createdAt)}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {blog.summary || truncateText(blog.content, 200)}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{blog.likesCount} likes</span>
          <span>{blog.commentsCount} comments</span>
        </div>
        <Link href={`/blog/${blog.slug}`}>
          <Button variant="outline" size="sm">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
