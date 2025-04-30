import React from 'react';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
          Product Categories
        </h1>

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category One */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-800">Category One</h2>
            <p className="text-gray-600 mt-2">
              Description for Category One. This is a placeholder text.
            </p>
          </div>

          {/* Category Two */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-gray-800">Category Two</h2>
            <p className="text-gray-600 mt-2">
              Description for Category Two. This is a placeholder text.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;