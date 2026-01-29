import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { BookOpen, Save, FileText, Link2 } from 'lucide-react';
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
import { cn } from '@/lib/utils';

type AcademicType = 'course' | 'tajwid' | 'fiqh' | 'khatm';
type StatusType = 'draft' | 'published' | 'completed';

const AcademicForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const existingItem = id ? mockAcademicItems.find((i) => i.id === id) : null;

  const [formData, setFormData] = useState<{
    title: string;
    type: AcademicType;
    description: string;
    dueDate: string;
    establishmentId: string;
    tutorId: string;
    status: StatusType;
  }>({
    title: existingItem?.title || '',
    type: (existingItem?.type as AcademicType) || 'course',
    description: existingItem?.description || '',
    dueDate: existingItem?.dueDate ? new Date(existingItem.dueDate).toISOString().split('T')[0] : '',
    establishmentId: existingItem?.establishmentId || '',
    tutorId: existingItem?.tutorId || '',
    status: (existingItem?.status as StatusType) || 'draft',
  });

  const availableTutors = mockTutors.filter(
    (t) => t.establishmentId === formData.establishmentId && t.status === 'active'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.establishmentId || !formData.tutorId) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    toast.success(isEdit ? 'Contenu modifié avec succès' : 'Contenu créé avec succès');
    navigate('/academic');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-full py-6">
        <div className="max-w-3xl w-full mx-auto px-4">
          <div className="mb-6">
            <h1 className={cn('text-2xl font-bold text-foreground tracking-tight flex items-center gap-3 opacity-0 animate-form-enter')} style={{ animationDelay: '80ms' }}>
              <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-warning" />
              </div>
              {isEdit ? 'Modifier le contenu' : 'Nouveau contenu'}
            </h1>
            <p className={cn('page-subtitle mt-1 opacity-0 animate-form-enter')} style={{ animationDelay: '160ms' }}>
              {isEdit ? 'Modifiez les informations' : 'Sourate, Tajwid, Fiqh ou Phase finale'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="bg-card rounded-2xl border border-border/40 shadow-sm overflow-hidden opacity-0 animate-form-card text-base" style={{ animationDelay: '240ms' }}>
              <div className="p-7 border-b border-border/40">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-warning" />
                  Informations générales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="title">Titre *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Sourate Al-Fatiha"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value as AcademicType })}
                    >
                      <SelectTrigger className="mt-1.5 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border">
                        <SelectItem value="course">Sourate</SelectItem>
                        <SelectItem value="tajwid">Tajwid</SelectItem>
                        <SelectItem value="fiqh">Fiqh</SelectItem>
                        <SelectItem value="khatm">Phase finale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value as StatusType })}
                    >
                      <SelectTrigger className="mt-1.5 rounded-xl">
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
                      className="mt-1.5 min-h-[100px] rounded-xl border-border/50"
                    />
                  </div>
                  {(formData.type === 'tajwid' || formData.type === 'fiqh' || formData.type === 'khatm') && (
                    <div>
                      <Label htmlFor="dueDate">Date limite</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="mt-1.5 rounded-xl border-border/50"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-primary" />
                  Affectation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="establishment">Établissement *</Label>
                    <Select
                      value={formData.establishmentId}
                      onValueChange={(value) => setFormData({ ...formData, establishmentId: value, tutorId: '' })}
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
                  <div>
                    <Label htmlFor="tutor">Tuteur *</Label>
                    <Select
                      value={formData.tutorId}
                      onValueChange={(value) => setFormData({ ...formData, tutorId: value })}
                      disabled={!formData.establishmentId}
                    >
                      <SelectTrigger className="mt-1.5 rounded-xl">
                        <SelectValue placeholder={formData.establishmentId ? "Sélectionner" : "Établissement d'abord"} />
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
                className="bg-warning text-warning-foreground hover:bg-warning/90 transition-colors duration-300 rounded-xl shadow-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? 'Enregistrer' : 'Créer'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/academic')} className="rounded-xl">
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AcademicForm;
