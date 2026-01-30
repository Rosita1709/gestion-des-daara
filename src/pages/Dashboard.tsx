import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { Building2, Users, School, BookOpen, ScrollText } from 'lucide-react';
import {
  mockEstablishments,
  mockTutors,
  mockStudents,
  mockAcademicItems,
  mockRecentActivity
} from '@/data/mockData';

const mockEnseignantsCount = 10;

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
      title: 'Enseignants',
      value: mockEnseignantsCount,
      change: '+2 ce mois',
      changeType: 'positive' as const,
      icon: School,
      iconColor: 'bg-success',
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
      <div className="page-header">
        <h1 className="page-title">Tableau de bord</h1>
        <p className="page-subtitle">
          Bienvenue, Administrateur. Aperçu global de la gestion des Daaras.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
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
