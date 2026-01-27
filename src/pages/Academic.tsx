import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { 
  BookOpen, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  ClipboardList,
  FlaskConical,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { mockAcademicItems, mockTutors, mockEstablishments } from '@/data/mockData';
import { AcademicItem } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const typeLabels = {
  course: 'Cours',
  homework: 'Devoir',
  exam: 'Examen',
  tp: 'TP',
};

const typeIcons = {
  course: BookOpen,
  homework: FileText,
  exam: ClipboardList,
  tp: FlaskConical,
};

const typeColors = {
  course: 'bg-primary/10 text-primary border-primary/20',
  homework: 'bg-warning/10 text-warning border-warning/20',
  exam: 'bg-destructive/10 text-destructive border-destructive/20',
  tp: 'bg-secondary/10 text-secondary border-secondary/20',
};

const statusLabels = {
  draft: 'Brouillon',
  published: 'Publié',
  completed: 'Terminé',
};

const statusColors = {
  draft: 'bg-muted text-muted-foreground',
  published: 'bg-success/10 text-success',
  completed: 'bg-primary/10 text-primary',
};

const Academic = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<AcademicItem[]>(mockAcademicItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AcademicItem | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleDelete = (item: AcademicItem) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      setItems(items.filter((i) => i.id !== selectedItem.id));
      setDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const getTutorName = (tutorId: string) => {
    const tutor = mockTutors.find((t) => t.id === tutorId);
    return tutor ? `${tutor.firstName} ${tutor.lastName}` : 'Non assigné';
  };

  const getEstablishmentName = (establishmentId: string) => {
    const est = mockEstablishments.find((e) => e.id === establishmentId);
    return est?.name || 'Non défini';
  };

  return (
    <Layout>
      {/* Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-warning" />
              Gestion académique
            </h1>
            <p className="page-subtitle">Gérez les cours, devoirs, examens et travaux pratiques</p>
          </div>
          <Button 
            onClick={() => navigate('/academic/new')}
            className="btn-gradient"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau contenu
          </Button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="mb-6 space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="course">Cours</TabsTrigger>
            <TabsTrigger value="homework">Devoirs</TabsTrigger>
            <TabsTrigger value="exam">Examens</TabsTrigger>
            <TabsTrigger value="tp">TP</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un contenu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const Icon = typeIcons[item.type];
          return (
            <div
              key={item.id}
              className={cn(
                'bg-card rounded-xl border shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden opacity-0 animate-fade-up',
                typeColors[item.type]
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      item.type === 'course' && 'bg-primary/20',
                      item.type === 'homework' && 'bg-warning/20',
                      item.type === 'exam' && 'bg-destructive/20',
                      item.type === 'tp' && 'bg-secondary/20',
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider opacity-70">
                        {typeLabels[item.type]}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-popover border border-border shadow-lg">
                      <DropdownMenuItem onClick={() => navigate(`/academic/${item.id}`)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Voir détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/academic/${item.id}/edit`)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(item)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-muted/20 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'px-2.5 py-1 text-xs font-medium rounded-full',
                    statusColors[item.status]
                  )}>
                    {statusLabels[item.status]}
                  </span>
                </div>
                {item.dueDate && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(item.dueDate, 'dd MMM yyyy', { locale: fr })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground">Aucun contenu trouvé</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery
              ? 'Essayez avec d\'autres termes de recherche'
              : 'Commencez par créer votre premier contenu'}
          </p>
          {!searchQuery && (
            <Button onClick={() => navigate('/academic/new')} className="mt-4 btn-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Créer un contenu
            </Button>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-card border border-border">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer "{selectedItem?.title}" ? 
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Academic;
