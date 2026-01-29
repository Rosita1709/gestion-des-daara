import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { Building2, Users, BookOpen, ScrollText, Moon, Sun } from 'lucide-react';
import {
  mockEstablishments,
  mockTutors,
  mockStudents,
  mockAcademicItems,
  mockRecentActivity
} from '@/data/mockData';

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const stats = [
    {
      title: 'Daaras',
      value: mockEstablishments.length,
      change: '+2 ce mois',
      changeType: 'positive' as const,
      icon: Building2,
      iconColor: 'bg-primary',
    },
    {
      title: 'Encadreurs',
      value: mockTutors.length,
      change: '+3 ce mois',
      changeType: 'positive' as const,
      icon: Users,
      iconColor: 'bg-secondary',
    },
    {
      title: 'Talibés',
      value: mockStudents.length,
      change: '+12 ce mois',
      changeType: 'positive' as const,
      icon: BookOpen,
      iconColor: 'bg-accent',
    },
    {
      title: 'Supports coraniques',
      value: mockAcademicItems.filter(i => i.status === 'published').length,
      change: '3 publiés',
      changeType: 'neutral' as const,
      icon: ScrollText,
      iconColor: 'bg-warning',
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Tableau de bord</h1>
            <p className="page-subtitle">
              Bienvenue, Administrateur. Aperçu global de la gestion des Daaras.
            </p>
          </div>
          <div className="flex items-center gap-3">
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
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 100} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>

        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <RecentActivity activities={mockRecentActivity} />
      </div>
    </Layout>
  );
};

export default Dashboard;
