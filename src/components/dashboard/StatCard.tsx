import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'bg-primary',
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className="stat-card group opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground tracking-tight">
            {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
          </p>
          {change && (
            <p
              className={cn(
                'mt-2 text-sm font-medium flex items-center gap-1',
                changeType === 'positive' && 'text-success',
                changeType === 'negative' && 'text-destructive',
                changeType === 'neutral' && 'text-muted-foreground'
              )}
            >
              {changeType === 'positive' && '↑'}
              {changeType === 'negative' && '↓'}
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110',
            iconColor
          )}
        >
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}
