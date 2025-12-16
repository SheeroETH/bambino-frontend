import React from 'react';
import { Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 relative z-10">

      {/* Small Badge */}
      <div className="bg-white rounded-full px-4 py-1.5 shadow-md mb-6 flex items-center gap-2 hover:animate-none cursor-default transition-all border border-blue-100">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-white">
            <img src="/1%20logo.png" alt="Logo 1" className="w-full h-full object-cover" />
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-white">
            <img src="/2%20logo.png" alt="Logo 2" className="w-full h-full object-cover" />
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-white">
            <img src="/3%20logo.png" alt="Logo 3" className="w-full h-full object-cover" />
          </div>
        </div>
        <span className="text-gray-700 font-medium text-sm">Become a holder</span>
      </div>

      {/* Main Title Logo - CSS trickery to mimic the thick font style */}
      <h1 className="font-logo text-[120px] sm:text-[160px] leading-none text-[#001f3f] select-none drop-shadow-xl transform hover:scale-105 transition-transform duration-300">
        Bambino
      </h1>

      <p className="text-slate-700 font-medium text-sm sm:text-lg max-w-lg mx-auto drop-shadow-sm">
        Official website of <span className="font-extrabold">$BAMBINO</span> tokenized on Solana.
      </p>
    </div>
  );
};

export default Hero;