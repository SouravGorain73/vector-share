import React from 'react'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import PricingSection from '../components/landing/PricingSection'
import TestimonialSection from '../components/landing/TestimonialSection'
import CTASection from '../components/landing/CTASection'
import FooterSection from '../components/landing/FooterSection'
import { features, pricingPlans } from '../assets/data'

function Landing() {
  return (
    <div className="landing-page bg-linear-to-b from gray-50 to-gray-100">
        {/* Hero Section */}
        <HeroSection/>

        {/* Features Section */}
        <FeaturesSection features={features}/>

        {/* Pricing Section */}
        <PricingSection pricingPlans={pricingPlans}/>

        {/* Testimonials Section */}
        <TestimonialSection/>

        {/* CTA(Call to Action) Section */}
        <CTASection/>

        {/* Footer Section */}
        <FooterSection/>
    </div>
  )
}

export default Landing
