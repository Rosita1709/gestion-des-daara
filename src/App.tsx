import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Establishments from "./pages/Establishments";
import EstablishmentForm from "./pages/EstablishmentForm";
import Tutors from "./pages/Tutors";
import TutorForm from "./pages/TutorForm";
import Enseignants from "./pages/Enseignants";
import EnseignantForm from "./pages/EnseignantForm";
import Students from "./pages/Students";
import StudentForm from "./pages/StudentForm";
import Academic from "./pages/Academic";
import AcademicForm from "./pages/AcademicForm";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/establishments" element={<Establishments />} />
          <Route path="/establishments/new" element={<EstablishmentForm />} />
          <Route path="/establishments/:id" element={<EstablishmentForm />} />
          <Route path="/establishments/:id/edit" element={<EstablishmentForm />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/tutors/new" element={<TutorForm />} />
          <Route path="/tutors/:id" element={<TutorForm />} />
          <Route path="/tutors/:id/edit" element={<TutorForm />} />
          <Route path="/enseignants" element={<Enseignants />} />
          <Route path="/enseignants/new" element={<EnseignantForm />} />
          <Route path="/enseignants/:id" element={<EnseignantForm />} />
          <Route path="/enseignants/:id/edit" element={<EnseignantForm />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/new" element={<StudentForm />} />
          <Route path="/students/:id" element={<StudentForm />} />
          <Route path="/students/:id/edit" element={<StudentForm />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/academic/new" element={<AcademicForm />} />
          <Route path="/academic/:id" element={<AcademicForm />} />
          <Route path="/academic/:id/edit" element={<AcademicForm />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
