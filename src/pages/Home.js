import React from 'react';
import Hero from '../components/Hero';
import Collection from '../components/Collection';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/force-majeure-00tlC0Clfrs-unsplash.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black/95" />
      </div>

      <div className="relative z-10">
        <Hero />
        <Collection />
        <About />
        <Contact />
      </div>
    </div>
  );
};

export default Home;