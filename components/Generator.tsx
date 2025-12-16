import React, { useState } from 'react';
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
      {generatedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-in fade-in duration-300"
          onClick={closeOverlay}
        >
          <div
            className="relative bg-transparent p-4 outline-none"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image container
          >
            {/* Image Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-[90vw] max-h-[80vh]">
              <img
                src={generatedImage}
                alt="Generated Bambino"
                className="w-full h-full object-contain max-h-[70vh] rounded-lg"
              />

              {/* Download Button Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <a
                  href={generatedImage}
                  download={`bambino-${Date.now()}.png`}
                  className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
                  onClick={(e) => e.stopPropagation()} // Allow download click
                >
                  <Download className="w-4 h-4" /> Save Image
                </a>
              </div>
            </div>

            <p className="text-white/80 text-center mt-4 font-medium text-sm">Click outside to close</p>
          </div>
        </div>
      )}
    </>
  );
};
export default Generator;