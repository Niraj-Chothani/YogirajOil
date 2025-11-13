import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Login from "@/pages/login";
import Signup from "@/pages/signup";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <Router>
      <Navigation
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <div className="pt-24">
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <h1 className="text-center mt-20 text-2xl text-red-500">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
