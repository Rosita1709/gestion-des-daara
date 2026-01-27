import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Users, ArrowLeft, Save } from 'lucide-react';
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

const TutorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const existingTutor = id 
    ? mockTutors.find((t) => t.id === id) 
    : null;

  const [formData, setFormData] = useState({
    firstName: existingTutor?.firstName || '',
    lastName: existingTutor?.lastName || '',
    email: existingTutor?.email || '',
    phone: existingTutor?.phone || '',
    specialization: existingTutor?.specialization || '',
    establishmentId: existingTutor?.establishmentId || '',
    status: existingTutor?.status === 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.establishmentId) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    toast.success(
      isEdit 
        ? 'Tuteur modifié avec succès' 
        : 'Tuteur créé avec succès'
    );
    navigate('/tutors');
  };

  return (
    <Layout>
      {/* Header */}
      <div className="page-header">
        <button
          onClick={() => navigate('/tutors')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux tuteurs
        </button>
        <h1 className="page-title flex items-center gap-3">
          <Users className="w-8 h-8 text-secondary" />
          {isEdit ? 'Modifier le tuteur' : 'Nouveau tuteur'}
        </h1>
        <p className="page-subtitle">
          {isEdit 
            ? 'Modifiez les informations du tuteur' 
            : 'Remplissez les informations pour créer un nouveau tuteur'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
          {/* Personal Info */}
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informations personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Ex: Marie"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Ex: Dubois"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="marie.dubois@exemple.fr"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+33 6 12 34 56 78"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informations professionnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="specialization">Spécialisation</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="Ex: Mathématiques"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="establishment">Établissement *</Label>
                <Select
                  value={formData.establishmentId}
                  onValueChange={(value) => setFormData({ ...formData, establishmentId: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Sélectionner un établissement" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border">
                    {mockEstablishments.map((est) => (
                      <SelectItem key={est.id} value={est.id}>
                        {est.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="status">Statut du tuteur</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Un tuteur inactif ne pourra pas être assigné à de nouveaux étudiants
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                />
                <span className="text-sm font-medium text-foreground">
                  {formData.status ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-6">
          <Button type="submit" className="btn-gradient">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Enregistrer les modifications' : 'Créer le tuteur'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/tutors')}>
            Annuler
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default TutorForm;
