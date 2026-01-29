import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Mail,
  Phone,
  Building2,
  GraduationCap
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

const generateMockTutors = (establishments: Establishment[]): Tutor[] => {
  if (!establishments?.length) return [];
  const firstNames = ['Awa', 'Mamadou', 'Fatou', 'Ousmane', 'Mariama', 'Cheikh'];
  const lastNames = ['Diallo', 'Sarr', 'Ba', 'Diop', 'Ngom', 'Lo'];
  const specializations = ['Mathématiques', 'Physique', 'Chimie', 'Informatique', 'Français', 'Histoire'];

  const tutors: Tutor[] = [];

  for (let i = 1; i <= 12; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const specialization = specializations[Math.floor(Math.random() * specializations.length)];
    const est = establishments[Math.floor(Math.random() * establishments.length)];
    const status = Math.random() > 0.3 ? 'active' : 'inactive';
    const studentCount = Math.floor(Math.random() * 25) + 5;
    const phone = `+221 77 ${Math.floor(100000 + Math.random() * 900000)}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${est.name.replace(/\s+/g,'').toLowerCase()}.fr`;
    const createdAt = new Date(); 

    tutors.push({
      id: i.toString(),
      firstName,
      lastName,
      specialization,
      establishmentId: est.id,
      establishmentName: est.name,
      email,
      phone,
      status,
      studentCount,
      createdAt,
    });
  }

  return tutors;
};

const Tutors = () => {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState<Tutor[]>(() => generateMockTutors(mockEstablishments));
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const filteredTutors = tutors.filter(
    (tutor) =>
      `${tutor.firstName} ${tutor.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.establishmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTutor) {
      setTutors(tutors.filter((t) => t.id !== selectedTutor.id));
      setDeleteDialogOpen(false);
      setSelectedTutor(null);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const getAvatarColor = (id: string) => {
    const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-warning'];
    return colors[parseInt(id) % colors.length];
  };

  return (
    <Layout>
      {/* Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title flex items-center gap-3">
              <Users className="w-8 h-8 text-secondary" />
              Gestion des tuteurs
            </h1>
            <p className="page-subtitle">Gérez les tuteurs et enseignants de votre plateforme</p>
          </div>
          <Button 
            onClick={() => navigate('/tutors/new')}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau tuteur
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, spécialisation ou daara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tutors Table */}
      <div className="data-table">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Tuteur</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Spécialisation</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Établissement</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Contact</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Étudiants</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Statut</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filteredTutors.map((tutor, index) => (
              <tr 
                key={tutor.id} 
                className="hover:bg-muted/20 transition-colors opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-primary-foreground',
                      getAvatarColor(tutor.id)
                    )}>
                      {getInitials(tutor.firstName, tutor.lastName)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tutor.firstName} {tutor.lastName}</p>
                      <p className="text-xs text-muted-foreground">{tutor.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">{tutor.specialization}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span className="truncate max-w-[150px]">{tutor.establishmentName}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${tutor.email}`} className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </a>
                    <a href={`tel:${tutor.phone}`} className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{tutor.studentCount}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full',
                    tutor.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                  )}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', tutor.status === 'active' ? 'bg-success' : 'bg-muted-foreground')} />
                    {tutor.status === 'active' ? 'Actif' : 'Inactif'}
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
                      <DropdownMenuItem onClick={() => navigate(`/tutors/${tutor.id}`)}>
                        <Eye className="w-4 h-4 mr-2" />Voir détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/tutors/${tutor.id}/edit`)}>
                        <Edit className="w-4 h-4 mr-2" />Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(tutor)} className="text-destructive focus:text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTutors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Aucun tuteur trouvé</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery ? 'Essayez avec d\'autres termes de recherche' : 'Commencez par créer votre premier tuteur'}
            </p>
          </div>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-card border border-border">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le tuteur "{selectedTutor?.firstName} {selectedTutor?.lastName}" ? Cette action est irréversible.
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

export default Tutors;
