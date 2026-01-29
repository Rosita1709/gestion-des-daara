import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { GraduationCap, Save, User, MapPin, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockStudents, mockEstablishments, mockTutors } from '@/data/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const generateEmail = (firstName: string, lastName: string, estId: string) => {
  const est = mockEstablishments.find((e) => e.id === estId);
  if (!est) return '';
  const normalize = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '');
  return `${normalize(firstName)}.${normalize(lastName)}@${normalize(est.name)}`;
};

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const existingStudent = id ? mockStudents.find((s) => s.id === id) : null;

  const [formData, setFormData] = useState({
    firstName: existingStudent?.firstName || '',
    lastName: existingStudent?.lastName || '',
    email: existingStudent?.email || '',
    phone: existingStudent?.phone || '',
    dateOfBirth: existingStudent?.dateOfBirth ? new Date(existingStudent.dateOfBirth).toISOString().split('T')[0] : '',
    address: existingStudent?.address || '',
    city: existingStudent?.city || '',
    establishmentId: existingStudent?.establishmentId || '',
    tutorId: existingStudent?.tutorId || '',
    status: existingStudent?.status || 'enrolled',
  });

  const availableTutors = mockTutors.filter(
    (t) => t.establishmentId === formData.establishmentId && t.status === 'active'
  );

  useEffect(() => {
    if (formData.firstName && formData.lastName && formData.establishmentId) {
      setFormData((prev) => ({ ...prev, email: generateEmail(prev.firstName, prev.lastName, prev.establishmentId) }));
    }
  }, [formData.firstName, formData.lastName, formData.establishmentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.establishmentId) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    toast.success(isEdit ? 'Apprenant modifié avec succès' : 'Apprenant inscrit avec succès');
    navigate('/students');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-full py-6">
        <div className="max-w-3xl w-full mx-auto px-4">
          <div className="mb-6">
            <h1 className={cn('text-2xl font-bold text-foreground tracking-tight flex items-center gap-3 opacity-0 animate-form-enter')} style={{ animationDelay: '80ms' }}>
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-accent" />
              </div>
              {isEdit ? "Modifier l'apprenant" : "Nouvel apprenant"}
            </h1>
            <p className={cn('page-subtitle mt-1 opacity-0 animate-form-enter')} style={{ animationDelay: '160ms' }}>
              {isEdit ? "Modifiez les informations" : "Inscrire un nouvel apprenant"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="bg-card rounded-2xl border border-border/40 shadow-sm overflow-hidden opacity-0 animate-form-card text-base" style={{ animationDelay: '240ms' }}>
              <div className="p-7 border-b border-border/40">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" />
                  Informations personnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Ex: Abdou"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Ex: Diop"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email généré</Label>
                    <Input id="email" value={formData.email} readOnly className="mt-1.5 bg-muted/20 rounded-xl border-border/50" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+221 77 123 45 67"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                </div>
              </div>

              <div className="p-7 border-b border-border/40">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  Adresse
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Ex: 15 Rue de la Paix"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ex: Dakar"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Informations académiques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="establishment">Daara *</Label>
                    <Select
                      value={formData.establishmentId}
                      onValueChange={(value) => setFormData({ ...formData, establishmentId: value, tutorId: '' })}
                    >
                      <SelectTrigger className="mt-1.5 rounded-xl">
                        <SelectValue placeholder="Sélectionner un daara" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border">
                        {mockEstablishments.map((est) => (
                          <SelectItem key={est.id} value={est.id}>{est.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tutor">Tuteur assigné</Label>
                    <Select
                      value={formData.tutorId}
                      onValueChange={(value) => setFormData({ ...formData, tutorId: value })}
                      disabled={!formData.establishmentId}
                    >
                      <SelectTrigger className="mt-1.5 rounded-xl">
                        <SelectValue placeholder={formData.establishmentId ? "Sélectionner un tuteur" : "Daara d'abord"} />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border">
                        {availableTutors.map((tutor) => (
                          <SelectItem key={tutor.id} value={tutor.id}>
                            {tutor.firstName} {tutor.lastName} - {tutor.specialization}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 opacity-0 animate-form-enter" style={{ animationDelay: '320ms' }}>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300 rounded-xl shadow-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? 'Enregistrer' : 'Inscrire'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/students')} className="rounded-xl">
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default StudentForm;
