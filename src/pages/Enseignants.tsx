import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import {
  School,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Building2,
  GraduationCap,
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
import { Tutor, Establishment } from '@/types';
import { mockEstablishments } from '@/data/mockData';
import { cn } from '@/lib/utils';

const generateMockEnseignants = (establishments: Establishment[]): Tutor[] => {
  if (!establishments?.length) return [];
  const firstNames = ['Awa', 'Mamadou', 'Fatou', 'Ousmane', 'Mariama', 'Cheikh'];
  const lastNames = ['Diallo', 'Sarr', 'Ba', 'Diop', 'Ngom', 'Lo'];
  const specializations = ['Hifz', 'Tajwid', 'Fiqh', 'Arabe', 'Français', 'Histoire'];

  const list: Tutor[] = [];
  for (let i = 1; i <= 10; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const specialization = specializations[Math.floor(Math.random() * specializations.length)];
    const est = establishments[Math.floor(Math.random() * establishments.length)];
    const status = Math.random() > 0.3 ? 'active' : 'inactive';
    const studentCount = Math.floor(Math.random() * 30) + 8;
    const phone = `+221 77 ${Math.floor(100000 + Math.random() * 900000)}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${est.name.replace(/\s+/g, '').toLowerCase()}.sn`;
    list.push({
      id: `e-${i}`,
      firstName,
      lastName,
      specialization,
      establishmentId: est.id,
      establishmentName: est.name,
      email,
      phone,
      status,
      studentCount,
      createdAt: new Date(),
    });
  }
  return list;
};

const Enseignants = () => {
  const navigate = useNavigate();
  const [enseignants, setEnseignants] = useState<Tutor[]>(() => generateMockEnseignants(mockEstablishments));
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selected, setSelected] = useState<Tutor | null>(null);

  const filtered = enseignants.filter(
    (e) =>
      `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.establishmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (e: Tutor) => {
    setSelected(e);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selected) {
      setEnseignants(enseignants.filter((x) => x.id !== selected.id));
      setDeleteDialogOpen(false);
      setSelected(null);
    }
  };

  const getInitials = (a: string, b: string) => `${a[0]}${b[0]}`.toUpperCase();
  const getAvatarColor = (id: string) => {
    const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-warning', 'bg-success'];
    return colors[id.length % colors.length];
  };

  return (
    <Layout>
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title flex items-center gap-3">
              <School className="w-8 h-8 text-success" />
              Gestion des enseignants
            </h1>
            <p className="page-subtitle">Enseignants et formateurs des Daaras</p>
          </div>
          <Button
            onClick={() => navigate('/enseignants/new')}
            className="bg-success text-success-foreground hover:bg-success/90 transition-colors duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvel enseignant
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, spécialisation ou daara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl border-border/50"
          />
        </div>
      </div>

      <div className="data-table rounded-2xl border border-border/40 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Enseignant</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Spécialisation</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Établissement</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Contact</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Apprenants</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Statut</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filtered.map((e, index) => (
              <tr
                key={e.id}
                className="hover:bg-muted/20 transition-colors opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-primary-foreground',
                        getAvatarColor(e.id)
                      )}
                    >
                      {getInitials(e.firstName, e.lastName)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{e.firstName} {e.lastName}</p>
                      <p className="text-xs text-muted-foreground">{e.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 bg-success/10 text-success text-xs font-medium rounded-full">{e.specialization}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span className="truncate max-w-[150px]">{e.establishmentName}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${e.email}`} className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </a>
                    <a href={`tel:${e.phone}`} className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{e.studentCount}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full',
                      e.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <span className={cn('w-1.5 h-1.5 rounded-full', e.status === 'active' ? 'bg-success' : 'bg-muted-foreground')} />
                    {e.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-popover border border-border shadow-lg">
                      <DropdownMenuItem onClick={() => navigate(`/enseignants/${e.id}`, { state: e })}>
                        <Eye className="w-4 h-4 mr-2" /> Voir détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/enseignants/${e.id}/edit`, { state: e })}>
                        <Edit className="w-4 h-4 mr-2" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(e)} className="text-destructive focus:text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <School className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Aucun enseignant trouvé</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery ? "Essayez d'autres termes" : 'Créez votre premier enseignant'}
            </p>
          </div>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-card border border-border rounded-2xl">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Supprimer l'enseignant "{selected?.firstName} {selected?.lastName}" ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="rounded-xl">Annuler</Button>
            <Button variant="destructive" onClick={confirmDelete} className="rounded-xl">Supprimer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Enseignants;
