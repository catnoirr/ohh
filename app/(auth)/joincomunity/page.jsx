import React from 'react';
import Hero from './components/Hero'
import Partners from './components/Partners'
import Comunity from './components/DedicatedComunity'
import Story from './components/Story'
import Steps from './components/Steps'
import Review from '.././CampusAmbassador/components/Solved'
import Join from './components/Join'
import Apply from '../CampusAmbassador/components/ContactSection'
import FashionGrid from './components/FashionGrid'

const JoinComunity = () => {
    return (
        <div>
          <Hero />
          <Partners />
          <Comunity />
          <Story />
          <Steps />
          <Review />
          <Join/>
          <FashionGrid/>
          <Apply/>

        </div>
    );
};

export default JoinComunity;
