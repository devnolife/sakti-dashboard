import { Header, HeroSection, UsefulFeature, OurTeam, GetStarted, ContactUs, Footer } from '@/components/landing'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <HeroSection />
        <UsefulFeature />
        <OurTeam />
        <GetStarted />
        <ContactUs />
      </main>
      <Footer />
    </>
  )
}

