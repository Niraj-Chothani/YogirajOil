import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // Import useAuth
import axios from "axios";

// Use the same API URL logic as your Login page
const API_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null); // For errors
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // ✅ Real Signup Logic for a "normal user"
      const res = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        // We do NOT send a role, so it defaults to "user"
      });

      // Auto-login the user with the token from the backend
      login(res.data.token);

      navigate("/"); // Redirect to homepage after signup
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed. Please try again.";
      setError(message);
      alert(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#FDF6E3] to-[#FDEFC6]">
      <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-[#EBD9A9]">
        <h2 className="text-3xl font-bold text-center text-[#B8860B] mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-[#EBD9A9] rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (min 6 chars)"
              className="w-full px-4 py-2 border border-[#EBD9A9] rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-4 py-2 border border-[#EBD9A9] rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center text-red-600 text-sm">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-[#D4AF37] text-white rounded-lg font-semibold text-lg hover:bg-[#C39A2E] transition-all duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#B8860B] font-medium cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;