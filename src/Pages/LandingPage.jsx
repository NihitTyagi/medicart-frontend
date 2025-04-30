import React from 'react';
import HeroSection from '../Components/HeroSection';
import WhyChooseUs from '../Components/WhyChooseUs';
import FeaturedProducts from '../Components/FeaturedProducts';
import CTASection from '../Components/CTASection';


const LandingPage = () => {
  return (
    <div>
      <HeroSection/>
      <WhyChooseUs/>
      <FeaturedProducts/>
      <CTASection/>
    </div>
  );
};

export default LandingPage;