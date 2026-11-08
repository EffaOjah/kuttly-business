import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-primary text-white size-14 rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 active:scale-95 transition-all animate-in fade-in zoom-in duration-300 group"
          aria-label="Back to top"
        >
          <span className="material-symbols-outlined text-3xl font-bold group-hover:animate-bounce">
            arrow_upward
          </span>
        </button>
      )}
    </div>
  );
};

export default BackToTop;
