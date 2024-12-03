

import React from 'react';
import Hero from './components/Hero'
import DigitalAgency from './components/DigitalAgency'
import OurClient from './components/OurClient'
import HowsItWork from './components/Steps'
import Blog from './components/Blog'
import Success from '../CampusAmbassador/components/Solved'
import Questions from './components/Questions'
import EventEngagement from './components/EventEngagement'
import Campaign from './components/Campaign'
import Feature from './components/Features'
import JoinWhatsapp from './components/JoinWhatsapp'


const Page = () => {
    return (
      <div className='overflow-hidden'>    
      <Hero/>
      <DigitalAgency/>
      <OurClient/>
      <Campaign/>
      <HowsItWork/>
      <Feature/>

      {/* <div className=' my-8 '>
        <img src="./image 43.png" alt="image "  />
      </div> */}
      <Blog/>
      <Success/>
      <Questions/>
<JoinWhatsapp/>
      <EventEngagement/>

      </div>
    );
  };
  
  export default Page;
