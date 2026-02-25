'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { blogsApi } from '@/lib/api/blogs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Spinner } from '@/components/ui/Spinner';

export default function BlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const { user, isLoading: authLoading } = useAuth();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const blogId = params.id as string;
  const isNew = blogId === 'new';

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && !isNew) {
      loadBlog();
    }
  }, [user, isNew]);

  const loadBlog = async () => {
    setIsLoading(true);
    try {
      const blog = await blogsApi.getById(blogId);
      setTitle(blog.title);
      setContent(blog.content);
      setSummary(blog.summary || '');
      setIsPublished(blog.isPublished);
    } catch (error) {
      console.error('Error loading blog:', error);
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (publish?: boolean) => {
    setIsSaving(true);
    try {
      const data = {
        title,
        content,
        summary,
        isPublished: publish !== undefined ? publish : isPublished,
      };

      if (isNew) {
        const blog = await blogsApi.create(data);
        router.push(`/dashboard/blogs/${blog.id}`);
      } else {
        await blogsApi.update(blogId, data);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setIsSaving(false);
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
        <h1 className="text-3xl font-bold">
          {isNew ? 'Create Blog' : 'Edit Blog'}
        </h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleSave(false)}
            disabled={isSaving}
          >
            Save Draft
          </Button>
          <Button 
            onClick={() => handleSave(true)}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Publish'}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary (optional)</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of your blog"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              rows={15}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="isPublished" className="cursor-pointer">
              Published
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
