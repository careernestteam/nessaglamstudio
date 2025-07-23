import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, MessageCircle, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Book Now', href: '#booking' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-purple-100' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-purple-500/50'}`}>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold transition-all duration-500 ${
              isScrolled ? 'text-purple-800' : 'text-white drop-shadow-lg'
            }`}>
              Nessa Glam Studio
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-yellow-400'
                } ${item.name === 'Book Now' ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-purple-500/25 transform hover:scale-110' : 'after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full'}`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Social Links & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <a
              href="https://instagram.com/nessaglamstudio"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 hover:scale-110 ${
                isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-yellow-400'
              } p-2 rounded-full hover:bg-purple-100/20`}
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://wa.me/27810625473?text=Hi! I'd like to book an appointment at Nessa Glam Studio"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 hover:scale-110 ${
                isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-400'
              } p-2 rounded-full hover:bg-green-100/20`}
            >
              <MessageCircle size={22} />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden transition-all duration-300 p-2 rounded-lg hover:bg-purple-100/20 ${
                isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-yellow-400'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl mt-4 py-6 border border-purple-100">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-6 py-3 font-medium transition-all duration-300 hover:bg-purple-50 hover:text-purple-800 hover:translate-x-2 ${
                  item.name === 'Book Now' ? 'text-purple-600 font-bold' : 'text-gray-700'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;