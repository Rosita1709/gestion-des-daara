import { Layout } from '@/components/layout/Layout';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-muted-foreground" />
          Paramètres
        </h1>
        <p className="page-subtitle">Configurez les paramètres de votre plateforme</p>
      </div>

      <div className="bg-card rounded-xl border border-border/50 shadow-sm p-8 text-center">
        <SettingsIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground">Page en construction</h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Les paramètres de la plateforme seront bientôt disponibles. 
          Vous pourrez personnaliser l'apparence, gérer les notifications et configurer les intégrations.
        </p>
      </div>
    </Layout>
  );
};

export default Settings;
