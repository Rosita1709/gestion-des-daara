import { ReactNode, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sidebar } from './Sidebar';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main
        className={cn(
          'transition-all duration-300 ease-in-out',
          'ml-64 min-h-screen'
        )}
      >
        <div className="sticky top-0 z-30 flex items-center justify-end gap-3 px-8 pt-6 pb-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
          <p className="text-sm font-medium text-foreground">
            {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
            aria-label={resolvedTheme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          >
            {mounted && resolvedTheme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
