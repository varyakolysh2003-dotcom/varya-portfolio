/**
 * Prefix a public-folder asset path with the Vite base URL.
 *
 * Vite's `base` config only applies to imported assets — static strings
 * like src="/covers/..." are left as-is and break on GitHub Pages where
 * the app is served from /varya-portfolio/ instead of /.
 *
 * Usage: src={publicUrl('/covers/image.webp')}
 */
const BASE = import.meta.env.BASE_URL; // '/' on Vercel, '/varya-portfolio/' on GitHub Pages

export const publicUrl = (path: string): string =>
  `${BASE}${path.replace(/^\//, '')}`;
