import React from 'react';

const FeaturedProducts = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <p className="text-center text-gray-600 mb-6">Top-selling medications and health products</p>
        <div className="flex overflow-x-auto space-x-4">
          {/* Product Card 1 */}
          <div className="bg-white p-4 rounded shadow-md">
            <img src="/assets/product1.svg" alt="Product 1" className="w-full h-40 object-cover mb-2" />
            <h3 className="text-xl font-bold mb-2">Pain Relief Tablets</h3>
            <p className="text-gray-600 mb-2">Fast-acting pain relief for headaches and body pain</p>
            <p className="text-xl font-bold">$9.99</p>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white p-4 rounded shadow-md">
            <img src="/assets/product2.svg" alt="Product 2" className="w-full h-40 object-cover mb-2" />
            <h3 className="text-xl font-bold mb-2">Vitamin C Supplements</h3>
            <p className="text-gray-600 mb-2">Boost your immunity with daily vitamin C supplements</p>
            <p className="text-xl font-bold">$12.99</p>
          </div>

          {/* Product Card 3 */}
          <div className="bg-white p-4 rounded shadow-md">
            <img src="/assets/product3.svg" alt="Product 3" className="w-full h-40 object-cover mb-2" />
            <h3 className="text-xl font-bold mb-2">Allergy Relief Syrup</h3>
            <p className="text-gray-600 mb-2">24-hour relief from seasonal allergies</p>
            <p className="text-xl font-bold">$14.99</p>
          </div>

          {/* Product Card 4 */}
          <div className="bg-white p-4 rounded shadow-md">
            <img src="/assets/product4.svg" alt="Product 4" className="w-full h-40 object-cover mb-2" />
            <h3 className="text-xl font-bold mb-2">Blood Pressure Monitor</h3>
            <p className="text-gray-600 mb-2">Digital blood pressure monitor for home use</p>
            <p className="text-xl font-bold">$49.99</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;