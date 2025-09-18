import { Header, HeroSection, UsefulFeature, OurTeam, GetStarted, ContactUs, Footer } from '@/components/landing'

export const metadata = {
  title: 'SINTEKMu Landing - Sistem Informasi Fakultas Teknik',
  description: 'Sistem Informasi Terintegrasi Fakultas Teknik Unismuh Makassar - Platform terpadu untuk pengelolaan akademik universitas',
}

export default function LandingPage() {
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