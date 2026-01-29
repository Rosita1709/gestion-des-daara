
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  MapPin,
  Globe,
  BookOpen
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

/* =========================
   TYPES & COULEURS
========================= */
const typeLabels = {
  daara: 'Daara',
  'franco-arabe': 'Franco-Arabe',
};

const typeColors = {
  daara: 'bg-emerald-100 text-emerald-700',
  'franco-arabe': 'bg-blue-100 text-blue-700',
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
      est.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (est: Establishment) => {
    setSelectedEstablishment(est);
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
              Gestion des Daaras
            </h1>
            <p className="page-subtitle">Administration et suivi des Daaras coraniques</p>
          </div>
          <Button
            onClick={() => navigate('/establishments/new')}
            className="btn-gradient"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Daara
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un daara par nom, ville ou pays..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEstablishments.map((est, index) => (
          <div
            key={est.id}
            className="bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden opacity-0 animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Card Header */}
            <div className="p-6 border-b border-border/50 flex justify-between items-start">
              <div className="flex-1">
                <span
                  className={cn(
                    'px-2.5 py-1 text-xs font-medium rounded-full',
                    typeColors[est.type]
                  )}
                >
                  {typeLabels[est.type]}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{est.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{est.city}, {est.country}</span>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-lg hover:bg-muted">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/establishments/${est.id}`)}>
                    <Eye className="w-4 h-4 mr-2" /> Voir
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/establishments/${est.id}/edit`)}>
                    <Edit className="w-4 h-4 mr-2" /> Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(est)} className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Card Stats */}
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{est.studentCount}</p>
                  <p className="text-xs text-muted-foreground">Talibés</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{est.tutorCount}</p>
                  <p className="text-xs text-muted-foreground">Encadreurs</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-muted/30 border-t flex justify-between">
              <span className="text-xs text-muted-foreground">
                Statut : {est.status === 'active' ? 'Actif' : 'Inactif'}
              </span>
              {est.website ? (
                <a href={est.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary">
                  <Globe className="w-3.5 h-3.5" /> Site web
                </a>
              ) : (
                <span className="text-xs text-muted-foreground">Pas de site</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suppression du Daara</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment supprimer <strong>{selectedEstablishment?.name}</strong> ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
            <Button variant="destructive" onClick={confirmDelete}>Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Establishments;
