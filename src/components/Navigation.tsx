import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext"; // 1. IMPORT useAuth

// 2. REMOVE PROPS (we get auth state from the hook now)
// type NavigationProps = {
//   isAuthenticated: boolean;
//   setIsAuthenticated: (auth: boolean) => void;
// };
// const Navigation = ({ isAuthenticated, setIsAuthenticated }: NavigationProps) => {
const Navigation = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 3. GET AUTH STATE FROM THE HOOK
  const { user, logout } = useAuth();
  const isAuthenticated = !!user; // Convert 'user' object to a true/false boolean

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    // { name: "Contact", path: "/contact" }, // You don't have this page yet
  ];

  // 4. UPDATE handleAuth TO USE THE 'logout' FUNCTION
  const handleAuth = () => {
    if (isAuthenticated) {
      logout(); // Use the logout function from context
      alert("You’ve signed out successfully.");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gold/30"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4 lg:px-6"> {/* Added some padding */}
          {/* Left: Logo */}
          <Link
            to="/"
            className="text-3xl font-display font-bold text-gold tracking-wide hover:text-gold/80 transition-all duration-300"
          >
            Yogiraj Oil
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-semibold text-foreground hover:text-gold transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}

            <Button
              onClick={handleAuth}
              variant="luxury"
              className="px-6 py-2 text-sm font-semibold bg-gold hover:bg-gold/90 text-white shadow-lg transition-all duration-300"
            >
              {isAuthenticated ? "Sign Out" : "Sign In"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-gold transition-colors duration-300"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:hidden bg-white/95 backdrop-blur-xl shadow-lg border-t border-gold/30 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 space-y-4">
                {menuLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-semibold text-foreground hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ))}

                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleAuth();
                  }}
                  variant="luxury"
                  className="px-6 py-2 text-sm font-semibold bg-gold hover:bg-gold/90 text-white shadow-lg transition-all duration-300"
                >
                  {isAuthenticated ? "Sign Out" : "Sign In"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navigation;