import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface LightboxState {
  src: string;
  alt: string;
}

interface LightboxContextValue {
  open: (src: string, alt: string) => void;
  close: () => void;
  current: LightboxState | null;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<LightboxState | null>(null);
  const open = useCallback((src: string, alt: string) => setCurrent({ src, alt }), []);
  const close = useCallback(() => setCurrent(null), []);
  return (
    <LightboxContext.Provider value={{ open, close, current }}>
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
  return ctx;
}
