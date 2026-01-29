import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { Building2, Users, BookOpen, ScrollText } from 'lucide-react';
import {
  mockEstablishments,
  mockTutors,
  mockStudents,
  mockAcademicItems,
  mockRecentActivity
} from '@/data/mockData';

const Dashboard = () => {
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
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Dernière mise à jour</p>
            <p className="text-sm font-medium text-foreground">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
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
