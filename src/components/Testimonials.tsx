import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Thandiwe Mthembu',
      location: 'Sandton, Johannesburg',
      service: 'Bridal Package',
      rating: 5,
      text: 'Nessa Glam Studio made my wedding day absolutely perfect! The hair installation was flawless and my makeup lasted the entire day. The team was professional, friendly, and truly understood my vision. Best bridal makeup artist in Johannesburg!',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'Nomsa Radebe',
      location: 'Rosebank, Johannesburg',
      service: 'Hair Installation',
      rating: 5,
      text: 'I have been coming to Nessa Glam Studio for over a year now and I am never disappointed. The hair installation services are top-notch and affordable. My closure always looks natural and lasts for weeks. Highly recommend!',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Lerato Molefe',
      location: 'Soweto, Johannesburg',
      service: 'Makeup & Hair',
      rating: 5,
      text: 'Amazing service! I needed glam makeup for a photoshoot and Nessa delivered beyond my expectations. The makeup was camera-ready and the hair styling was perfection. Will definitely be back for more services.',
      image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 4,
      name: 'Busisiwe Dlamini',
      location: 'Randburg, Johannesburg',
      service: 'Special Event Makeup',
      rating: 5,
      text: 'Professional, skilled, and so creative! Nessa transformed my look for my graduation ceremony. The attention to detail was incredible and the makeup enhanced my features beautifully. Such an affordable glam studio with premium results!',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Clients Say</span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients across Johannesburg have to say about their transformative experience at Nessa Glam Studio.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-6 right-6 w-12 h-12 text-purple-200" />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Client Image */}
              <div className="flex-shrink-0">
                <img 
                  src={testimonials[currentIndex].image}
                  alt={`${testimonials[currentIndex].name} - Happy client at Nessa Glam Studio`}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Stars */}
                <div className="flex justify-center md:justify-start items-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Client Info */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-purple-600 font-medium">{testimonials[currentIndex].location}</p>
                  <p className="text-sm text-gray-500">{testimonials[currentIndex].service}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-purple-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-yellow-400 w-8' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
            <div className="text-purple-100">Happy Clients</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">5.0</div>
            <div className="text-purple-100">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">100%</div>
            <div className="text-purple-100">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;