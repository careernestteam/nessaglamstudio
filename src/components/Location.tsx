import React from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

const Location = () => {
  const handleGetDirections = () => {
    window.open('https://www.google.com/maps/search/beauty+salon+johannesburg/@-26.2041,28.0473,12z', '_blank');
  };

  return (
    <section id="location" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Visit <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Our Studio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conveniently located in the heart of Johannesburg, our modern studio provides a luxurious and comfortable environment for all your beauty needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="relative">
            <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233678.3583033851!2d27.87441345!3d-26.2041024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg%2C%20South%20Africa!5e0!3m2!1sen!2s!4v1642420420000!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nessa Glam Studio Location - Johannesburg"
                className="w-full h-96 md:h-[450px]"
              ></iframe>
            </div>
            
            {/* Floating Direction Button */}
            <button
              onClick={handleGetDirections}
              className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <Navigation size={16} />
              Get Directions
            </button>
          </div>

          {/* Location Details */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Studio Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nessa Glam Studio<br />
                    123 Beauty Lane<br />
                    Sandton, Johannesburg 2196<br />
                    South Africa
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Details</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Phone: +27 81 062 5473</p>
                    <p>WhatsApp: +27 81 062 5473</p>
                    <p>Email: info@nessaglamstudio.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Opening Hours</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Monday</span>
                        <span className="text-purple-600 font-semibold">09:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Tuesday</span>
                        <span className="text-purple-600 font-semibold">09:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Wednesday</span>
                        <span className="text-purple-600 font-semibold">09:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700">Thursday</span>
                        <span className="text-purple-600 font-semibold">09:00 - 18:00</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Friday</span>
                        <span className="text-purple-600 font-semibold">09:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Saturday</span>
                        <span className="text-purple-600 font-semibold">08:00 - 17:00</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700">Sunday</span>
                        <span className="text-gray-500">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Public Transport */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">How to Find Us</h3>
              <ul className="space-y-2 text-purple-100">
                <li>• 5 minutes walk from Sandton City Shopping Centre</li>
                <li>• Easy access via Gautrain - Sandton Station</li>
                <li>• Parking available on-site</li>
                <li>• Near major taxi routes and bus stops</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;