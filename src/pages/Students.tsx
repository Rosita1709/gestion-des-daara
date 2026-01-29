import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { 
  GraduationCap, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Mail,
  Phone,
  Building2,
  Calendar,
  Users
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
import { mockStudents, mockEstablishments } from '@/data/mockData';
import { Student } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Mapping des statuts pour les talib..
const statusLabels = {
  enrolled: 'En cours d’apprentissage',
  graduated: 'A terminé le Coran (Khatm)',
  suspended: 'Suspendu',
};

const statusColors = {
  enrolled: 'bg-success/10 text-success',
  graduated: 'bg-primary/10 text-primary',
  suspended: 'bg-destructive/10 text-destructive',
};

// Générer email automatique selon prénom.nom@nomdudara
const generateEmail = (firstName: string, lastName: string, daaraName: string) => {
  const normalize = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // supprimer accents
      .replace(/\s+/g, '') // supprimer espaces
      .replace(/[^a-z0-9]/gi, ''); // lettres et chiffres uniquement
  return `${normalize(firstName)}.${normalize(lastName)}@${normalize(daaraName)}`;
};

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mettre à jour les emails pour tous les étudiants au chargement
  const studentsWithEmails = students.map((s) => ({
    ...s,
    email: generateEmail(s.firstName, s.lastName, s.establishmentName)
  }));

  const filteredStudents = studentsWithEmails.filter(
    (student) =>
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.establishmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      setStudents(students.filter((s) => s.id !== selectedStudent.id));
      setDeleteDialogOpen(false);
      setSelectedStudent(null);
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
              <GraduationCap className="w-8 h-8 text-accent" />
              Gestion des talibés
            </h1>
            <p className="page-subtitle">Gérez les talibés inscrits dans vos daara</p>
          </div>
          <Button 
            onClick={() => navigate('/students/new')}
            className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau talibé
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email, daara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <div
            key={student.id}
            className="bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden opacity-0 animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Card Header */}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold text-primary-foreground',
                    getAvatarColor(student.id)
                  )}>
                    {getInitials(student.firstName, student.lastName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {student.firstName} {student.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                    <span className={cn(
                      'inline-flex mt-2 px-2.5 py-1 text-xs font-medium rounded-full',
                      statusColors[student.status]
                    )}>
                      {statusLabels[student.status]}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-popover border border-border shadow-lg">
                    <DropdownMenuItem onClick={() => navigate(`/students/${student.id}`)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Voir détails
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/students/${student.id}/edit`)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(student)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Card Details */}
            <div className="px-6 py-4 border-t border-border/50 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground truncate">{student.establishmentName}</span>
              </div>
              {student.tutorName && (
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Maître coranique: {student.tutorName}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Inscrit le {format(student.enrollmentDate, 'dd MMMM yyyy', { locale: fr })}
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-muted/30 border-t border-border/50 flex items-center gap-4">
              <a 
                href={`mailto:${student.email}`}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a 
                href={`tel:${student.phone}`}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Phone className="w-4 h-4" />
                Appeler
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground">Aucun talibé trouvé</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery
              ? 'Essayez avec d\'autres termes de recherche'
              : 'Commencez par inscrire votre premier talibé'}
          </p>
          {!searchQuery && (
            <Button
              onClick={() => navigate('/students/new')}
              className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Inscrire un talibé
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
              Êtes-vous sûr de vouloir supprimer le talibé "{selectedStudent?.firstName} {selectedStudent?.lastName}" ? 
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

export default Students;
