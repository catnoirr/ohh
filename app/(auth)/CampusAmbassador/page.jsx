// page.jsx
import React from 'react';
import CampusAmbassadorProgram from './components/CampusAmbassadorHero'; // Adjust the path as necessary
import CampusImpact from './components/CampusImpact'; // Adjust the path as necessary
import Services from './components/Services'; // Adjust the path as necessary
import RoleAndResponsibility from './components/RoleAndResponsibilities'; // Adjust the path as necessary
import HowItWorks from './components/HowItWorks';
import VideoAndStats from './components/VideoAndStats'
import OurStory from './components/OurStory'
import FAQ from './components/Faq'
import Solved from './components/Solved'
import ContactSection from './components/ContactSection'
import Colleges from "./components/Colleges"
const Page = () => {
  return (
    <div className='bg-white'>
      <CampusAmbassadorProgram />
      <Colleges/>
      <CampusImpact/>
      <Services/>
      <RoleAndResponsibility/>
      <OurStory/>

      <HowItWorks/>
      <VideoAndStats/>
      <Solved/>
      <FAQ/>
      <ContactSection/>

    </div>
  );
};

export default Page;
