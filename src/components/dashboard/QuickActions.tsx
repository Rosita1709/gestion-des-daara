import { Link } from 'react-router-dom';
import { Building2, Users, School, GraduationCap, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  {
    title: 'Nouvel établissement',
    description: 'Ajouter un Daara',
    icon: Building2,
    href: '/establishments/new',
    color: 'bg-primary hover:bg-primary/90',
  },
  {
    title: 'Nouveau tuteur',
    description: 'Ajouter un tuteur',
    icon: Users,
    href: '/tutors/new',
    color: 'bg-secondary hover:bg-secondary/90',
  },
  {
    title: 'Nouvel enseignant',
    description: 'Ajouter un enseignant',
    icon: School,
    href: '/enseignants/new',
    color: 'bg-success hover:bg-success/90 text-success-foreground',
  },
  {
    title: 'Nouvel apprenant',
    description: 'Inscrire un talibé',
    icon: GraduationCap,
    href: '/students/new',
    color: 'bg-accent hover:bg-accent/90',
  },
  {
    title: 'Nouveau contenu',
    description: 'Créer un contenu',
    icon: BookOpen,
    href: '/academic/new',
    color: 'bg-warning hover:bg-warning/90 text-warning-foreground',
  },
];

export function QuickActions() {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground">Actions rapides</h3>
        <p className="text-sm text-muted-foreground mt-1">Accédez rapidement aux fonctionnalités clés</p>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link
            key={action.title}
            to={action.href}
            className={cn(
              'p-4 rounded-xl flex flex-col items-center text-center gap-3 transition-all duration-200',
              'hover:scale-[1.02] hover:shadow-md',
              action.color,
              'text-primary-foreground opacity-0 animate-fade-up'
            )}
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <action.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-sm">{action.title}</p>
              <p className="text-xs opacity-80">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
