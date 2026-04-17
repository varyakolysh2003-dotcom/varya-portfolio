import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLightbox } from '../context/LightboxContext';

export function Lightbox() {
  const { current, close } = useLightbox();

  useEffect(() => {
    if (!current) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [current]);

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [current, close]);

  if (!current) return null;

  return createPortal(
    <div
      className="lightbox-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
    >
      <button className="lightbox-close" onClick={close} aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <img
        className="lightbox-img"
        src={current.src}
        alt={current.alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  );
}
