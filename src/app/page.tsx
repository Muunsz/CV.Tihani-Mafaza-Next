import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { StatisticsSection } from '@/components/home/StatisticsSection';
import { USPSection } from '@/components/home/USPSection';
import { ProductsSection } from '@/components/home/ProductsSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { PartnersSection } from '@/components/home/PartnersSection';
import { FAQSection } from '@/components/home/FAQSection';
import { RequestForm } from '@/components/forms/RequestForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <StatisticsSection />
        <USPSection />
        <ProductsSection />
        <ServicesSection />
        <TestimonialsSection />
        <PartnersSection />
        <FAQSection />
        <RequestForm />
      </main>
      <Footer />
    </div>
  );
}
