import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HOMEPAGE_ICON = '/avatar/Profile.svg';

/** Same as CasePage — favicon must match the resolved case. */
const LEGACY_CASE_SLUG: Record<string, string> = {
  tbank: 't-bank',
  'tbank-installment': 't-bank',
};

/** Case ids → icons under /public/logos (see `src/data/cases.ts`). */
const CASE_FAVICON: Record<string, string> = {
  'yandex-lavka': '/logos/YandexLavka.svg',
  't-bank': '/logos/Tbank.svg',
  okolo: '/logos/okolo.svg',
};

function faviconHrefForPathname(pathname: string): string {
  if (pathname === '/') {
    return HOMEPAGE_ICON;
  }
  const match = /^\/cases\/([^/]+)\/?$/.exec(pathname);
  if (match) {
    const resolvedId = LEGACY_CASE_SLUG[match[1]] ?? match[1];
    return CASE_FAVICON[resolvedId] ?? HOMEPAGE_ICON;
  }
  return HOMEPAGE_ICON;
}

function applyFaviconHref(href: string) {
  const type = 'image/svg+xml';
  let link = document.querySelector<HTMLLinkElement>("link[rel='icon'][type='image/svg+xml']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = type;
    document.head.appendChild(link);
  }
  link.href = href;

  let shortcut = document.querySelector<HTMLLinkElement>("link[rel='shortcut icon']");
  if (!shortcut) {
    shortcut = document.createElement('link');
    shortcut.rel = 'shortcut icon';
    document.head.appendChild(shortcut);
  }
  shortcut.href = href;
}

export function DynamicFavicon() {
  const { pathname } = useLocation();

  useEffect(() => {
    applyFaviconHref(faviconHrefForPathname(pathname));
  }, [pathname]);

  return null;
}
