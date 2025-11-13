import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

// 1. Define the types for our user and token
interface User {
  id: string;
  email: string;
  role: string;
}

interface DecodedToken {
  user: User;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

// 2. Create the context
// We use 'undefined' as a default and check it in the hook
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create the Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // On initial load, try to get the token from localStorage
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  useEffect(() => {
    try {
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        
        // Check if token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token is expired, log out
          logout();
        } else {
          // Token is valid, set user and save token
          setUser(decodedToken.user);
          localStorage.setItem("token", token);
        }
      } else {
        // No token, ensure user is null and token is removed
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      logout(); // Clear the bad token
    }
  }, [token]); // This effect runs whenever the 'token' state changes

  // Function to set the token, which triggers the useEffect
  const login = (newToken: string) => {
    setToken(newToken);
  };

  // Function to clear the token, which triggers the useEffect
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Create the custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};