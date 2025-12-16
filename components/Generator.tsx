import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Loader2, Download } from 'lucide-react';
import { generateBambinoImage } from '../services/gemini';
import { GenerationStatus } from '../types';

const Generator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setStatus(GenerationStatus.LOADING);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateBambinoImage(prompt);
      setGeneratedImage(imageUrl);
      setStatus(GenerationStatus.SUCCESS);
    } catch (e) {
      setStatus(GenerationStatus.ERROR);
    }
  };

  const closeOverlay = () => {
    setGeneratedImage(null);
    setStatus(GenerationStatus.IDLE);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto px-4 relative z-20">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/50">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">
              Create your own <span className="font-black">$BAMBINO</span>
            </h2>
            <p className="text-slate-500 font-light text-lg">
              Generate your Bambino the way you imagine it.
            </p>
          </div>

          {/* Input Area */}
          <div className="flex flex-col sm:flex-row gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 shadow-inner">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write your prompt (e.g. 'wearing a astronaut suit')"
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-slate-700 placeholder-slate-400 font-medium"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={status === GenerationStatus.LOADING || !prompt.trim()}
              className={`
                rounded-xl px-8 py-3 font-bold text-white shadow-lg transition-all
                ${status === GenerationStatus.LOADING
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-[#00B4D8] hover:bg-[#0096B4] hover:scale-105 active:scale-95'
                }
              `}
            >
              {status === GenerationStatus.LOADING ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Generate'
              )}
            </button>
          </div>

          {/* Error Message */}
          <div className="w-full">
            {status === GenerationStatus.ERROR && (
              <div className="mt-6 p-4 bg-red-50 text-red-500 rounded-xl text-center font-bold text-sm">
                Oops! Something went wrong. Try again.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Generated Image Overlay */}
      {generatedImage && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md animate-in fade-in duration-300"
          onClick={closeOverlay}
        >
          <div
            className="relative bg-transparent p-4 outline-none flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the content
          >
            {/* Image Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-[90vw] max-h-[60vh]">
              <img
                src={generatedImage}
                alt="Generated Bambino"
                className="w-full h-full object-contain max-h-[60vh] rounded-lg"
              />
            </div>

            {/* Download Button */}
            <button
              onClick={async (e) => {
                e.stopPropagation();
                if (!generatedImage) return;

                try {
                  const response = await fetch(generatedImage);
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `bambino-${Date.now()}.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(url);
                } catch (error) {
                  console.error('Download failed:', error);
                  // Fallback if fetch fails (e.g. CORS), though standard browser fetch usually works for images
                  window.open(generatedImage, '_blank');
                }
              }}
              className="px-8 py-3 rounded-full font-extrabold text-white shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform flex items-center gap-2 text-lg cursor-pointer"
            >
              <Download className="w-5 h-5" /> Download Bambino
            </button>

            <p className="text-white/80 font-medium text-sm">Click outside to close</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
export default Generator;