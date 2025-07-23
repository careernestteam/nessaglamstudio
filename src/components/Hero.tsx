import React from 'react';
import {
  MessageCircle,
  Star,
  Award,
  Users,
  Sparkles,
  Scissors,
  Palette,
  Crown,
} from 'lucide-react';

const Hero = () => {
  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/27810625473?text=Hi! I\'d like to book an appointment at Nessa Glam Studio for hair installation and makeup services',
      '_blank'
    );
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Professional makeup artist applying makeup - Nessa Glam Studio Johannesburg"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-800/80 to-black/70"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-purple-700/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-300/30 to-yellow-500/30 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Trust Badges */}
          <div className="flex justify-center items-center gap-8 mb-8 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="w-5 h-5 text-yellow-400" />
              <span className="text-white text-sm font-medium">500+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-white text-sm font-medium">5+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white text-sm font-medium">Premium Quality</span>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex justify-center items-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
            <span className="ml-3 text-yellow-400 text-lg font-semibold">5.0 • 500+ Reviews</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
            Transform Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-pulse">
              Beauty
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-purple-200 font-light mt-2">
              with
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">
              Nessa Glam Studio
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-4xl mx-auto leading-relaxed">
            Johannesburg's <span className="text-yellow-400 font-semibold">premier destination</span> for professional hair installation and makeup artistry. 
            Experience luxury beauty services that enhance your natural radiance and boost your confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={handleWhatsAppClick}
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-green-500/25 flex items-center gap-3 min-w-[280px] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <MessageCircle size={24} className="relative z-10 group-hover:animate-bounce" />
              <span className="relative z-10">Book Now on WhatsApp</span>
            </button>
            <button
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-transparent border-3 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-900 px-10 py-5 rounded-full font-bold text-xl transition-all duration-500 min-w-[280px] relative overflow-hidden"
            >
              <span className="group-hover:scale-110 transition-transform duration-300">View Our Transformations</span>
            </button>
          </div>

          {/* Services Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Scissors className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Hair Installation</h3>
              <p className="text-purple-200 text-sm leading-relaxed">Professional weaves, closures, frontals & extensions using premium virgin hair</p>
              <div className="text-yellow-400 font-semibold text-lg mt-3">From R800</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Makeup Artistry</h3>
              <p className="text-purple-200 text-sm leading-relaxed">Flawless glam makeup for all occasions using premium cosmetic brands</p>
              <div className="text-yellow-400 font-semibold text-lg mt-3">From R400</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Bridal Packages</h3>
              <p className="text-purple-200 text-sm leading-relaxed">Complete bridal beauty transformation with trial session included</p>
              <div className="text-yellow-400 font-semibold text-lg mt-3">From R2500</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="w-8 h-12 border-2 border-yellow-400/70 rounded-full flex justify-center hover:border-yellow-400 transition-colors duration-300">
          <div className="w-1.5 h-4 bg-yellow-400/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
