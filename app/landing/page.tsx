import { HeroSection, UsefulFeature, GetStarted, ContactUs } from '@/components/landing-page'

export const metadata = {
  title: 'SINTEKMu Landing - Sistem Informasi Fakultas Teknik',
  description: 'Sistem Informasi Terintegrasi Fakultas Teknik Unismuh Makassar - Platform terpadu untuk pengelolaan akademik universitas',
}

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <UsefulFeature />
      <GetStarted />
      <ContactUs />
    </main>
  )
}