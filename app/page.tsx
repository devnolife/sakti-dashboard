import {
  Header,
  HeroSection,
  AboutSection,
  CoursesSection,
  WakilDekanSection,
  TestimonialsSection,
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
        <CoursesSection />
        <WakilDekanSection />
        <TestimonialsSection />
        <QuotesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

