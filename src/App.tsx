import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Location from './components/Location';
import Footer from './components/Footer';
import InstagramFeed from './components/InstagramFeed';
import Newsletter from './components/Newsletter';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <InstagramFeed />
      <Booking />
      <Newsletter />
      <Location />
      <Footer />
    </div>
  );
}

export default App;