
import React from 'react';
import Hero from './components/HeroSection'; // Adjust the path if `Hero.js` is in a different directory
import HowItWorks from './components/HowItWorks';
import SecondSection from './components/Section2'; // Adjust the path if `Hero.js` is in a different directory
import SponsorshipSection from './components/SponsorshipSection.jsx'
import Testimonials from './components/Solved.jsx'
import FAQ from '../home/components/Questions'
import ContactSection from '../CampusAmbassador/components/ContactSection'
const Page = () => {
  return (
    
    <div className='bg-white'>
      <Hero />
     
      <SecondSection/>
       <HowItWorks/>
       <SponsorshipSection/>
       <Testimonials/>


       <FAQ/>
       <ContactSection/>
    </div>
  );
};

export default Page;
