import { useState, useCallback, useRef } from 'react';
import type { CaseStudy } from '../types';
import { cases, siteContent } from '../data/cases';
import { Sidebar } from './Sidebar/Sidebar';
import { PreviewPanel } from './Preview/PreviewPanel';
import { MobileHome } from './MobileHome';

export function PortfolioLayout() {
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);
  const [showResume, setShowResume] = useState(false);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeLeaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCaseEnter = useCallback((cs: CaseStudy) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    // Clear resume state when hovering a case
    if (resumeLeaveTimeoutRef.current) {
      clearTimeout(resumeLeaveTimeoutRef.current);
      resumeLeaveTimeoutRef.current = null;
    }
    setShowResume(false);
    setActiveCase(cs);
  }, []);

  /** On mouse leave from list: clear hover so no card stays raised. */
  const handleCaseLeave = useCallback(() => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveCase(null);
      leaveTimeoutRef.current = null;
    }, 150);
  }, []);

  const handleResumeEnter = useCallback(() => {
    if (resumeLeaveTimeoutRef.current) {
      clearTimeout(resumeLeaveTimeoutRef.current);
      resumeLeaveTimeoutRef.current = null;
    }
    // Clear case state when hovering resume
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveCase(null);
    setShowResume(true);
  }, []);

  const handleResumeLeave = useCallback(() => {
    resumeLeaveTimeoutRef.current = setTimeout(() => {
      setShowResume(false);
      resumeLeaveTimeoutRef.current = null;
    }, 150);
  }, []);

  return (
    <>
      {/* Desktop layout — hidden on mobile/tablet */}
      <div
        className="portfolio-container page-enter min-h-dvh bg-[var(--color-bg)] hidden lg:flex items-center justify-center"
        style={{ paddingLeft: 60, paddingRight: 60, paddingTop: 24, paddingBottom: 24 }}
      >
        <div
          className="portfolio-inner flex gap-[20px] w-full max-w-[1362px]"
          style={{ height: 'min(771px, calc(100dvh - 48px))' }}
        >
          <Sidebar
            siteContent={siteContent}
            cases={cases}
            activeCaseId={activeCase?.id ?? null}
            showResume={showResume}
            onCaseEnter={handleCaseEnter}
            onCaseLeave={handleCaseLeave}
            onResumeEnter={handleResumeEnter}
            onResumeLeave={handleResumeLeave}
          />
          <PreviewPanel
            activeCase={activeCase}
            cases={cases}
            showResume={showResume}
            onResumeEnter={handleResumeEnter}
            onResumeLeave={handleResumeLeave}
          />
        </div>
      </div>

      {/* Mobile/Tablet layout — hidden on desktop */}
      <div className="lg:hidden">
        <MobileHome siteContent={siteContent} cases={cases} />
      </div>
    </>
  );
}
