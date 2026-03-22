import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AdminPanel from "./components/AdminPanel";
import FooterSection from "./components/FooterSection";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PublicationsSection from "./components/PublicationsSection";
import ResearchSection from "./components/ResearchSection";
import TeachingContactSection from "./components/TeachingContactSection";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function AcademicSite() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onAdminClick={() => setAdminOpen(true)} />
      <main>
        <HeroSection />
        <ResearchSection />
        <PublicationsSection />
        <TeachingContactSection />
      </main>
      <FooterSection onAdminClick={() => setAdminOpen(true)} />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <InternetIdentityProvider>
      <QueryClientProvider client={queryClient}>
        <AcademicSite />
      </QueryClientProvider>
    </InternetIdentityProvider>
  );
}
