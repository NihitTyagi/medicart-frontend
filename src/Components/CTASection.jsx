import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

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
            Join over 25,000 satisfied customers who trust MediCart with their health needs.
            Get your prescriptions delivered right to your door.
          </p>
          
          {/* CTA buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/signup">
  <button className="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group">
    <span>Create an Account</span>
    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
  </button>
</Link>
            
            <Link to="/login">
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white border-2 border-white border-opacity-50 rounded-lg backdrop-blur-sm hover:bg-white hover:bg-opacity-10 transition-all duration-300">
              Sign In
            </button>
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;