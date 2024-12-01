import React from 'react';
import FrontPage from './components/FrontPage';
import Features from '../about/components/Featured';
import Review from './components/ReviewPage';
import FAQ from './components/faq';
import NewWay from './components/NewWay';
import Services from "../CampusAmbassador/components/Services"
import HowItWork from "../CampusAmbassador/components/HowItWorks"
import RecentCaseStudy from "../casestudy/components/RecentBlog"
import MaximumEngagement from './components/MaximumEngagement';

const JoinComunity = () => {
    return (
        <div className='space-y-4'>
            <FrontPage />
            <Features />
            <Services />
            <HowItWork />
            <RecentCaseStudy  />

            <Review />
            <NewWay />
            <FAQ />
            <MaximumEngagement />

        </div>
    );
};

export default JoinComunity;
