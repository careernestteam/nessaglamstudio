import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const portfolioItems = [
    {
      id: 1,
      image: 'https://i.ibb.co/wh23wrrF/Screenshot-2025-07-23-033851.png?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      alt: 'Professional bridal makeup transformation - Nessa Glam Studio Johannesburg',
      category: 'Bridal Makeup',
      title: 'Elegant Bridal Look'
    },
    {
      id: 2,
      image: 'https://i.ibb.co/93gXT1qY/woman-latino-hair-salon.jpg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      alt: 'Hair installation weave service - Professional hair stylist Johannesburg',
      category: 'Hair Installation',
      title: 'Luxury Hair Weave'
    },
    {
      id: 3,
      image: 'https://i.ibb.co/7tv52sbq/Screenshot-2025-07-23-034757.png?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      alt: 'Glam makeup for special events - Makeup artist South Africa',
      category: 'Glam Makeup',
      title: 'Evening Glam'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/3065210/pexels-photo-3065210.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      alt: 'Natural makeup look - Professional makeup services Johannesburg',
      category: 'Natural Look',
      title: 'Soft Natural Glow'
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      alt: 'Hair closure installation - Best hair stylist Johannesburg',
      category: 'Hair Installation',
      title: 'Closure Installation'
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/3065212/pexels-photo-3065212.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      alt: 'Special occasion makeup - Affordable glam studio Johannesburg',
      category: 'Special Events',
      title: 'Red Carpet Ready'
    }
  ];

  const categories = ['All', 'Bridal Makeup', 'Hair Installation', 'Glam Makeup', 'Natural Look', 'Special Events'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the transformative power of our professional beauty services through our gallery of satisfied clients. 
            Each look is carefully crafted to enhance natural beauty and boost confidence.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative mb-8">
          <div className="relative overflow-hidden rounded-2xl">
            <img 
              src={filteredItems[currentIndex]?.image}
              alt={filteredItems[currentIndex]?.alt}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-sm text-yellow-400 font-medium">{filteredItems[currentIndex]?.category}</div>
              <div className="text-lg font-semibold">{filteredItems[currentIndex]?.title}</div>
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex justify-center mt-4 space-x-2">
            {filteredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-purple-600 w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <img 
                src={item.image}
                alt={item.alt}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-sm text-yellow-400 font-medium mb-1">{item.category}</div>
                <div className="text-lg font-semibold mb-2">{item.title}</div>
                <button className="flex items-center gap-2 text-sm hover:text-yellow-400 transition-colors duration-200">
                  <ExternalLink size={14} />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">Ready for your transformation?</p>
          <button
            onClick={() => window.open('https://wa.me/27810625473?text=Hi! I saw your portfolio and would like to book a consultation at Nessa Glam Studio', '_blank')}
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
          >
            <ExternalLink size={20} />
            Book Your Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;