import {
  Header,
  HeroSection,
  AboutSection,
  FeaturesSection,
  WakilDekanSection,
  StatsSection,
  NewsSection,
  QuotesSection,
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
      </main>
      <Footer />
    </>
  )
}

