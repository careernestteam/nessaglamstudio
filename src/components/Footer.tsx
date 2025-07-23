import React from 'react';
import { Instagram, MessageCircle, Mail, Phone, MapPin, Clock, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Book Now', href: '#booking' }
  ];

  const services = [
    'Hair Installation Johannesburg',
    'Makeup Artist South Africa',
    'Bridal Makeup Johannesburg',
    'Hair Extensions',
    'Glam Makeup',
    'Special Event Styling'
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Nessa Glam Studio
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Johannesburg's premier destination for professional hair installation and makeup artistry. 
              Transforming beauty with luxury services and exceptional care.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/nessaglamstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/27810625473"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-green-600 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="mailto:info@nessaglamstudio.com"
                className="bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <div className="text-gray-300 text-sm">
                  123 Beauty Lane<br />
                  Sandton, Johannesburg 2196<br />
                  South Africa
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300 text-sm">+27 81 062 5473</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300 text-sm">info@nessaglamstudio.com</span>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <div className="text-gray-300 text-sm">
                  Mon-Fri: 09:00 - 18:00<br />
                  Sat: 08:00 - 17:00<br />
                  Sun: Closed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Footer Content */}
      <div className="bg-black/50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h5 className="text-lg font-semibold text-yellow-400 mb-2">
              Professional Beauty Services in Johannesburg, South Africa
            </h5>
            <p className="text-gray-400 text-sm max-w-4xl mx-auto">
              Nessa Glam Studio is your premier destination for hair installation, makeup artistry, and bridal beauty services in Johannesburg. 
              We specialize in professional weaves, closures, frontals, glam makeup, and complete bridal packages. 
              Serving clients across Sandton, Rosebank, Randburg, Soweto, and greater Johannesburg area. 
              Affordable luxury beauty services with exceptional results. Book your transformation today!
            </p>
          </div>
          
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">
              Keywords: Hair Installation Johannesburg | Makeup Artist South Africa | Bridal Makeup Johannesburg | 
              Affordable Glam Studio | Professional Beauty Services | Hair Extensions | Weave Installation | 
              Closure Application | Makeup Artistry | Special Event Styling
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Nessa Glam Studio. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for beautiful transformations
            </p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/27810625473?text=Hi! I'd like to book an appointment at Nessa Glam Studio"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110 z-50 animate-pulse"
      >
        <MessageCircle size={28} />
      </a>
    </footer>
  );
};

export default Footer;