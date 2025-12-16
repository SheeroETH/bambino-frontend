import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Generator from './components/Generator';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#E9F9FF] selection:bg-cyan-200 overflow-y-auto overflow-x-hidden pb-12">

      {/* Outer Background Video */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50 blur-sm"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay to darken slightly if needed */}
        <div className="absolute inset-0 bg-[#E9F9FF]/50 mix-blend-overlay"></div>
      </div>

      {/* Navbar sits fixed at the top */}
      <Navbar />

      {/* Main Content Card Container */}
      <div className="relative w-full max-w-7xl mx-auto mt-32 px-4 sm:px-6 lg:px-8">

        {/* The Card Itself */}
        <div className="relative bg-[#E9F9FF] rounded-[32px] border-[6px] border-white overflow-hidden shadow-2xl">

          {/* Background Video (Inside card) - z-0 but comes after abstract designs in DOM to sit on top */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
            >
              <source src="/bg-video.mp4" type="video/mp4" />
            </video>
            {/* Removed black overlay for luminosity */}
          </div>

          {/* Green Grass Bottom Layer - Reduced height to avoid dead space if not needed, or kept as visual anchor */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-300 to-transparent opacity-80 z-0 pointer-events-none"></div>

          {/* Visual Assets (Overlays) */}

          {/* Top Left Group */}
          {/* Vector 1 & 2 - Light Beam Effect */}
          <img
            src="/vector-1.png"
            alt=""
            className="absolute top-0 left-0 w-[40%] max-w-[500px] pointer-events-none z-10 mix-blend-overlay opacity-25"
            style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}
          />
          <img
            src="/vector-2.png"
            alt=""
            className="absolute top-0 left-0 w-[40%] max-w-[500px] pointer-events-none z-10 mix-blend-overlay opacity-25"
            style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}
          />
          {/* Lights Overlay (Keep on top) */}
          <img
            src="/lights-overlay.png"
            alt=""
            className="absolute top-0 left-0 w-[40%] max-w-[500px] pointer-events-none z-10 mix-blend-screen opacity-90"
          />

          {/* Top Center - Lights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] flex justify-center pointer-events-none z-10">
            <img
              src="/lights.png"
              alt=""
              className="w-full h-auto opacity-90 mix-blend-screen"
            />
          </div>

          {/* Top Right Group */}
          {/* Vector 4 & 5 - Light Beam Effect */}
          <img
            src="/vector-4.png"
            alt=""
            className="absolute top-0 right-0 w-[40%] max-w-[500px] pointer-events-none z-10 mix-blend-overlay opacity-25"
            style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}
          />
          <img
            src="/vector-5.png"
            alt=""
            className="absolute top-0 right-0 w-[40%] max-w-[500px] pointer-events-none z-10 mix-blend-overlay opacity-25"
            style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}
          />
          {/* Lights Overlay 1 (Keep on top) */}
          <img
            src="/lights-overlay-1.png"
            alt=""
            className="absolute top-0 right-0 w-[40%] max-w-[500px] pointer-events-none z-10 mix-blend-screen opacity-90"
          />

          {/* Main Content */}
          <main className="relative z-20 flex flex-col items-center w-full justify-start gap-12 pt-6 pb-6">
            <Hero />
            <div id="builder" className="w-full flex justify-center">
              <Generator />
            </div>
            <Footer />
          </main>

        </div>
      </div>

    </div>
  );
};

export default App;