import { Link } from 'lucide-react';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-orange-100 py-20 lg:py-24">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-orange-300 opacity-20"></div>
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 rounded-full bg-orange-200 opacity-30"></div>
      <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-orange-400 opacity-20"></div>
      <div className="absolute bottom-1/4 right-1/3 w-12 h-12 rounded-full bg-orange-500 opacity-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 z-10">
            <div className="inline-block mb-6 px-4 py-1 bg-orange-100 rounded-full">
              <span className="text-orange-600 font-medium">Trusted by 50,000+ customers</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Your Health <span className="text-orange-500">Matters</span> To Us
            </h1>
            
            <p className="text-xl leading-relaxed text-gray-700 mb-8 max-w-lg">
              Order your medications online and enjoy fast, secure delivery with 24/7 pharmacist support, right to your door.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white hover:bg-orange-50 text-orange-500 border border-orange-200 font-medium rounded-lg transition-all duration-300">
              Shop Now
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 pt-6 border-t border-orange-200">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex items-center">
                  
                  <span className="ml-4 text-gray-600">Trusted by thousands</span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-gray-600">4.9/5 from 2,540+ reviews</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image with decorative elements */}
          <div className="w-full lg:w-1/2 relative">
            {/* Shadow blob */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-4/5 h-16 bg-orange-200 filter blur-2xl opacity-70 rounded-full"></div>
            
            {/* Main hero image with floating elements */}
            <div className="relative rounded-2xl bg-white shadow-xl p-2 z-10">
              <img
                src="/api/placeholder/600/500"
                alt="Online Pharmacy Service"
                className="w-full h-full object-cover rounded-xl"
              />
              
              {/* Floating card elements */}
              <div className="absolute -left-6 top-1/4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Delivery Time</p>
                    <p className="font-bold text-gray-800">24-48 Hours</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-6 bottom-1/4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Verified Products</p>
                    <p className="font-bold text-gray-800">100% Genuine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;