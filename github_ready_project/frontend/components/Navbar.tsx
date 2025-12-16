import React, { useState, useRef, useEffect, useMemo } from 'react';

type NavItem = {
  label: string;
  id: string;
  isSpecial?: boolean;
};

const Navbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const items: NavItem[] = useMemo(() => [
    { label: 'Buy $BAMBINO', id: 'buy', isSpecial: true },
    { label: 'Community', id: 'community' },
    { label: 'DexScreener', id: 'dex' },
    { label: 'Testimonials', id: 'testimonials' },
  ], []);

  useEffect(() => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
    const targetElement = itemsRef.current[targetIndex];

    if (targetElement) {
      setPillStyle({
        left: targetElement.offsetLeft,
        width: targetElement.offsetWidth,
      });
    }
  }, [activeIndex, hoveredIndex]);

  const handleItemClick = (index: number, id: string) => {
    setActiveIndex(index);

    if (id === 'builder') {
      const element = document.getElementById('builder');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'buy') {
      // Assuming Buy takes you to the builder for now, or we could scroll top.
      // Let's scroll to builder as it's the main interactive part
      const element = document.getElementById('builder');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'community') {
      // Placeholder
      console.log("Navigate to Community");
    }
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg flex items-center border border-blue-100 relative">

        {/* Sliding Pill */}
        <div
          className={`absolute rounded-full transition-all duration-300 ease-out shadow-md ${hoveredIndex !== null ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-[#00B4D8]'
            }`}
          style={{
            left: pillStyle.left,
            width: pillStyle.width,
            height: 'calc(100% - 16px)', // Adjust calculation based on padding
            top: '8px',
            opacity: 1, // Always visible eventually, or maybe only when initialized?
          }}
        />

        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => { itemsRef.current[index] = el }}
            onClick={() => handleItemClick(index, item.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`
              relative z-10 px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 whitespace-nowrap
              ${(hoveredIndex === index || (hoveredIndex === null && activeIndex === index)) ? 'text-white' : 'text-gray-600 hover:text-gray-800'}
            `}
          >
            {item.isSpecial ? (
              <>Buy <span className="font-extrabold">$BAMBINO</span></>
            ) : (
              item.label
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;