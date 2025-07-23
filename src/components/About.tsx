import React from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: Award, number: '5+', label: 'Years Experience' },
    { icon: Clock, number: '1000+', label: 'Services Completed' },
    { icon: Heart, number: '100%', label: 'Satisfaction Rate' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Nessa Glam Studio</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Welcome to Nessa Glam Studio, Johannesburg's premier destination for professional hair installation and makeup artistry. 
              Located in the heart of South Africa's vibrant beauty scene, we specialize in transforming your natural beauty into 
              stunning, confidence-boosting looks.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our expert team combines years of experience with the latest techniques in hair installation and makeup application. 
              Whether you're preparing for your wedding day, a special event, or simply want to treat yourself to a glamorous makeover, 
              we're dedicated to delivering exceptional results that exceed your expectations.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-purple-100">
                To empower every client with confidence through exceptional beauty services, 
                making luxury accessible and creating unforgettable transformations in Johannesburg's beauty landscape.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Professional makeup artist at work - Nessa Glam Studio team"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Certified Professional</div>
                  <div className="text-sm text-gray-600">Licensed Beauty Specialist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;