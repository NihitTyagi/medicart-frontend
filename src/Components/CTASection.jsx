import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-95"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      {/* Content container */}
      <div className="container relative mx-auto px-6 text-center z-10">
        <div className="max-w-3xl mx-auto">          
          {/* Heading with animated gradient text */}
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
            Start Your Health Journey Today
          </h2>
          
          {/* Subheading */}
          <p className="text-xl text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
            Join over 25,000 satisfied customers who trust MedExpress with their health needs.
            Get your prescriptions delivered right to your door.
          </p>
          
          {/* CTA buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group">
              <span>Create an Account</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white border-2 border-white border-opacity-50 rounded-lg backdrop-blur-sm hover:bg-white hover:bg-opacity-10 transition-all duration-300">
              Sign In
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white border-opacity-20">
            <p className="text-sm font-medium text-white text-opacity-70 mb-4">TRUSTED BY LEADING HEALTHCARE PROVIDERS</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <img src="/api/placeholder/120/40" alt="HealthPlus" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/api/placeholder/120/40" alt="MediCare" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/api/placeholder/120/40" alt="PharmaDirect" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/api/placeholder/120/40" alt="WellnessNow" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter signup */}
      <div className="container relative mx-auto px-6 mt-16 z-10">
        <div className="max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-6 md:mb-0 md:mr-6">
              <h3 className="text-xl font-bold text-white mb-2">Get Health Tips & Exclusive Offers</h3>
              <p className="text-white text-opacity-80">Join our newsletter and receive $10 off your first order</p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex w-full">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white" 
                />
                <button className="bg-indigo-800 hover:bg-indigo-900 text-white px-5 py-3 rounded-r-lg font-medium transition-colors duration-300">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;