import { useRef, useState, useLayoutEffect } from 'react';
import type { CaseStudy, Locale } from '../../types';
import { typograph } from '../../utils/typograph';
import { useLocale } from '../../context/LocaleContext';
import { publicUrl } from '../../utils/publicUrl';

/** Hard constraint: gap (px) between text block bottom and active card top. */
const TEXT_TO_CARD_GAP_PX = 32;

/** Fallback lift when measurement not ready. */
const FALLBACK_LIFT_PX = -80;

interface PreviewPanelProps {
  activeCase: CaseStudy | null;
  cases: CaseStudy[];
  showResume: boolean;
  onResumeEnter: () => void;
  onResumeLeave: () => void;
}

export function PreviewPanel({ activeCase, cases, showResume, onResumeEnter, onResumeLeave }: PreviewPanelProps) {
  const { locale } = useLocale();
  return (
    <main
      className="portfolio-section w-full lg:flex-[736_1_0%] min-w-0 lg:max-w-[736px] h-auto lg:h-full bg-[var(--color-preview)] rounded-[var(--radius-media)] overflow-hidden relative flex flex-col shadow-[0_0_6px_rgba(0,0,0,0.11)]"
      onMouseEnter={showResume ? onResumeEnter : undefined}
      onMouseLeave={showResume ? onResumeLeave : undefined}
    >
      {showResume ? (
        <ResumeContent locale={locale} />
      ) : (
        <DefaultContent cases={cases} activeCase={activeCase} locale={locale} />
      )}
    </main>
  );
}

function DefaultContent({
  cases,
  activeCase,
  locale,
}: {
  cases: CaseStudy[];
  activeCase: CaseStudy | null;
  locale: Locale;
}) {
  const textBlockRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const baseTopsPxRef = useRef<number[]>([]);
  const [targetTopPx, setTargetTopPx] = useState<number | null>(null);

  /*
   * Single effect: measure base positions via offsetTop (immune to CSS transforms)
   * and compute the target top for the active card.
   * Using offsetTop instead of getBoundingClientRect prevents mid-animation
   * positions from corrupting future calculations.
   */
  useLayoutEffect(() => {
    const stackEl = stackRef.current;
    if (!stackEl || stackEl.children.length === 0) return;

    // Always refresh base positions using offsetTop (never affected by transforms).
    const tops: number[] = [];
    for (let i = 0; i < stackEl.children.length; i++) {
      tops.push((stackEl.children[i] as HTMLElement).offsetTop);
    }
    baseTopsPxRef.current = tops;

    if (activeCase === null) {
      setTargetTopPx(null);
      return;
    }

    const textEl = textBlockRef.current;
    if (!textEl) return;
    const textBottom = textEl.getBoundingClientRect().bottom;
    const stackTop = stackEl.getBoundingClientRect().top;
    setTargetTopPx(textBottom - stackTop + TEXT_TO_CARD_GAP_PX);
  }, [activeCase]);

  const reversed = [...cases].reverse();

  return (
    <div className="flex flex-col h-full min-h-0 relative overflow-hidden pb-6 lg:pb-0">
      {/* Text block: title + description + metadata grid */}
      {/* z-index 30 keeps text above the cover stack (max z-index 20) at all viewport heights */}
      <div ref={textBlockRef} className="mb-4 shrink-0" style={{ position: 'relative', zIndex: 30 }}>
        {activeCase ? (
          <DefaultContentCaseBlock caseStudy={activeCase} locale={locale} />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-[24px] font-bold leading-[1.2] font-sans">
                {locale === 'ru' ? 'Привет! Я Варя' : 'Hi! I\'m Varya'}
              </h2>
              <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.4]">
                {locale === 'ru'
                  ? typograph('Проектирую end to end сценарии и улучшаю визуальное качество цифровых продуктов')
                  : typograph('I design end-to-end scenarios and improve the visual quality of digital products')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              <ContactItem
                label={locale === 'ru' ? 'Почта' : 'Email'}
                value="varyakolysh2003@gmail.com"
                href="mailto:varyakolysh2003@gmail.com"
              />
              <ContactItem
                label="Telegram"
                value="@BarbaraKolysh"
                href="https://t.me/BarbaraKolysh"
              />
              <ContactItem
                label="LinkedIn"
                value="Varya Kolysh"
                href="https://www.linkedin.com/in/varvara-kolysh-5401492a3/?skipRedirect=true"
              />
              <ContactItem
                label={locale === 'ru' ? 'Телефон' : 'Phone'}
                value="+79215953685"
              />
            </div>
          </div>
        )}
      </div>
      {/* Cover stack: active card top = text block bottom + 32px — hidden on mobile/tablet (hover-only) */}
      <div
        ref={stackRef}
        className="hidden lg:flex flex-col"
        style={{
          position: 'absolute',
          left: 20,
          right: 20,
          /* At viewport heights below 819px the panel shrinks, so the stack
             would rise toward the text block. We push it back down by the same
             amount the panel lost, keeping the stack's viewport position fixed. */
          bottom: 'calc(-140px - max(0px, 819px - 100dvh))',
        }}
      >
        {reversed.map((cs, index) => {
          const isActive = activeCase?.id === cs.id;
          const baseTop = baseTopsPxRef.current[index] ?? 0;
          const translateY =
            isActive && targetTopPx !== null && baseTopsPxRef.current.length > 0
              ? targetTopPx - baseTop
              : isActive
                ? FALLBACK_LIFT_PX
                : 0;
          return (
            <div
              key={cs.id}
              className="relative w-full rounded-[var(--radius-media)] overflow-hidden"
              style={{
                marginTop: index > 0 ? -286 : 0,
                zIndex: isActive ? 20 : index + 1,
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
                transform: isActive ? `translateY(${translateY}px) scale(1.02)` : 'none',
                transition: 'transform 280ms ease-out, z-index 0s',
              }}
            >
              <img
                src={cs.cover}
                alt={cs.title[locale]}
                className="w-full h-auto object-contain block"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DefaultContentCaseBlock({
  caseStudy,
  locale,
}: {
  caseStudy: CaseStudy;
  locale: Locale;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-sans text-[24px] font-bold leading-[1.2]">
          {typograph(caseStudy.title[locale])}
        </h2>
        <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.4]">
          {typograph(caseStudy.description[locale])}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
        <MetaItem
          label={locale === 'ru' ? 'Моя роль' : 'My role'}
          value={typograph(caseStudy.role[locale])}
        />
        <MetaItem
          label={locale === 'ru' ? 'Период выполнения' : 'Timeline'}
          value={
            caseStudy.year === 'coming soon'
              ? (locale === 'ru' ? 'скоро' : 'coming soon')
              : /^\d{4}$/.test(caseStudy.year)
                ? `${caseStudy.year}${locale === 'ru' ? '\u00A0год' : ''}`
                : caseStudy.year
          }
        />
        <MetaItem
          label={locale === 'ru' ? 'Платформы' : 'Platforms'}
          value={caseStudy.platforms[locale]}
        />
        <MetaItem
          label={locale === 'ru' ? 'Софты' : 'Tools'}
          value={caseStudy.tools[locale]}
        />
      </div>
    </div>
  );
}

function ResumeContent({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-col min-h-0 absolute inset-0">
      {/* Scrollable resume content — fills entire card so scroll clips at visual boundary */}
      <div className="flex-1 overflow-y-auto min-h-0" style={{ padding: '24px 23px 0 24px', scrollbarWidth: 'thin', scrollbarColor: '#d4d4d4 transparent' }}>
        <div className="flex flex-col pb-16">
          {/* Title + download button */}
          <div className="relative">
            <h2 className="font-sans text-[24px] font-bold leading-[1.2]">
              {locale === 'ru' ? 'Резюме' : 'Resume'}
            </h2>
            <a
              href={publicUrl('/Resume/Kolysh%20Varvara%20Resume.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              download="Kolysh Varvara Resume.pdf"
              className="resume-download"
            >
              <img src={publicUrl('/Icons/download.svg')} alt={locale === 'ru' ? 'Скачать резюме' : 'Download resume'} />
            </a>
          </div>

          {/* Образование / Education — 20px below title */}
          <section className="flex flex-col gap-4" style={{ marginTop: 20 }}>
            <p className="font-sans text-[16px] font-medium text-[var(--color-text-tertiary)] leading-[1.4]">
              {locale === 'ru' ? 'Образование' : 'Education'}
            </p>

            <div className="flex items-start gap-3">
              <img
                src={publicUrl('/logos/Логотип_НИУ_ВШЭ 1.svg')}
                alt={locale === 'ru' ? 'НИУ ВШЭ' : 'HSE University'}
                className="w-[44px] h-[44px] rounded-full object-contain shrink-0"
              />
              <div className="flex flex-col gap-0.5">
                <p className="font-sans text-[20px] font-semibold text-[var(--color-text-primary)] leading-[1.4]">
                  {locale === 'ru' ? 'Высшая школа Экономики (НИУ ВШЭ)' : 'HSE University (NRU HSE)'}
                </p>
                <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.4]">
                  {locale === 'ru'
                    ? typograph('Магистратура, Дизайн и продвижение цифрового продукта')
                    : typograph('Master\'s, Design and Digital Product Promotion')}
                </p>
                <p className="font-sans text-[16px] font-medium text-[var(--color-text-tertiary)] leading-[1.4]">
                  2025 — 2027
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <img
                src={publicUrl('/logos/Логотип_СПбГУПТД 1.svg')}
                alt={locale === 'ru' ? 'СПбГУПТД' : 'SPbSUITD'}
                className="w-[44px] h-[44px] rounded-full object-contain shrink-0"
              />
              <div className="flex flex-col gap-0.5">
                <p className="font-sans text-[20px] font-semibold text-[var(--color-text-primary)] leading-[1.4]">
                  {locale === 'ru' ? 'СПбГУПТД' : 'SPbSUITD'}
                </p>
                <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.4]">
                  {locale === 'ru'
                    ? typograph('Бакалавр, Дизайн цифровых медиа')
                    : typograph('Bachelor\'s, Digital Media Design')}
                </p>
                <p className="font-sans text-[16px] font-medium text-[var(--color-text-tertiary)] leading-[1.4]">
                  2021 — 2025
                </p>
              </div>
            </div>
          </section>

          {/* Опыт / Experience */}
          <div className="w-full h-px bg-[var(--color-border)]" style={{ marginTop: 24, marginBottom: 32 }} />
          <section className="flex flex-col gap-4">
            <h3 className="font-sans text-[24px] font-bold text-[var(--color-text-primary)] leading-[1.3] mt-0">
              {locale === 'ru' ? 'Опыт' : 'Experience'}
            </h3>

            <div className="flex flex-col gap-1">
              <p className="font-sans text-[20px] font-semibold text-[var(--color-text-primary)] leading-[1.4]">
                {locale === 'ru' ? 'IT Launch - Веб дизайнер' : 'IT Launch - Web Designer'}
              </p>
              <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.5]">
                {locale === 'ru'
                  ? typograph('Проводила design-review, подготавливала макеты к разработке, адаптивный дизайн для десктоп, планшет и моб. устройства, защищала свои решения, анализировала рынок')
                  : typograph('Conducted design reviews, prepared layouts for development, responsive design for desktop, tablet and mobile, defended design decisions, market analysis')}
              </p>
              <p className="font-sans text-[16px] font-medium text-[var(--color-text-tertiary)] leading-[1.4]">
                {locale === 'ru' ? 'Май 2024 — Сентябрь 2025' : 'May 2024 — September 2025'}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-sans text-[20px] font-semibold text-[var(--color-text-primary)] leading-[1.4]">
                {locale === 'ru' ? 'CS Studio - Коммуникационный дизайнер' : 'CS Studio - Communication Designer'}
              </p>
              <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.5]">
                {locale === 'ru'
                  ? typograph('Ретушь фотографий, разработка шортсов, рилсов и постов к публикации')
                  : typograph('Photo retouching, creating shorts, reels and posts for publication')}
              </p>
              <p className="font-sans text-[16px] font-medium text-[var(--color-text-tertiary)] leading-[1.4]">
                2021 — 2025
              </p>
            </div>
          </section>

          {/* Навыки / Skills */}
          <div className="w-full h-px bg-[var(--color-border)]" style={{ marginTop: 24, marginBottom: 32 }} />
          <section className="flex flex-col gap-4">
            <h3 className="font-sans text-[24px] font-bold text-[var(--color-text-primary)] leading-[1.3] mt-0">
              {locale === 'ru' ? 'Навыки' : 'Skills'}
            </h3>

            <div className="flex flex-col gap-6">
              <div>
                <p className="skills-subtitle text-[var(--color-text-primary)] mb-0">
                  {locale === 'ru' ? 'Профессиональные навыки' : 'Hard skills'}
                </p>
                <div className="skills-pills-wrapper">
                  <div className="flex flex-wrap gap-2">
                    {['Jitter', 'Figma', 'Adobe After Effects', 'Cursor', 'Claude', 'IOS Guideline', 'Material design', 'Rive', 'MidJourney', 'Jira', 'BuildIn', 'ChatGPT', 'FigJam', locale === 'ru' ? 'Английский B2' : 'English B2'].map(skill => (
                      <span
                        key={skill}
                        className="skill-pill text-black/35 bg-[#F1F1F1] rounded-[16px] whitespace-nowrap"
                        style={{ padding: '6px 12px' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="skills-subtitle text-[var(--color-text-primary)] mb-2">
                  {locale === 'ru' ? 'Гибкие навыки' : 'Soft skills'}
                </p>
                <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Самообладание, дисциплинированность и ответственность, умение принимать иную точку зрения, дружелюбность, пунктуальность, способность организовывать свое рабочее пространство самостоятельно')
                    : typograph('Composure, discipline and responsibility, ability to accept different viewpoints, friendliness, punctuality, ability to organize workspace independently')}
                </p>
              </div>
            </div>
          </section>

          {/* Достижения / Achievements */}
          <div className="w-full h-px bg-[var(--color-border)]" style={{ marginTop: 24, marginBottom: 32 }} />
          <section className="flex flex-col gap-4">
            <h3 className="font-sans text-[24px] font-bold text-[var(--color-text-primary)] leading-[1.3] mt-0">
              {locale === 'ru' ? 'Достижения' : 'Achievements'}
            </h3>

            <div className="flex flex-col gap-2">
              <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)]">
                {locale === 'ru'
                  ? typograph('— 1 место в конкурсе Креатон по разработке AR-очков совместно с «Газпром нефть»')
                  : typograph('— 1st place in Creathon AR glasses development competition with Gazprom Neft')}
              </p>
              <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)]">
                {locale === 'ru'
                  ? typograph('— 1 место в конкурсе Креатон «Разработка приложения Смарт-Дизайн» совместно с «Газпром нефть»')
                  : typograph('— 1st place in Creathon "Smart Design App Development" competition with Gazprom Neft')}
              </p>
              <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)]">
                {locale === 'ru'
                  ? typograph('— Сертификат в конкурсе разработки приложения обустройства коворкинг помещений от «ВКонтакте»')
                  : typograph('— Certificate in coworking space app development competition by VKontakte')}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-sans text-[20px] font-semibold text-[var(--color-text-primary)] mb-1">
        {label}
      </p>
      <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.4]">
        {value}
      </p>
    </div>
  );
}

function ContactItem({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <p className="font-sans text-[20px] font-semibold text-[var(--color-text-primary)] mb-[8px]">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-text-secondary)' }}
          className="font-sans text-[16px] font-medium leading-[1.4] no-underline hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="font-sans text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.4]">
          {value}
        </p>
      )}
    </div>
  );
}
