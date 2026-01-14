
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white">
            A
          </div>
          <span className="text-xl font-bold tracking-tight">Aura<span className="text-blue-400">AI</span></span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};
