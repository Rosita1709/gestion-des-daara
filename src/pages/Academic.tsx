import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { mockAcademicItems, mockEstablishments, mockTutors } from '@/data/mockData';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Academic = () => {
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    toast.success('Contenu supprimé avec succès');
    
  };

  return (
    <Layout>
      <div className="page-header flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="page-title text-2xl font-bold">Contenus Madrasa</h1>
        <Button onClick={() => navigate('/academic/new')} className="mt-2 md:mt-0">
          Ajouter un contenu
        </Button>
      </div>

      <div className="overflow-x-auto bg-card rounded-xl border border-border/50 shadow-sm">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">Titre</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Tuteur</th>
              <th className="px-4 py-2 text-left">Établissement</th>
              <th className="px-4 py-2 text-left">Statut</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockAcademicItems.map((item) => {
              const tutor = mockTutors.find(t => t.id === item.tutorId);
              const establishment = mockEstablishments.find(e => e.id === item.establishmentId);

              return (
                <tr key={item.id} className="hover:bg-muted/50">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2">{tutor ? `${tutor.firstName} ${tutor.lastName}` : '-'}</td>
                  <td className="px-4 py-2">{establishment ? establishment.name : '-'}</td>
                  <td className="px-4 py-2">{item.status}</td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/academic/${item.id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Academic;
