import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PricingSection from '../components/landing/PricingSection';
import TestimonialSection from '../components/landing/TestimonialSection';
import CTASection from '../components/landing/CTASection';
import FooterSection from '../components/landing/FooterSection';
import { features, pricingPlans, testimonials } from '../assets/data';
import { useAuth } from '../context/AuthContext';

function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const goToRegister = () => navigate('/register');
  const goToLogin = () => navigate('/login');

  return (
    <div className="landing-page bg-linear-to-b from gray-50 to-gray-100">
      {/* Hero Section */}
      <HeroSection openSignUp={goToRegister} openSignIn={goToLogin} />

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Pricing Section */}
      <PricingSection pricingPlans={pricingPlans} />

      {/* Testimonials Section */}
      <TestimonialSection testimonials={testimonials} />

      {/* CTA(Call to Action) Section */}
      <CTASection openSignUp={goToRegister} />

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
}

export default Landing;
