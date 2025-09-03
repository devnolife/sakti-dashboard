import { HeroSection, UsefulFeature, OurTeam, GetStarted, ContactUs } from '@/components/landing-page'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <UsefulFeature />
      <OurTeam />
      <GetStarted />
      <ContactUs />
    </main>
  )
}

