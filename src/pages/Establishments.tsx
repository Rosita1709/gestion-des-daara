import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { 
  Building2, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  GraduationCap,
  MapPin,
  Globe
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
import { mockEstablishments } from '@/data/mockData';
import { Establishment } from '@/types';
import { cn } from '@/lib/utils';

const typeLabels = {
  university: 'Université',
  college: 'Collège',
  school: 'Lycée',
  institute: 'Institut',
};

const typeColors = {
  university: 'bg-primary/10 text-primary',
  college: 'bg-secondary/10 text-secondary',
  school: 'bg-accent/10 text-accent',
  institute: 'bg-warning/10 text-warning',
};

const Establishments = () => {
  const navigate = useNavigate();
  const [establishments, setEstablishments] = useState<Establishment[]>(mockEstablishments);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);

  const filteredEstablishments = establishments.filter(
    (est) =>
      est.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (establishment: Establishment) => {
    setSelectedEstablishment(establishment);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEstablishment) {
      setEstablishments(establishments.filter((e) => e.id !== selectedEstablishment.id));
      setDeleteDialogOpen(false);
      setSelectedEstablishment(null);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" />
              Gestion des établissements
            </h1>
            <p className="page-subtitle">Gérez les établissements de votre plateforme éducative</p>
          </div>
          <Button 
            onClick={() => navigate('/establishments/new')}
            className="btn-gradient"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvel établissement
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom ou ville..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Establishments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEstablishments.map((establishment, index) => (
          <div
            key={establishment.id}
            className="bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden opacity-0 animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Card Header */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className={cn('px-2.5 py-1 text-xs font-medium rounded-full', typeColors[establishment.type])}>
                    {typeLabels[establishment.type]}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground line-clamp-2">
                    {establishment.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{establishment.city}, {establishment.country}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-popover border border-border shadow-lg">
                    <DropdownMenuItem onClick={() => navigate(`/establishments/${establishment.id}`)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Voir détails
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/establishments/${establishment.id}/edit`)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(establishment)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Card Stats */}
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {establishment.studentCount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Étudiants</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{establishment.tutorCount}</p>
                  <p className="text-xs text-muted-foreground">Tuteurs</p>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-muted/30 border-t border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn(
                  'w-2 h-2 rounded-full',
                  establishment.status === 'active' ? 'bg-success' : 'bg-muted-foreground'
                )} />
                <span className="text-xs font-medium text-muted-foreground">
                  {establishment.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </div>
              {establishment.website && (
                <a
                  href={establishment.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Site web
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEstablishments.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground">Aucun établissement trouvé</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery
              ? 'Essayez avec d\'autres termes de recherche'
              : 'Commencez par créer votre premier établissement'}
          </p>
          {!searchQuery && (
            <Button onClick={() => navigate('/establishments/new')} className="mt-4 btn-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Créer un établissement
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
              Êtes-vous sûr de vouloir supprimer l'établissement "{selectedEstablishment?.name}" ? 
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

export default Establishments;
