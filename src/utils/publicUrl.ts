/**
 * Prefix a public-folder asset path with the Vite base URL.
 *
 * Vite's `base` config only applies to imported assets — static strings
 * like src="/covers/..." are left as-is and break on GitHub Pages where
 * the app is served from /varya-portfolio/ instead of /.
 *
 * Usage: src={publicUrl('/covers/image.webp')}
 *
 * Cache-busting: only appended to PDFs (resumes) so that they refresh
 * across deploys. Static images use plain URLs so the browser cache
 * can serve them between deploys.
 */
const BASE = import.meta.env.BASE_URL; // '/' on Vercel, '/varya-portfolio/' on GitHub Pages
const BUILD_TIME = import.meta.env.VITE_BUILD_TIME as string;

export const publicUrl = (path: string): string => {
  const url = `${BASE}${path.replace(/^\//, '')}`;
  return /\.pdf($|\?)/i.test(path) ? `${url}?v=${BUILD_TIME}` : url;
};
