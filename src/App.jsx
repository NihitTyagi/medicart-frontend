import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ProductsPage from "./Pages/ProductsPage";
import CartPage from "./Pages/CartPage";
import LandingPage from "./Pages/LandingPage";
import CategoriesPage from "./Pages/CategoriesPage";
import AskDoctorPage from "./Pages/AskDoctorPage";
import Footer from "./Components/Footer";
import AdminPanel from "./Pages/AdminPanel";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";




const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<SignupPage/>} />
        <Route path="/signup" element={<LoginPage/>} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/categories" element={<CategoriesPage/>} />
        <Route path="/ask-doctor" element={<AskDoctorPage/>} />
        <Route path="/adminpanel" element={<AdminPanel/>}/>
        {/* <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} /> */}
        <Route
          path="/cart"
          element={
          
              <CartPage />
            
          }
        />
      
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;