

import React from 'react';
import Hero from './components/Hero'
import DigitalAgency from './components/DigitalAgency'
import OurClient from './components/OurClient'
import HowsItWork from './components/Steps'
import Blog from './components/Blog'
import Success from './components/Success'
import Questions from './components/Questions'
import EventEngagement from './components/EventEngagement'
import Campaign from './components/Campaign'
import Feature from './components/Features'


const Page = () => {
    return (
      <div>    
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
      <EventEngagement/>

      </div>
    );
  };
  
  export default Page;
