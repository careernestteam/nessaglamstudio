import React from 'react';
import { MessageCircle } from 'lucide-react';

import { Instagram, ExternalLink, Heart, MessageCircle as Comment } from 'lucide-react';

const InstagramFeed = () => {
  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      alt: 'Bridal makeup transformation - Nessa Glam Studio',
      likes: 234,
      comments: 18,
      caption: 'Bridal glam perfection ✨ Another beautiful bride ready for her special day! 👰💕'
    },
    {
      id: 2,
      image: 'https://i.ibb.co/jvWyHCm3/side-view-smiley-woman-with-afro-hair.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      alt: 'Hair installation service - Professional weave',
      likes: 189,
      comments: 12,
      caption: 'Flawless hair installation using premium virgin hair 💁‍♀️ Book your transformation today!'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/3065204/pexels-photo-3065204.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      alt: 'Glam makeup for special events',
      likes: 156,
      comments: 9,
      caption: 'Evening glam that turns heads ✨ Ready for any special occasion 💄'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      alt: 'Natural makeup look - Soft glam',
      likes: 201,
      comments: 15,
      caption: 'Soft natural glam that enhances your natural beauty 🌟 Perfect for everyday elegance'
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/3065212/pexels-photo-3065212.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      alt: 'Hair closure installation - Professional styling',
      likes: 178,
      comments: 11,
      caption: 'Seamless closure installation for that natural hairline 💫 Book your appointment now!'
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/3065210/pexels-photo-3065210.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      alt: 'Special occasion makeup - Red carpet ready',
      likes: 267,
      comments: 22,
      caption: 'Red carpet ready! ✨ When you need to make a statement 💋 #GlamGoals'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Follow Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Journey</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Stay updated with our latest transformations, beauty tips, and behind-the-scenes moments. 
            Join our Instagram community for daily inspiration and exclusive content.
          </p>
          <a
            href="https://instagram.com/nessaglamstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Instagram size={20} />
            Follow @nessaglamstudio
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {instagramPosts.map((post) => (
            <div 
              key={post.id}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => window.open('https://instagram.com/nessaglamstudio', '_blank')}
            >
              <img 
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Instagram Icon */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="w-4 h-4 text-white" />
              </div>
              
              {/* Engagement Stats */}
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Comment className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Get Beauty Tips & Exclusive Offers</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Follow us on Instagram for daily beauty inspiration, transformation reveals, and special promotions for our followers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://instagram.com/nessaglamstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Instagram size={20} />
              Follow on Instagram
            </a>
            <button
              onClick={() => window.open('https://wa.me/27810625473?text=Hi! I\'d like to join your WhatsApp updates for beauty tips and offers', '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <MessageCircle size={20} />
              Join WhatsApp Updates
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;