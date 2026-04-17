import { useEffect, useState, useRef, useCallback } from 'react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const scrollingUp = currentY < lastScrollY.current;
    const pastThreshold = currentY > 300;

    setVisible(scrollingUp && pastThreshold);
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const PRESS_T   = 'opacity 250ms ease, transform 120ms ease-in';
  const RELEASE_T = 'opacity 250ms ease, transform 240ms cubic-bezier(0.34, 1.3, 0.64, 1)';

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="scroll-to-top-btn"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.8)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onPointerDown={(e) => { const el = e.currentTarget; el.style.transition = PRESS_T;   el.style.transform = 'scale(0.93)'; }}
      onPointerUp={(e)   => { const el = e.currentTarget; el.style.transition = RELEASE_T; el.style.transform = 'scale(1)'; }}
      onPointerLeave={(e) => { const el = e.currentTarget; el.style.transition = RELEASE_T; el.style.transform = 'scale(1)'; }}
      onPointerCancel={(e) => { const el = e.currentTarget; el.style.transition = RELEASE_T; el.style.transform = 'scale(1)'; }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
