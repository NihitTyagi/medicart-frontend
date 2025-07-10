import React, { useState ,useEffect } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { UserButton ,useAuth ,useUser} from "@clerk/clerk-react";
import { Link,useLocation,useSearchParams, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
 


  // Sync the input with query param on URL change
  useEffect(() => {
    const queryParam = searchParams.get("query") || "";
    setSearchQuery(queryParam);
  }, [location.search]); // Trigger this whenever the query param changes

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?query=${encodeURIComponent(searchQuery.trim())}`);
      // Don't clear searchQuery if you want it to remain visible after navigating
      setSearchQuery("");
    }
  };


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Orange Accent Bar */}
      <div className="h-1.5 w-full bg-orange-500"></div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-orange-600 rounded-md flex items-center justify-center shadow-md">
              <Link to="/" className="text-white"><span className="text-white font-bold text-xl">M</span></Link>
              
            </div>
            <span className="font-bold text-2xl text-orange-600">MediCart</span>
            
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/products" >
            <span className="font-medium text-orange-600 hover:font-bold">PRODUCTS</span>
            </Link>
            <Link to="/categories" >
              <span className="font-medium text-orange-600 hover:font-bold">CATEGORIES</span>
            </Link>
            <Link to="/ask-doctor" >
              <span className="font-medium text-orange-600 hover:font-bold">Mr.DOC</span>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative mr-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines..."
                className="bg-gray-100 rounded-full text-black py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 w-56 border border-gray-200"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-5">
            {/* Cart Button */}
            <Link to="/cart" className="relative text-black hover:text-orange-600 transition-colors">
  <ShoppingCart className="h-6 w-6 text-black" />
</Link>

            {/* Login Button */}
            {!isSignedIn && (
            <Link to="/login" className="hidden md:block">
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-md transition-colors">
                LOG IN
              </button>
            </Link>
            )}

            {/* User Profile */}
            <div className="hidden md:block">
              <UserButton afterSwitchSessionUrl="/" />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="p-1 md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 mt-3 border-t border-gray-200">
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines..."
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-200"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            </form>
            <div className="flex flex-col space-y-3">
              <Link to="/products" onClick={() => setIsMenuOpen(false)}>
            <span className="font-medium text-orange-600 hover:font-bold">PRODUCTS</span>
            </Link>
            <Link to="/categories" onClick={() => setIsMenuOpen(false)} >
              <span className="font-medium text-orange-600 hover:font-bold">CATEGORIES</span>
            </Link>
            <Link to="/ask-doctor" onClick={() => setIsMenuOpen(false)} >
              <span className="font-medium text-orange-600 hover:font-bold">Mr.DOC</span>
            </Link>

              <div className="pt-3 mt-3 border-t border-gray-200 flex items-center justify-between">
                {!isSignedIn && (
  <Link to="/login" className="block w-full" onClick={() => setIsMenuOpen(false)}>
    <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md w-full transition-colors">
      LOG IN
    </button>
  </Link>
)}

                <div className="ml-4 flex  gap-2.5 " >
                  <UserButton />
                  <p className="text-black font-bold">{user?.fullName}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Orange Accent */}
      <div className="h-1.5 bg-orange-500"></div>
    </nav>
  );
};

export default Navbar;