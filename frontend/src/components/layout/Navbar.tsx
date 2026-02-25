'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-blue-950/30">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold gradient-text">
              Rival Blog
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/feed" 
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Feed
            </Link>
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="hover:text-purple-600">
                    Dashboard
                  </Button>
                </Link>
                <span className="text-sm text-muted-foreground">
                  {user.name || user.email}
                </span>
                <Button variant="outline" size="sm" onClick={logout} className="border-purple-200 hover:bg-purple-50">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hover:text-purple-600">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
