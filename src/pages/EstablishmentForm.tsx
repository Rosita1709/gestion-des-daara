import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Building2, ArrowLeft, Save } from 'lucide-react';
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
import { mockEstablishments } from '@/data/mockData';
import { toast } from 'sonner';

const EstablishmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const existingEstablishment = id 
    ? mockEstablishments.find((e) => e.id === id) 
    : null;

  const [formData, setFormData] = useState({
    name: existingEstablishment?.name || '',
    type: existingEstablishment?.type || 'university',
    address: existingEstablishment?.address || '',
    city: existingEstablishment?.city || '',
    country: existingEstablishment?.country || 'France',
    phone: existingEstablishment?.phone || '',
    email: existingEstablishment?.email || '',
    website: existingEstablishment?.website || '',
    status: existingEstablishment?.status === 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.city) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    toast.success(
      isEdit 
        ? 'Établissement modifié avec succès' 
        : 'Établissement créé avec succès'
    );
    navigate('/establishments');
  };

  return (
    <Layout>
      {/* Header */}
      <div className="page-header">
        <button
          onClick={() => navigate('/establishments')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux établissements
        </button>
        <h1 className="page-title flex items-center gap-3">
          <Building2 className="w-8 h-8 text-primary" />
          {isEdit ? 'Modifier l\'établissement' : 'Nouvel établissement'}
        </h1>
        <p className="page-subtitle">
          {isEdit 
            ? 'Modifiez les informations de l\'établissement' 
            : 'Remplissez les informations pour créer un nouvel établissement'}
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
                <Label htmlFor="name">Nom de l'établissement *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Université Paris-Saclay"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="type">Type d'établissement *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border">
                    <SelectItem value="university">Université</SelectItem>
                    <SelectItem value="college">Collège</SelectItem>
                    <SelectItem value="school">Lycée</SelectItem>
                    <SelectItem value="institute">Institut</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="status">Statut</Label>
                  <div className="flex items-center gap-3 mt-3">
                    <Switch
                      id="status"
                      checked={formData.status}
                      onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                    />
                    <span className="text-sm text-muted-foreground">
                      {formData.status ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Adresse</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ex: 3 Rue Joliot Curie"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="city">Ville *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ex: Paris"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="country">Pays</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Ex: France"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@exemple.fr"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+33 1 23 45 67 89"
                  className="mt-1.5"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="website">Site web</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.exemple.fr"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-6">
          <Button type="submit" className="btn-gradient">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Enregistrer les modifications' : 'Créer l\'établissement'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/establishments')}>
            Annuler
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default EstablishmentForm;
