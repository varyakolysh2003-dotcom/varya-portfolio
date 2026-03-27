import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cases } from '../data/cases';
import { useLocale } from '../context/LocaleContext';

const LEGACY_CASE_SLUG: Record<string, string> = {
  tbank: 't-bank',
  'tbank-installment': 't-bank',
};

const TITLE_HOME = { ru: 'Колыш Варвара — Портфолио', en: 'Varvara Kolysh — Portfolio' } as const;
const NAME_SHORT = { ru: 'Колыш Варвара', en: 'Varvara Kolysh' } as const;

export function DocumentLocale() {
  const { pathname } = useLocation();
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'ru';
  }, [locale]);

  useEffect(() => {
    if (pathname === '/') {
      document.title = TITLE_HOME[locale];
      return;
    }

    const m = /^\/cases\/([^/]+)\/?$/.exec(pathname);
    if (m) {
      const resolvedId = LEGACY_CASE_SLUG[m[1]] ?? m[1];
      const cs = cases.find((c) => c.id === resolvedId);
      if (cs) {
        document.title = `${cs.title[locale]} — ${NAME_SHORT[locale]}`;
      } else {
        document.title =
          locale === 'en' ? `Case not found — ${NAME_SHORT.en}` : `Кейс не найден — ${NAME_SHORT.ru}`;
      }
      return;
    }

    document.title = TITLE_HOME[locale];
  }, [pathname, locale]);

  return null;
}
