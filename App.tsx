
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ChatInterface } from './components/ChatInterface';
import { ImageGenerator } from './components/ImageGenerator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'image'>('chat');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <Hero />

        <div className="mt-12">
          <div className="flex space-x-4 mb-8 justify-center">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'chat'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Intelligence Chat
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'image'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Creative Studio
            </button>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'chat' ? <ChatInterface /> : <ImageGenerator />}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Aura AI. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
