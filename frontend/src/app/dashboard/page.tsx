'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { blogsApi } from '@/lib/api/blogs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Blog } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadBlogs();
    }
  }, [user]);

  const loadBlogs = async () => {
    try {
      const data = await blogsApi.getAll();
      setBlogs(data);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      await blogsApi.delete(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Link href="/dashboard/blogs/new">
          <Button>Create Blog</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {blogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't created any blogs yet.</p>
              <Link href="/dashboard/blogs/new">
                <Button>Create Your First Blog</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Link href={`/dashboard/blogs/${blog.id}`}>
                  <CardTitle className="text-xl hover:text-primary">
                    {blog.title}
                  </CardTitle>
                </Link>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${blog.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/blogs/${blog.id}`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Link href={`/blog/${blog.slug}`} target="_blank">
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
