import React from 'react';
import { Link } from 'react-router-dom';





const LandingPage = () => {
  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-6 glass">
        <h1 className="text-2xl font-bold tracking-widest text-blue-400">TODO</h1>
        <div className="space-x-8 font-medium">
          <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
          <Link to="/register" className="bg-blue-600 px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-lg">Register</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-32 text-center px-4">
        <h2 className="text-6xl font-extrabold mb-8 drop-shadow-md">Welcome to Your Day</h2>
        <div className="glass p-10 rounded-3xl max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 border-b border-white/10 pb-2 inline-block">About This App</h3>
          <p className="text-lg text-gray-200 leading-relaxed">
            Our TODO App helps you capture and organize your tasks the moment they occur. 
            Reduce mental clutter and boost productivity by visualizing your day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;