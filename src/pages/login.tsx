import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Demo Auth Logic
    if (email === "admin@yogiraj.com" && password === "123456") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({ email }));
      setIsAuthenticated(true);
      navigate("/"); // redirect to homepage after login
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#FDF6E3] to-[#FDEFC6]">
      <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-[#EBD9A9]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#B8860B] mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Sign in to your Yogiraj Oil Mill account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-[#B8860B] w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-2 border border-[#EBD9A9] rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:outline-none placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-[#B8860B] w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border border-[#EBD9A9] rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:outline-none placeholder-gray-400"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-[#D4AF37] text-white rounded-lg font-semibold text-lg hover:bg-[#C39A2E] transition-all duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Sign Up Button */}
        <button
          onClick={() => navigate("/src/pages/signup.tsx")}
          className="w-full py-2.5 border-2 border-[#D4AF37] text-[#B8860B] rounded-lg font-semibold text-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
        >
          Create New Account
        </button>

        {/* Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Tip: Use <strong>admin@yogiraj.com</strong> / <strong>123456</strong> to log in
        </p>
      </div>
    </div>
  );
};

export default Login;
