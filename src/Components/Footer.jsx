import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        {/* Left Section: Logo and Tagline */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-bold">MediShop</h2>
          <p className="text-gray-400 mt-2">
            Your trusted online pharmacy for all your healthcare needs.
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M7.5 21.75c1.066 0 2.117-.164 3.118-.473 1.213-.346 2.362-1.023 3.31-2.055A9.523 9.523 0 0023.98 15a9.971 9.971 0 00-2.535-.346 9.525 9.525 0 00-1.065.094c-.24 0-.477.02-.71.055C13.925 13.902 12.683 15.11 10.918 16.053a9.534 9.534 0 01-3.032 0 9.763 9.763 0 01-1.05-2.05 9.96 9.96 0 012.018-3.991A9.775 9.775 0 017.5 7.73c1.03.023 2.048.17 3.034.39C13.485 9.273 14.71 10.01 15.76 10.93a9.534 9.534 0 002.033 0 9.765 9.765 0 001.05-2.05 9.96 9.96 0 00-2.018-3.99A9.775 9.775 0 007.5 2.27c-1.03.023-2.048.17-3.034.39C2.515 3.727 1.273 4.46 0.24 5.38a9.534 9.534 0 01-2.033 0 9.765 9.765 0 01-1.05 2.05 9.96 9.96 0 012.018 3.99A9.775 9.775 0 017.5 14.27c1.03.023 2.048.17 3.034.39z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M24 4.557c-.883.389-1.832.654-2.828.775 1.01-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.69 8.713 4.702 8.388 2.156 8.365c-2.772-.021-6.31-1.391-8.478-5.168-.06-.58-.674-1.055-1.44-1.055-.609 0-1.076.381-1.076 1.039 0 .718.56 1.36 1.32 1.636l.003.001h.001C2.09.86 2.71 1 3.47 1c1.076 0 2.003.7 2.003 2.203 0 1.448-.675 2.538-1.868 3.328-.123.1-.243.177-.367.209v.003c0 .215.14.41.555.41h.001c.476 0 .957-.34.957-.796v-.002C6.426 4.25 4.37 4.557 2.645 4.557C1.732 4.557 1 5.28 1 6.177v.055c0 .897.719 1.607 1.732 1.607h.001c.92 0 1.47-.694 1.47-1.57V6.177c0-.39-.274-.734-.635-.846-.137-.027-.27-.042-.404-.042-.135 0-.267.015-.404.042-.361.113-.635.457-.635.846V8.006c0 .886.55 1.57 1.469 1.57H17.5v-.003c.918 0 1.73-.7 1.73-1.607v-.001h.001c.476 0 .957.34.957.796v.002c0 .39-.14.694-.635.846-.137.027-.27.042-.404.042-.135 0-.267-.015-.404-.042-.361-.113-.635-.457-.635-.846V6.177c0-.897.719-1.607 1.732-1.607h.001c.92 0 1.47.694 1.47 1.57V8.006c0 .886-.55 1.57-1.469 1.57H22V6.177c0-.897-.719-1.607-1.732-1.607zm-8.943 1.607c-.476 0-.957.34-.957.796v.003c0 .446.484.796.957.796s.957-.35.957-.796v-.003c0-.446-.484-.796-.957-.796z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 6a6 6 0 10-12 0 6 6 0 0012 0zm-2-8a4 4 0 11-8 0 4 4 0 008 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Middle Section: Quick Links and Customer Service */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Products</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Categories</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">My Account</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Order Tracking</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Returns & Refunds</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Right Section: Contact Us */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-2">123 Health Street, Medical District</p>
          <p className="text-gray-400 mb-2">City, State 12345</p>
          <p className="text-gray-400 mb-2">Email: support@medishop.com</p>
          <p className="text-gray-400">Phone: (123) 456-7890</p>
        </div>
      </div>

      {/* Bottom Section: Copyright and Legal Links */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
        <p>© 2025 MediShop. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;