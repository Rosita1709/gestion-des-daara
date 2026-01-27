import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { BookOpen, ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockAcademicItems, mockEstablishments, mockTutors } from '@/data/mockData';
import { toast } from 'sonner';

const AcademicForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const existingItem = id 
    ? mockAcademicItems.find((i) => i.id === id) 
    : null;

  const [formData, setFormData] = useState({
    title: existingItem?.title || '',
    type: existingItem?.type || 'course',
    description: existingItem?.description || '',
    dueDate: existingItem?.dueDate 
      ? new Date(existingItem.dueDate).toISOString().split('T')[0] 
      : '',
    establishmentId: existingItem?.establishmentId || '',
    tutorId: existingItem?.tutorId || '',
    status: existingItem?.status || 'draft',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.establishmentId || !formData.tutorId) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    toast.success(
      isEdit 
        ? 'Contenu modifié avec succès' 
        : 'Contenu créé avec succès'
    );
    navigate('/academic');
  };

  // Filter tutors by selected establishment
  const availableTutors = mockTutors.filter(
    (t) => t.establishmentId === formData.establishmentId && t.status === 'active'
  );

  return (
    <Layout>
      {/* Header */}
      <div className="page-header">
        <button
          onClick={() => navigate('/academic')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux contenus
        </button>
        <h1 className="page-title flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-warning" />
          {isEdit ? 'Modifier le contenu' : 'Nouveau contenu académique'}
        </h1>
        <p className="page-subtitle">
          {isEdit 
            ? 'Modifiez les informations du contenu' 
            : 'Créez un nouveau cours, devoir, examen ou TP'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
          {/* Basic Info */}
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informations générales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Introduction aux Algorithmes"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="type">Type de contenu *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border">
                    <SelectItem value="course">Cours</SelectItem>
                    <SelectItem value="homework">Devoir</SelectItem>
                    <SelectItem value="exam">Examen</SelectItem>
                    <SelectItem value="tp">Travaux Pratiques (TP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border">
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez le contenu..."
                  className="mt-1.5 min-h-[100px]"
                />
              </div>
              {(formData.type === 'homework' || formData.type === 'exam' || formData.type === 'tp') && (
                <div>
                  <Label htmlFor="dueDate">Date limite</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Assignment */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Affectation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="establishment">Établissement *</Label>
                <Select
                  value={formData.establishmentId}
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    establishmentId: value,
                    tutorId: ''
                  })}
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
              <div>
                <Label htmlFor="tutor">Tuteur responsable *</Label>
                <Select
                  value={formData.tutorId}
                  onValueChange={(value) => setFormData({ ...formData, tutorId: value })}
                  disabled={!formData.establishmentId}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder={
                      formData.establishmentId 
                        ? "Sélectionner un tuteur" 
                        : "Sélectionnez d'abord un établissement"
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
            {isEdit ? 'Enregistrer les modifications' : 'Créer le contenu'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/academic')}>
            Annuler
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default AcademicForm;
