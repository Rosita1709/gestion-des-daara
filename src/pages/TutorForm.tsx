import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Users, Save, User, Briefcase, Building2 } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { mockTutors, mockEstablishments } from '@/data/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const generateEmail = (firstName: string, lastName: string, daaraName: string) => {
  const normalize = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '');
  return `${normalize(firstName)}.${normalize(lastName)}@${normalize(daaraName)}.fr`.toLowerCase();
};

const TutorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const existingTutor = id ? mockTutors.find((t) => t.id === id) : null;

  const [formData, setFormData] = useState({
    firstName: existingTutor?.firstName || '',
    lastName: existingTutor?.lastName || '',
    email: existingTutor?.email || '',
    phone: existingTutor?.phone || '',
    specialization: existingTutor?.specialization || '',
    establishmentId: existingTutor?.establishmentId || '',
    status: existingTutor?.status === 'active',
  });

  useEffect(() => {
    if (!isEdit && formData.firstName && formData.lastName && formData.establishmentId) {
      const daara = mockEstablishments.find((e) => e.id === formData.establishmentId)?.name || '';
      setFormData((prev) => ({ ...prev, email: generateEmail(prev.firstName, prev.lastName, daara) }));
    }
  }, [formData.firstName, formData.lastName, formData.establishmentId, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.establishmentId) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    toast.success(isEdit ? 'Tuteur modifié avec succès' : 'Tuteur créé avec succès');
    navigate('/tutors');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-full py-6">
        <div className="max-w-3xl w-full mx-auto px-4">
          <div className="mb-6">
            <h1 className={cn('text-2xl font-bold text-foreground tracking-tight flex items-center gap-3 opacity-0 animate-form-enter')} style={{ animationDelay: '80ms' }}>
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-secondary" />
              </div>
              {isEdit ? 'Modifier le tuteur' : 'Nouveau tuteur'}
            </h1>
            <p className={cn('page-subtitle mt-1 opacity-0 animate-form-enter')} style={{ animationDelay: '160ms' }}>
              {isEdit ? 'Modifiez les informations' : 'Créez un nouveau tuteur'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="bg-card rounded-2xl border border-border/40 shadow-sm overflow-hidden opacity-0 animate-form-card text-base" style={{ animationDelay: '240ms' }}>
              <div className="p-7 border-b border-border/40">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-secondary" />
                  Informations personnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Ex: Marie"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Ex: Dubois"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      readOnly
                      className="mt-1.5 bg-muted/20 cursor-not-allowed rounded-xl border-border/50"
                    />
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
                  <Briefcase className="w-4 h-4 text-primary" />
                  Informations professionnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specialization">Spécialisation</Label>
                    <Input
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      placeholder="Ex: Mathématiques"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="establishment">Établissement *</Label>
                    <Select
                      value={formData.establishmentId}
                      onValueChange={(value) => setFormData({ ...formData, establishmentId: value })}
                    >
                      <SelectTrigger className="mt-1.5 rounded-xl">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border">
                        {mockEstablishments.map((est) => (
                          <SelectItem key={est.id} value={est.id}>{est.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-accent" />
                  Statut
                </h3>
                <div className="flex items-center justify-between rounded-xl border border-border/40 p-4 bg-muted/10">
                  <div>
                    <Label htmlFor="status">Tuteur actif</Label>
                    <p className="text-sm text-muted-foreground mt-1">Inactif = non assignable aux nouveaux étudiants</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      id="status"
                      checked={formData.status}
                      onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                    />
                    <span className="text-sm font-medium text-foreground">{formData.status ? 'Actif' : 'Inactif'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 opacity-0 animate-form-enter" style={{ animationDelay: '320ms' }}>
              <Button
                type="submit"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-300 rounded-xl shadow-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? 'Enregistrer' : 'Créer'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/tutors')} className="rounded-xl">
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TutorForm;
