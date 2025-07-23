import React, { useState } from 'react';
import {
  Mail,
  Gift,
  Sparkles,
  CheckCircle,
  MessageCircle, // ✅ FIXED: Added this import
} from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-purple-700/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-300/20 to-yellow-500/20 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">VIP Beauty Club</span>
            </h2>
            
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Get exclusive access to beauty tips, special offers, and be the first to know about our latest services and promotions.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Exclusive Offers</h3>
              <p className="text-purple-200 text-sm">Get special discounts and early access to promotions</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Beauty Tips</h3>
              <p className="text-purple-200 text-sm">Professional beauty advice and styling tips</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">First to Know</h3>
              <p className="text-purple-200 text-sm">Be notified about new services and availability</p>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 rounded-full border-2 border-white/30 bg-white/20 text-white placeholder-purple-200 focus:border-yellow-400 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-purple-900 px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
                  >
                    Join VIP Club
                  </button>
                </div>
                
                <p className="text-purple-200 text-sm">
                  By subscribing, you agree to receive beauty tips and promotional emails. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Welcome to the VIP Club! 🎉</h3>
                <p className="text-purple-200">
                  Thank you for subscribing! Check your email for exclusive beauty tips and offers.
                </p>
              </div>
            )}
          </div>

          {/* Additional CTA */}
          <div className="mt-12">
            <p className="text-purple-200 mb-4">Prefer WhatsApp updates?</p>
            <button
              onClick={() =>
                window.open(
                  'https://wa.me/27810625473?text=Hi! I\'d like to join your WhatsApp VIP list for beauty tips and exclusive offers',
                  '_blank'
                )
              }
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <MessageCircle size={20} />
              Join WhatsApp VIP List
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
