import { Building2, Users, GraduationCap, BookOpen } from 'lucide-react';
import { ActivityItem } from '@/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RecentActivityProps {
  activities: ActivityItem[];
}

const iconMap = {
  establishment: Building2,
  tutor: Users,
  student: GraduationCap,
  academic: BookOpen,
};

const colorMap = {
  establishment: 'bg-primary/10 text-primary',
  tutor: 'bg-secondary/10 text-secondary',
  student: 'bg-accent/10 text-accent',
  academic: 'bg-warning/10 text-warning',
};

const actionColorMap = {
  created: 'bg-success/10 text-success',
  updated: 'bg-primary/10 text-primary',
  deleted: 'bg-destructive/10 text-destructive',
};

const actionTextMap = {
  created: 'Créé',
  updated: 'Modifié',
  deleted: 'Supprimé',
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground">Activité récente</h3>
        <p className="text-sm text-muted-foreground mt-1">Dernières actions sur la plateforme</p>
      </div>
      <div className="divide-y divide-border/50">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors opacity-0 animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', colorMap[activity.type])}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: fr })}
                </p>
              </div>
              <span className={cn('px-2.5 py-1 text-xs font-medium rounded-full', actionColorMap[activity.action])}>
                {actionTextMap[activity.action]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
