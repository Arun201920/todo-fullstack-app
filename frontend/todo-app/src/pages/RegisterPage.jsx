import React, { useState } from 'react'; // Added useState
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  // 1. Initialize state for the three form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // 2. Prepare data to match your Spring Boot "User" Entity
    const newUser = { name, email, password };

    try {
      // 3. Call your Spring Boot registration endpoint
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("Registration Successful");
        // 4. On success, navigate to the login page as requested
        navigate('/login'); 
      } else {
        const errorMessage = await response.text();
        alert("Registration failed: " + errorMessage);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Could not connect to the backend server.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white">
      <div className="glass p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/30 backdrop-blur-xl bg-white/10">
        <h2 className="text-4xl font-extrabold mb-2 text-center">Join Us</h2>
        <p className="text-blue-200 text-center mb-8 text-sm">Create your account to start tracking tasks</p>
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name" 
              className="w-full p-4 rounded-xl bg-white/5 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500 transition text-white" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com" 
              className="w-full p-4 rounded-xl bg-white/5 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500 transition text-white" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full p-4 rounded-xl bg-white/5 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500 transition text-white" 
              required 
            />
          </div>

          <button type="submit" className="w-full py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30">
            Register Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-300 text-sm">Already a user?</p>
          <Link to="/login">
            <button className="mt-2 text-blue-400 font-bold hover:text-blue-300 transition underline decoration-2 underline-offset-4">
              Login to your account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;