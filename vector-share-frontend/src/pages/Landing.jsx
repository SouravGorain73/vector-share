import React, { useEffect } from 'react'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import PricingSection from '../components/landing/PricingSection'
import TestimonialSection from '../components/landing/TestimonialSection'
import CTASection from '../components/landing/CTASection'
import FooterSection from '../components/landing/FooterSection'
import { features, pricingPlans, testimonials } from '../assets/data'
import { useClerk, useUser } from '@clerk/react'
import { useNavigate } from 'react-router-dom'

function Landing() {
  
  const {openSignUp, openSignIn} = useClerk();
  const {isSignedIn} = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
   if(isSignedIn){
    navigate("/dashboard");
   }
  }, [isSignedIn])

  return (
    <div className="landing-page bg-linear-to-b from gray-50 to-gray-100">
        {/* Hero Section */}
        <HeroSection openSignUp={openSignUp} openSignIn={openSignIn} />

        {/* Features Section */}
        <FeaturesSection features={features}/>

        {/* Pricing Section */}
        <PricingSection pricingPlans={pricingPlans}/>

        {/* Testimonials Section */}
        <TestimonialSection testimonials={testimonials}/>

        {/* CTA(Call to Action) Section */}
        <CTASection/>

        {/* Footer Section */}
        <FooterSection/>
    </div>
  )
}

export default Landing
