import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal hook for case pages.
 *
 * Finds every direct child of `.case-sections` — all content blocks,
 * including conditionally rendered ones — and animates them in (fade +
 * slight upward lift) as they enter the viewport while scrolling.
 *
 * Elements already visible in the viewport on mount are intentionally
 * skipped so they don't flash invisible during the page-enter animation
 * of the parent container.
 *
 * Reuses the existing `reveal-on-scroll` / `is-visible` CSS classes from
 * global.css — no extra styles required.
 *
 * @param dep  Re-run trigger (pass `caseSlug` so the observer is rebuilt
 *             whenever the user navigates to a different case page).
 */
export function useScrollReveal(dep: unknown): void {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // One rAF to let all conditional JSX mount before querying the DOM.
    const frameId = requestAnimationFrame(() => {
      const all = Array.from(
        document.querySelectorAll<HTMLElement>('.case-sections > *'),
      );

      if (!all.length) return;

      // Don't hide elements already in the viewport — they inherit the
      // parent container's page-enter animation and must not flash invisible.
      const belowFold = all.filter((el) => {
        const { top, bottom } = el.getBoundingClientRect();
        return top >= window.innerHeight || bottom <= 0;
      });

      if (!belowFold.length) return;

      belowFold.forEach((el) => el.classList.add('reveal-on-scroll'));

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        // Trigger slightly before the element fully enters so the animation
        // feels proactive rather than late.  The negative bottom rootMargin
        // also prevents triggering on elements just barely peeking in.
        { threshold: 0, rootMargin: '0px 0px -4% 0px' },
      );

      belowFold.forEach((el) => observerRef.current!.observe(el));
    });

    return () => {
      cancelAnimationFrame(frameId);
      observerRef.current?.disconnect();
      observerRef.current = null;
      // Strip classes so the next render starts from a clean state.
      document
        .querySelectorAll<HTMLElement>('.case-sections > *')
        .forEach((el) => el.classList.remove('reveal-on-scroll', 'is-visible'));
    };
  }, [dep]); // eslint-disable-line react-hooks/exhaustive-deps
}
