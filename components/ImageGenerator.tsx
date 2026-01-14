
import React, { useState } from 'react';
import { generateImage } from '../services/gemini';
import { GeneratedImage } from '../types';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<GeneratedImage[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    const currentPrompt = prompt.trim();
    setIsGenerating(true);

    try {
      const imageUrl = await generateImage(currentPrompt);
      if (imageUrl) {
        setHistory(prev => [{
          url: imageUrl,
          prompt: currentPrompt,
          timestamp: Date.now()
        }, ...prev]);
        setPrompt('');
      } else {
        alert("Failed to generate image. Please try a different prompt.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="glass rounded-3xl p-8 shadow-2xl max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-center">Studio Visualization</h3>
        <p className="text-slate-400 text-center mb-8">Describe what you want to see, and Aura will bring it to life.</p>
        
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A cyberpunk city in the style of Van Gogh..."
            className="flex-grow bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-200"
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all disabled:opacity-50 whitespace-nowrap shadow-lg shadow-indigo-600/20"
          >
            {isGenerating ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating...</span>
              </span>
            ) : "Generate"}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((img) => (
          <div key={img.timestamp} className="group relative glass rounded-2xl overflow-hidden aspect-square transition-transform hover:scale-[1.02]">
            <img src={img.url} alt={img.prompt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
              <p className="text-sm font-medium text-white line-clamp-2">{img.prompt}</p>
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = img.url;
                  link.download = `aura-gen-${img.timestamp}.png`;
                  link.click();
                }}
                className="mt-3 text-xs text-indigo-400 font-bold uppercase tracking-wider hover:text-indigo-300"
              >
                Download PNG
              </button>
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="glass rounded-2xl aspect-square flex flex-col items-center justify-center space-y-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            <span className="text-slate-500 text-sm font-medium">Neural Rendering...</span>
          </div>
        )}
      </div>

      {history.length === 0 && !isGenerating && (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-slate-500">Your creative journey begins here. Try generating your first image.</p>
        </div>
      )}
    </div>
  );
};
