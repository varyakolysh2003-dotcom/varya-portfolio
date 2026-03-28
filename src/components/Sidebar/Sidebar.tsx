import { useNavigate } from 'react-router-dom';
import type { CaseStudy, SiteContent } from '../../types';
import { TAG_LABELS } from '../../types';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useLocale } from '../../context/LocaleContext';

interface SidebarProps {
  siteContent: SiteContent;
  cases: CaseStudy[];
  activeCaseId: string | null;
  showResume: boolean;
  onCaseEnter: (cs: CaseStudy) => void;
  onCaseLeave: () => void;
  onResumeEnter: () => void;
  onResumeLeave: () => void;
}

export function Sidebar({
  siteContent,
  cases,
  activeCaseId,
  showResume,
  onCaseEnter,
  onCaseLeave,
  onResumeEnter,
  onResumeLeave,
}: SidebarProps) {
  const { locale } = useLocale();
  const navigate = useNavigate();

  return (
    <aside className="w-[606px] min-w-0 flex flex-col gap-[16px]">
      {/* Header: avatar + name + language */}
      <div className="flex items-start justify-between mb-0.5">
        <div className="flex items-center gap-3.5">
          <img
            src="/avatar/Profile.svg"
            alt={siteContent.name[locale]}
            className="w-[72px] h-[72px] rounded-full object-cover shrink-0"
          />
          <div>
            <h1 className="text-[24px] font-bold leading-tight tracking-[-0.01em]">
              {siteContent.name[locale]}
            </h1>
            <p className="font-['Inter',var(--font-sans)] text-[20px] font-medium text-[var(--color-text-secondary)] leading-snug mt-0.5">
              {siteContent.role[locale]}
            </p>
          </div>
        </div>

        <LanguageSwitcher className="relative shrink-0 mt-1" />
      </div>

      {/* Resume card */}
      <div
        onMouseEnter={onResumeEnter}
        onMouseLeave={onResumeLeave}
        style={{ padding: '16px 24px' }}
        className={`w-full box-border rounded-[32px] shadow-[0_0_6px_rgba(0,0,0,0.11)] transition-colors duration-200 cursor-pointer ${showResume ? 'bg-[#F8F8F8]' : 'bg-[#FFFFFF] hover:bg-[#F8F8F8]'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[4px] flex-1 min-w-0">
            <p className="text-[20px] font-semibold leading-[1.1] text-[#000000]">
              {locale === 'ru' ? 'Резюме' : 'Resume'}
            </p>
            <p className="text-[16px] font-medium leading-[1.2] text-[#8A8A8A]">
              {siteContent.resumeSubtitle[locale]}
            </p>
          </div>
          <div className="flex items-center gap-[16px] shrink-0">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="opacity-30 shrink-0">
              <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Case cards */}
      <div className="flex flex-col gap-[16px]">
        {cases.map((cs) => {
          const isActive = activeCaseId === cs.id;
          const isDisabled = cs.id === 'okolo';
          const handleClick = () => {
            if (isDisabled) return;
            navigate(`/cases/${cs.id}`);
          };

          return (
            <div
              key={cs.id}
              role={isDisabled ? undefined : 'button'}
              tabIndex={isDisabled ? -1 : 0}
              aria-disabled={isDisabled}
              onMouseEnter={() => onCaseEnter(cs)}
              onMouseLeave={onCaseLeave}
              onFocus={() => onCaseEnter(cs)}
              onClick={isDisabled ? undefined : handleClick}
              style={{ padding: '16px 24px' }}
              className={`
                w-full box-border h-[146px] rounded-[32px]
                shadow-[0_0_6px_rgba(0,0,0,0.11)]
                transition-colors duration-200
                ${isDisabled ? 'cursor-default' : 'cursor-pointer'} overflow-hidden
                ${isActive ? 'bg-[#F8F8F8]' : 'bg-[#FFFFFF] hover:bg-[#F8F8F8]'}
              `}
            >
              <div className="flex h-full flex-col items-start gap-[8px]">
                {/* Pill: single element, flex-none so flex never shrinks it; inline padding overrides global * { padding: 0 } */}
                <div
                  style={{ padding: '6px 12px' }}
                  className="inline-flex w-fit flex-none items-center justify-center rounded-[16px] bg-[#F1F1F1] px-[12px] py-[6px] font-medium leading-[1.2] text-[16px] text-black/35 whitespace-nowrap"
                >
                  {TAG_LABELS[cs.tag][locale]}
                </div>

                {/* Card body */}
                <div className="flex min-h-0 w-full flex-1 items-center gap-[16px]">
                  <img
                    src={cs.logo}
                    alt=""
                    className="h-[52px] w-[52px] shrink-0 object-contain"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
                    <h3 className="text-[20px] font-semibold leading-[1.3] tracking-[-0.01em]">
                      {cs.title[locale]}
                    </h3>
                    <p className="text-[16px] font-medium text-[var(--color-text-tertiary)]">
                      {cs.industry} • {cs.year === 'coming soon' ? (locale === 'ru' ? 'скоро' : 'coming soon') : cs.year}
                    </p>
                  </div>
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="shrink-0 opacity-30">
                    <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
