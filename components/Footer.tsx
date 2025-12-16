import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const CA = "BambinoSoLAnAContractAddress123456789"; // Placeholder CA

  const handleCopy = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 w-full flex flex-col items-center">

      {/* Social Icons */}
      <div className="flex gap-6 mb-8">
        <a href="#" className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center hover:scale-110 transition-all p-3">
          <img src="/icon sol.png" alt="Solana" className="w-full h-full object-contain" />
        </a>
        <a href="#" className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center hover:scale-110 transition-all p-3">
          <img src="/dex logo.png" alt="DexScreener" className="w-full h-full object-contain" />
        </a>
        <a href="#" className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center hover:scale-110 transition-all p-3">
          <img src="/Icon.png" alt="Icon" className="w-full h-full object-contain" />
        </a>
      </div>

      {/* Contact Address */}
      <div className="flex items-center gap-2 text-slate-700 font-bold bg-white/50 px-4 py-2 rounded-full cursor-pointer hover:bg-white/80 transition-colors" onClick={handleCopy}>
        <span className="text-sm">Copy <span className="text-black">Contact Adress</span> here.</span>
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
      </div>

    </div>
  );
};

export default Footer;