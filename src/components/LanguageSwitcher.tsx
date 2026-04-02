import { useState, useRef, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';

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
            <img src="/Icons/RU.svg" alt="" style={{ height: 20, width: 'auto' }} className="rounded-[4px] object-contain shrink-0" />
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
            <img src="/Icons/GB.svg" alt="" style={{ height: 20, width: 'auto' }} className="rounded-[4px] object-contain shrink-0" />
            <span className="flex-1 text-left">{locale === 'ru' ? 'Английский' : 'English'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
