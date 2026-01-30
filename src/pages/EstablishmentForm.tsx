import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Building2, Save, MapPin, Mail, Globe, UserCircle } from 'lucide-react';
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
import { cn } from '@/lib/utils';

const EstablishmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const existingEstablishment = id ? mockEstablishments.find((e) => e.id === id) : null;

  const [formData, setFormData] = useState({
    name: existingEstablishment?.name || '',
    type: 'daara',
    address: existingEstablishment?.address || '',
    city: existingEstablishment?.city || '',
    country: existingEstablishment?.country || 'Sénégal',
    phone: existingEstablishment?.phone || '',
    email: existingEstablishment?.email || '',
    website: existingEstablishment?.website || '',
    responsableName: existingEstablishment?.responsableName || '',
    responsablePhone: existingEstablishment?.responsablePhone || '',
    status: existingEstablishment?.status === 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.city || !formData.email) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    toast.success(isEdit ? 'Daara modifié avec succès' : 'Daara créé avec succès');
    navigate('/establishments');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-full py-6">
        <div className="max-w-3xl w-full mx-auto px-4">
          <div className="mb-6">
            <h1 className={cn('text-2xl font-bold text-foreground tracking-tight flex items-center gap-3 opacity-0 animate-form-enter')} style={{ animationDelay: '80ms' }}>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              {isEdit ? 'Modifier l’établissement' : 'Nouvel établissement'}
            </h1>
            <p className={cn('page-subtitle mt-1 opacity-0 animate-form-enter')} style={{ animationDelay: '160ms' }}>
              {isEdit ? 'Modifiez les informations' : 'Créez un nouvel établissement'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="bg-card rounded-2xl border border-border/40 shadow-sm overflow-hidden opacity-0 animate-form-card text-base" style={{ animationDelay: '240ms' }}>
              <div className="p-7 border-b border-border/40">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  Informations générales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Nom *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex : Daara Serigne Touba"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select value="daara" disabled>
                      <SelectTrigger className="mt-1.5 rounded-xl">
                        <SelectValue placeholder="Daara" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daara">Daara</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label htmlFor="status">Statut</Label>
                    <div className="flex items-center gap-3 mt-3">
                      <Switch
                        id="status"
                        checked={formData.status}
                        onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                      />
                      <span className="text-sm text-muted-foreground">{formData.status ? 'Actif' : 'Inactif'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-7 border-b border-border/40">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-primary" />
                  Responsable d&apos;établissement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="responsableName">Nom du responsable</Label>
                    <Input
                      id="responsableName"
                      value={formData.responsableName}
                      onChange={(e) => setFormData({ ...formData, responsableName: e.target.value })}
                      placeholder="Ex : Serigne Moustapha Diop"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="responsablePhone">Téléphone du responsable</Label>
                    <Input
                      id="responsablePhone"
                      value={formData.responsablePhone}
                      onChange={(e) => setFormData({ ...formData, responsablePhone: e.target.value })}
                      placeholder="+221 77 000 00 00"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                </div>
              </div>

              <div className="p-7 border-b border-border/40">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  Localisation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Ex : Quartier Médina"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ex : Touba"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Pays</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@daara.sn"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+221 77 000 00 00"
                      className="mt-1.5 rounded-xl border-border/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="website">Site web</Label>
                    <div className="relative mt-1.5">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://www.daara.sn"
                        className="pl-10 rounded-xl border-border/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 opacity-0 animate-form-enter" style={{ animationDelay: '320ms' }}>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 rounded-xl shadow-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? 'Enregistrer' : 'Créer'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/establishments')} className="rounded-xl">
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EstablishmentForm;
