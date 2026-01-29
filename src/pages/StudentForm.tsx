import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { GraduationCap, ArrowLeft, Save } from 'lucide-react';
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

const statusLabels = {
  enrolled: 'Inscrit',
  graduated: 'Diplômé',
  suspended: 'Suspendu',
};

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const existingStudent = id
    ? mockStudents.find((s) => s.id === id)
    : null;

  const [formData, setFormData] = useState({
    firstName: existingStudent?.firstName || '',
    lastName: existingStudent?.lastName || '',
    email: existingStudent?.email || '',
    phone: existingStudent?.phone || '',
    dateOfBirth: existingStudent?.dateOfBirth
      ? new Date(existingStudent.dateOfBirth).toISOString().split('T')[0]
      : '',
    address: existingStudent?.address || '',
    city: existingStudent?.city || '',
    establishmentId: existingStudent?.establishmentId || '',
    tutorId: existingStudent?.tutorId || '',
    status: existingStudent?.status || 'enrolled',
  });

  // Filtrer les tuteurs selon l'établissement sélectionné
  const availableTutors = mockTutors.filter(
    (t) => t.establishmentId === formData.establishmentId && t.status === 'active'
  );

  // Générer un email automatique en respectant les caractères valides
  const generateEmail = (firstName: string, lastName: string, estId: string) => {
    const est = mockEstablishments.find((e) => e.id === estId);
    if (!est) return '';
    
    // Normaliser le texte: minuscules, retirer accents et espaces
    const normalize = (str: string) => 
      str
        .normalize('NFD') // séparer accents
        .replace(/[\u0300-\u036f]/g, '') // supprimer accents
        .replace(/\s+/g, '') // supprimer espaces
        .replace(/[^a-z0-9]/gi, ''); // garder lettres et chiffres
    
    const domain = normalize(est.name);
    return `${normalize(firstName)}.${normalize(lastName)}@${domain}`;
  };

  // Mettre à jour l'email automatiquement quand prénom, nom ou établissement change
  useEffect(() => {
    if (formData.firstName && formData.lastName && formData.establishmentId) {
      setFormData((prev) => ({
        ...prev,
        email: generateEmail(prev.firstName, prev.lastName, prev.establishmentId),
      }));
    }
  }, [formData.firstName, formData.lastName, formData.establishmentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.establishmentId) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    toast.success(
      isEdit
        ? 'Apprenant modifié avec succès'
        : 'Apprenant inscrit avec succès'
    );
    navigate('/students');
  };

  return (
    <Layout>
      {/* Header */}
      <div className="page-header">
        <button
          onClick={() => navigate('/students')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux apprenants
        </button>
        <h1 className="page-title flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-accent" />
          {isEdit ? 'Modifier l\'apprenant' : 'Nouvel apprenant'}
        </h1>
        <p className="page-subtitle">
          {isEdit
            ? 'Modifiez les informations de l\'apprenant'
            : 'Remplissez les informations pour inscrire un nouvel apprenant'}
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
                  placeholder="Ex: Abdou"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Ex: Diop"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email généré</Label>
                <Input
                  id="email"
                  value={formData.email}
                  readOnly
                  className="mt-1.5 bg-muted/10"
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+221 77 123 45 67"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Adresse</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ex: 15 Rue de la Paix"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ex: Dakar"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informations académiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="establishment">Daara *</Label>
                <Select
                  value={formData.establishmentId}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    establishmentId: value,
                    tutorId: '' // réinitialiser le tuteur si le daara change
                  })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Sélectionner un daara" />
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
              <div>
                <Label htmlFor="tutor">Tuteur assigné</Label>
                <Select
                  value={formData.tutorId}
                  onValueChange={(value) => setFormData({ ...formData, tutorId: value })}
                  disabled={!formData.establishmentId}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder={
                      formData.establishmentId 
                        ? "Sélectionner un tuteur" 
                        : "Sélectionnez d'abord un daara"
                    } />
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

        {/* Actions */}
        <div className="flex items-center gap-4 mt-6">
          <Button type="submit" className="btn-gradient">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Enregistrer les modifications' : 'Inscrire l\'apprenant'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/students')}>
            Annuler
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default StudentForm;
