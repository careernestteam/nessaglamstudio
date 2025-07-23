import React from 'react';
import { Award } from 'lucide-react';
import { Scissors, Palette, Crown, Sparkles, Clock, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Scissors,
      title: 'Hair Installation',
      description: 'Professional weaves, closures, frontals, and extensions using premium quality hair.',
      features: ['Virgin Hair Installation', 'Closure & Frontal Application', 'Hair Extensions', 'Protective Styling'],
      price: 'From R800',
      duration: '2-4 hours'
    },
    {
      icon: Palette,
      title: 'Makeup Artistry',
      description: 'Flawless makeup application for all occasions using high-end cosmetic products.',
      features: ['Glam Makeup', 'Natural Look', 'Special Occasions', 'Photography Ready'],
      price: 'From R400',
      duration: '1-2 hours'
    },
    {
      icon: Crown,
      title: 'Bridal Packages',
      description: 'Complete bridal beauty transformation including hair, makeup, and consultation.',
      features: ['Bridal Consultation', 'Trial Session', 'Wedding Day Service', 'Touch-up Kit'],
      price: 'From R2500',
      duration: '4-6 hours'
    },
    {
      icon: Sparkles,
      title: 'Special Events',
      description: 'Glamorous styling for parties, photoshoots, and special celebrations.',
      features: ['Event Styling', 'Group Bookings', 'Photoshoot Ready', 'Custom Looks'],
      price: 'From R600',
      duration: '2-3 hours'
    }
  ];

  const whatsappMessage = (service: string) => {
    return `Hi! I'm interested in booking ${service} at Nessa Glam Studio. Could you please provide more details and available appointment slots?`;
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our range of professional beauty services designed to enhance your natural beauty and boost your confidence. 
            All services are performed by certified professionals using premium products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-800 w-16 h-16 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {service.duration}
                      </div>
                      <div className="text-purple-600 font-semibold">{service.price}</div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <Shield className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => window.open(`https://wa.me/27810625473?text=${encodeURIComponent(whatsappMessage(service.title))}`, '_blank')}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Book {service.title}
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Why Choose Nessa Glam Studio?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Shield className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <h4 className="font-semibold mb-2">Premium Products</h4>
              <p className="text-purple-100 text-sm">We use only high-quality, professional-grade products and premium hair</p>
            </div>
            <div>
              <Award className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <h4 className="font-semibold mb-2">Certified Professionals</h4>
              <p className="text-purple-100 text-sm">Our team consists of licensed and experienced beauty specialists</p>
            </div>
            <div>
              <Clock className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
              <h4 className="font-semibold mb-2">Flexible Scheduling</h4>
              <p className="text-purple-100 text-sm">Convenient appointment times including evenings and weekends</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;