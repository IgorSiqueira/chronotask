import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import DashboardPreview from '../components/DashboardPreview';
import Characters from '../components/Characters';
import Battles from '../components/Battles';
import SocialProof from '../components/SocialProof';
import Footer from '../components/Footer';

const Landing = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <HowItWorks />
                <DashboardPreview />
                <Characters />
                <SocialProof />
                <Battles />
            </main>
            <Footer />
        </>
    );
};

export default Landing;
