'use client'

import { Footer } from '../molecules/landing/footer'
import { HeroApp } from '../molecules/landing/HeroSection'
import { MainSection } from '../molecules/landing/main-section'

export default function LandingPage() {
  return (
    <section>
      <HeroApp title="Empower Your Identity" subtitle="Your Healthcare Data, Under Your Control." />
      <MainSection />
      <Footer />
    </section>
  )
}