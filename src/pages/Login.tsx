import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { GraduationCap, Mail, Lock, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    toast.success('Connexion réussie');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.08),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="p-2.5 rounded-xl border border-border/50 bg-card/80 hover:bg-muted/50 transition-all duration-300 text-muted-foreground hover:text-foreground backdrop-blur-sm"
          aria-label={resolvedTheme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        >
          {mounted && resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[400px]">
          <div className="opacity-0 animate-form-enter mb-8 text-center" style={{ animationDelay: '60ms' }}>
            <div className="inline-flex w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center mb-5">
              <GraduationCap className="w-9 h-9 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">DAARA-DJI</h1>
            <p className="text-muted-foreground mt-1.5 text-sm">Espace administration</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl border border-border/40 shadow-xl shadow-primary/5 p-8 opacity-0 animate-form-card"
            style={{ animationDelay: '180ms' }}
          >
            <div className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@daaradji.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/20"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="text-foreground">Mot de passe</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-border/50 bg-background/50 focus:ring-2 focus:ring-primary/20"
                    autoComplete="current-password"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 font-medium shadow-sm"
            >
              Se connecter
            </Button>

            <p className="text-center mt-6 text-xs text-muted-foreground">
              Mot de passe oublié ?{' '}
              <button type="button" className="text-primary hover:underline font-medium">
                Réinitialiser
              </button>
            </p>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-8 opacity-0 animate-form-enter" style={{ animationDelay: '280ms' }}>
            Gestion des Daaras coraniques
          </p>
        </div>
      </div>

      <div className="h-16 flex items-center justify-center border-t border-border/30">
        <span className="text-xs text-muted-foreground">© DAARA-DJI</span>
      </div>
    </div>
  );
};

export default Login;
