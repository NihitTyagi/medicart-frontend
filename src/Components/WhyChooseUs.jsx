import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      title: "Genuine Medicines",
      description: "All our products are sourced from authorized distributors and manufacturers with quality guarantee.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Fast Delivery",
      description: "Get your medications delivered to your doorstep within 24-48 hours with real-time tracking.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "24/7 Support", 
      description: "Our licensed pharmacists are available round the clock to assist you with any questions or concerns.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-20 bg-orange-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 font-medium text-sm mb-4">WHY PEOPLE TRUST US</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">We're Different From The Others</h2>
          <p className="text-xl text-gray-600">
            Our dedicated team of healthcare professionals ensures you receive the best service for all your health needs.
          </p>
        </div>
        
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Card decoration */}
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-orange-400 to-orange-600"></div>
              
              {/* Icon with bg */}
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mb-8">{feature.description}</p>
          
              
              {/* Decoration circle */}
              <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-all duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Stats section */}
        <div className="mt-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50k+</div>
              <div className="text-orange-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
              <div className="text-orange-100">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">24hr</div>
              <div className="text-orange-100">Delivery Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-orange-100">Years Experience</div>
            </div>
          </div>
        </div>
        
        
      </div>
    </section>
  );
};

export default WhyChooseUs;