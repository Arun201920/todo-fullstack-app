import React, { useState } from 'react'; // Added useState
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // 1. Create state to store input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 2. Prepare the object to match your Spring Boot "User" model
    const loginData = { email, password };

    try {
      // 3. Call your Spring Boot API
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const user = await response.json(); // This is the User object from Java
        
        // 4. Save the user's name and ID in localStorage
        // This lets the Dashboard say "Hi, [Name]" later
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userId", user.id);

        console.log("Login Successful for:", user.name);
        navigate('/dashboard'); 
      } else {
        const errorMsg = await response.text();
        alert("Login Failed: " + errorMsg);
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Backend server is not running!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="glass p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/30 backdrop-blur-xl bg-white/10 text-white">
        <h2 className="text-4xl font-extrabold mb-2 text-center">Welcome Back</h2>
        <p className="text-blue-200 text-center mb-8 text-sm">Please enter your details to continue</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Email</label>
            <input 
              type="email" 
              value={email} // Controlled input
              onChange={(e) => setEmail(e.target.value)} // Update state
              placeholder="email@example.com" 
              className="w-full p-4 rounded-xl bg-white/5 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500 transition text-white" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Password</label>
            <input 
              type="password" 
              value={password} // Controlled input
              onChange={(e) => setPassword(e.target.value)} // Update state
              placeholder="••••••••" 
              className="w-full p-4 rounded-xl bg-white/5 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500 transition text-white" 
              required 
            />
          </div>

          <button type="submit" className="w-full py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30">
            Login
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-300 text-sm">Don't have an account yet?</p>
          <Link to="/register">
            <button className="mt-2 text-blue-400 font-bold hover:text-blue-300 transition underline underline-offset-4">
              Create new account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;