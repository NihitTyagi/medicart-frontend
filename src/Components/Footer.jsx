import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        {/* Left Section: Logo and Tagline */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-bold">MediCart</h2>
          <p className="text-gray-400 mt-2">
            Your trusted online pharmacy for all your healthcare needs.
          </p>
          {/* Social Media Icons */}
          
        </div>

        {/* Middle Section: Quick Links and Customer Service */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href='#' className="text-gray-400 hover:text-white">Products</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Categories</a></li>
          </ul>
        </div>

        {/* Right Section: Contact Us */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-2">Email: support@medicart.com</p>
          <p className="text-gray-400">Phone: (123) 456-7890</p>
        </div>
      </div>

      {/* Bottom Section: Copyright and Legal Links */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
        <p>© 2025 MediShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;