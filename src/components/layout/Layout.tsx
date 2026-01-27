import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main
        className={cn(
          'transition-all duration-300 ease-in-out',
          'ml-64 min-h-screen'
        )}
      >
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
