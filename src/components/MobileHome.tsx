import { useNavigate } from 'react-router-dom';
import type { CaseStudy, SiteContent } from '../types';
import { TAG_LABELS } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLocale } from '../context/LocaleContext';
import { typograph } from '../utils/typograph';

interface MobileHomeProps {
  siteContent: SiteContent;
  cases: CaseStudy[];
}

export function MobileHome({ siteContent, cases }: MobileHomeProps) {
  const { locale } = useLocale();
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-[var(--color-bg)]" style={{ padding: '24px 20px 40px' }}>
      {/* ── Header ── */}
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/avatar/Profile.svg"
            alt={siteContent.name[locale]}
            className="w-[56px] h-[56px] rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <h1 className="text-[20px] font-bold leading-tight tracking-[-0.01em]">
              {siteContent.name[locale]}
            </h1>
            <p className="text-[15px] font-medium text-[var(--color-text-secondary)] leading-snug mt-0.5">
              {siteContent.role[locale]}
            </p>
          </div>
        </div>
        <LanguageSwitcher className="relative shrink-0 mt-1" />
      </header>

      {/* ── Intro ── */}
      <section className="mt-5">
        <p className="text-[15px] font-medium text-[var(--color-text-secondary)] leading-[1.5]">
          {locale === 'ru'
            ? typograph('Проектирую end to end сценарии и улучшаю визуальное качество цифровых продуктов')
            : typograph('I design end-to-end scenarios and improve the visual quality of digital products')}
        </p>
      </section>

      {/* ── Resume link ── */}
      <section className="mt-6">
        <a
          href={siteContent.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex items-center justify-between w-full bg-white rounded-[16px] shadow-[0_0_6px_rgba(0,0,0,0.09)] no-underline"
          style={{ padding: '14px 16px' }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-[17px] font-semibold text-[var(--color-text-primary)] leading-[1.2]">
              {locale === 'ru' ? 'Резюме' : 'Resume'}
            </p>
            <p className="text-[13px] font-medium text-[var(--color-text-secondary)] leading-[1.3] mt-0.5">
              {siteContent.resumeSubtitle[locale]}
            </p>
          </div>
          <div
            className="shrink-0 w-[40px] h-[40px] rounded-[14px] bg-black flex items-center justify-center"
          >
            <img src="/Icons/download.svg" alt="" className="w-[18px] h-[18px]" />
          </div>
        </a>
      </section>

      {/* ── Contact ── */}
      <section className="mt-6">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-tertiary)] mb-3">
          {locale === 'ru' ? 'Контакты' : 'Contact'}
        </h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          <ContactMobile
            label={locale === 'ru' ? 'Почта' : 'Email'}
            value="varyakolysh2003@gmail.ru"
            href="mailto:varyakolysh2003@gmail.com"
          />
          <ContactMobile
            label="Telegram"
            value="@BarbaraKolysh"
            href="https://t.me/BarbaraKolysh"
          />
          <ContactMobile
            label="LinkedIn"
            value="Varya Kolysh"
            href="https://www.linkedin.com/in/varvara-kolysh-5401492a3/?skipRedirect=true"
          />
          <ContactMobile
            label={locale === 'ru' ? 'Телефон' : 'Phone'}
            value="+79215953685"
          />
        </div>
      </section>

      {/* ── Cases ── */}
      <section className="flex flex-col gap-4 mt-7">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-tertiary)]">
          {locale === 'ru' ? 'Работы' : 'Projects'}
        </h2>

        {cases.map((cs) => {
          const isDisabled = cs.id === 'okolo';
          return (
            <button
              key={cs.id}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && navigate(`/cases/${cs.id}`)}
              className="w-full text-left bg-white rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.09)] transition-transform duration-150 active:scale-[0.98] disabled:opacity-100"
            >
              {/* Cover image */}
              <div className="w-full aspect-[16/10] overflow-hidden bg-[#F0F0F0]">
                {cs.coverVideo ? (
                  <video
                    src={cs.coverVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '70% center', transform: 'scale(1.04)', transformOrigin: 'center' }}
                  />
                ) : (
                  <img
                    src={cs.cover}
                    alt={cs.title[locale]}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '70% center', transform: 'scale(1.04)', transformOrigin: 'center' }}
                  />
                )}
              </div>

              {/* Card body */}
              <div style={{ padding: '14px 16px 16px' }}>
                <div className="flex items-center gap-2.5 mb-2">
                  <img
                    src={cs.logo}
                    alt=""
                    className="w-[32px] h-[32px] shrink-0 object-contain"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[17px] font-semibold leading-[1.25] tracking-[-0.01em] text-[var(--color-text-primary)]">
                      {cs.title[locale]}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="inline-flex items-center rounded-[12px] bg-[#F1F1F1] text-[13px] font-medium text-black/35 whitespace-nowrap"
                    style={{ padding: '4px 10px' }}
                  >
                    {TAG_LABELS[cs.tag][locale]}
                  </span>
                  <span className="text-[13px] font-medium text-[var(--color-text-tertiary)]">
                    {cs.industry}
                  </span>
                  <span className="text-[13px] font-medium text-[var(--color-text-tertiary)]">
                    •
                  </span>
                  <span className="text-[13px] font-medium text-[var(--color-text-tertiary)]">
                    {cs.year === 'coming soon' ? (locale === 'ru' ? 'скоро' : 'coming soon') : cs.year}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}

function ContactMobile({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[13px] font-semibold text-[var(--color-text-primary)] mb-0.5">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] font-medium text-[var(--color-text-secondary)] leading-[1.3] no-underline break-words [overflow-wrap:anywhere]"
        >
          {value}
        </a>
      ) : (
        <p className="text-[14px] font-medium text-[var(--color-text-secondary)] leading-[1.3] break-words [overflow-wrap:anywhere]">
          {value}
        </p>
      )}
    </div>
  );
}
