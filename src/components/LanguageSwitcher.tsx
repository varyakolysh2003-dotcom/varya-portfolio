import { useState, useRef, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';

/** Inlined flag SVGs — rendered as JSX so they are part of the JS bundle
 *  and paint immediately when the dropdown opens (no network fetch). */
function FlagRU() {
  return (
    <svg width="20" height="14" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 3, flexShrink: 0 }}>
      <clipPath id="ru-clip"><rect width="32" height="21" fill="white" /></clipPath>
      <g clipPath="url(#ru-clip)">
        <path d="M0 -0.000488281V20.9994H32V-0.000488281H0Z" fill="white"/>
        <path d="M0 0H32V21.0002H0V0Z" fill="#0052B4"/>
        <path d="M0 0H32V6.99984H0V0Z" fill="white"/>
        <path d="M0 13.9995H32V20.9993H0V13.9995Z" fill="#D80027"/>
      </g>
    </svg>
  );
}

function FlagGB() {
  return (
    <svg width="20" height="14" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 3, flexShrink: 0 }}>
      <clipPath id="gb-clip"><rect width="32" height="21" fill="white" /></clipPath>
      <g clipPath="url(#gb-clip)">
        <path d="M0 0H32V21.0002H0V0Z" fill="white"/>
        <path d="M18 0H14V8.53122H0V12.4687H14V20.9999H18V12.4687H32V8.53122H18V0Z" fill="#D80027"/>
        <path d="M24.6116 14.1519L32 18.1925V14.1519H24.6116ZM19.4783 14.1519L32 20.9997V19.0633L23.0192 14.1519H19.4783ZM28.6646 20.9997L19.4783 15.9754V20.9997H28.6646Z" fill="#0052B4"/>
        <path d="M19.4783 14.1519L32 20.9997V19.0633L23.0192 14.1519H19.4783Z" fill="#D80027"/>
        <path d="M5.64631 14.1519L0 17.2397V14.1519H5.64631ZM12.5218 15.0227V20.9997H1.59319L12.5218 15.0227Z" fill="#0052B4"/>
        <path d="M8.98081 14.1519L0 19.0633V20.9997L12.5218 14.1519H8.98081Z" fill="#D80027"/>
        <path d="M7.38844 6.84781L0 2.80719V6.84781H7.38844ZM12.5218 6.84781L0 0V1.93639L8.98081 6.84781H12.5218ZM3.33537 0L12.5218 5.02425V0H3.33537Z" fill="#0052B4"/>
        <path d="M12.5218 6.84781L0 0V1.93639L8.98081 6.84781H12.5218Z" fill="#D80027"/>
        <path d="M26.3537 6.84787L32 3.76001V6.84787H26.3537ZM19.4783 5.97707V0H30.4068L19.4783 5.97707Z" fill="#0052B4"/>
        <path d="M23.0192 6.84781L32 1.93639V0L19.4783 6.84781H23.0192Z" fill="#D80027"/>
      </g>
    </svg>
  );
}

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={className ?? 'relative shrink-0'} ref={langRef}>
      <button
        type="button"
        onClick={() => setLangOpen(!langOpen)}
        className="inline-flex items-center justify-center w-[36px] h-[36px] rounded-[10px] lg:w-[44px] lg:h-[44px] lg:rounded-[14px] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
        aria-label={locale === 'ru' ? 'Переключить язык' : 'Switch language'}
      >
        <span className="font-medium text-[13px] lg:text-[16px] text-[rgba(0,0,0,0.4)]">
          {locale === 'ru' ? 'RU' : 'EN'}
        </span>
      </button>

      {langOpen && (
        <div
          style={{ padding: '12px' }}
          className="dropdown-enter absolute top-full right-0 mt-2 flex flex-col gap-[8px] bg-white rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] z-50 min-w-[170px] box-border"
        >
          <button
            type="button"
            onClick={() => {
              setLocale('ru');
              setLangOpen(false);
            }}
            className={`flex items-center gap-2 w-full min-w-0 px-3 py-2 rounded-[10px] text-[13px] transition-colors duration-100 hover:bg-[var(--color-bg)] ${locale === 'ru' ? 'font-medium' : ''}`}
          >
            <FlagRU />
            <span className="flex-1 text-left">{locale === 'ru' ? 'Русский' : 'Russian'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setLocale('en');
              setLangOpen(false);
            }}
            className={`flex items-center gap-2 w-full min-w-0 px-3 py-2 rounded-[10px] text-[13px] transition-colors duration-100 hover:bg-[var(--color-bg)] ${locale === 'en' ? 'font-medium' : ''}`}
          >
            <FlagGB />
            <span className="flex-1 text-left">{locale === 'ru' ? 'Английский' : 'English'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
