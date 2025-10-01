import {
  Header,
  HeroSection,
  AboutSection,
  FeaturesSection,
  CoursesSection,
  WakilDekanSection,
  StatsSection,
  TestimonialsSection,
  NewsSection,
  QuotesSection,
  CTASection,
  Footer
} from '@/components/landing'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <WakilDekanSection />
        <StatsSection />
        <NewsSection />
        <QuotesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

