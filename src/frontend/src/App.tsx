import FooterSection from "./components/FooterSection";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PublicationsSection from "./components/PublicationsSection";
import ResearchSection from "./components/ResearchSection";
import TeachingContactSection from "./components/TeachingContactSection";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ResearchSection />
        <PublicationsSection />
        <TeachingContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
