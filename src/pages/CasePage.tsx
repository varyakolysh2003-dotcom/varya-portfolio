import { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cases } from '../data/cases';
import { ScrollToTop } from '../components/ScrollToTop';
import { useLocale } from '../context/LocaleContext';
import { typograph } from '../utils/typograph';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { CaseStudy } from '../types';
import { lazy, Suspense } from 'react';

const LavkaCase = lazy(() => import('../cases/lavka/LavkaCase'));
const TBankCase = lazy(() => import('../cases/tbank/TBankCase'));

const NAV_ITEMS = [
  { id: 'section-context', label: { ru: 'Контекст', en: 'Context' } },
  { id: 'section-analysis', label: { ru: 'Анализ', en: 'Analysis' } },
  { id: 'section-solutions', label: { ru: 'Гипотезы и решения', en: 'Hypotheses & Solutions' } },
  { id: 'section-testing', label: { ru: 'Тестирование', en: 'Testing' } },
] as const;

const LEGACY_CASE_SLUG: Record<string, string> = {
  tbank: 't-bank',
  'tbank-installment': 't-bank',
};


export function CasePage() {
  const { caseSlug } = useParams<{ caseSlug: string }>();
  const { locale } = useLocale();
  const [mobileSectionsOpen, setMobileSectionsOpen] = useState(false);
  const mobileSectionsRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal for all .case-sections children (see useScrollReveal hook).
  useScrollReveal(caseSlug);

  const benchmarkingLogos: string[] = [
    '/logos/Uber.png',
    '/logos/Fresh.png',
    '/logos/instacart.png',
    '/logos/вкусвилл.png',
    '/logos/samokat.png',
  ];

  const okoloBenchmarkingLogos: string[] = [
    '/covers/okolo/1.webp',
    '/covers/okolo/2.webp',
    '/covers/okolo/3.webp',
    '/covers/okolo/4.webp',
  ];

  const [activeSection, setActiveSection] = useState<string>(NAV_ITEMS[0].id);
  const [activePersona, setActivePersona] = useState<'families' | 'friends' | 'colleagues' | 'couples' | 'students' | 'rvp' | 'vnzh'>('families');
  const [activeTestChip, setActiveTestChip] = useState(0);
  const [activeTbankTestChip, setActiveTbankTestChip] = useState(0);
  const [mobileOnboardingSlide, setMobileOnboardingSlide] = useState(0);
  const onboardingScrollRef = useRef<HTMLDivElement>(null);
  const handleOnboardingScroll = useCallback(() => {
    const el = onboardingScrollRef.current;
    if (!el) return;
    setMobileOnboardingSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const resolvedCaseIdForPersona = caseSlug ? (LEGACY_CASE_SLUG[caseSlug] ?? caseSlug) : undefined;
  useEffect(() => {
    if (resolvedCaseIdForPersona === 't-bank') {
      setActivePersona('rvp');
    } else {
      setActivePersona('families');
    }
  }, [resolvedCaseIdForPersona]);

  useEffect(() => {
    const lastSectionId = NAV_ITEMS[NAV_ITEMS.length - 1].id;

    // Scroll-spy: find the last section whose top has scrolled past the
    // activation line (20% from viewport top). This guarantees strict
    // ordering — a later section can never activate before an earlier one.
    const handleScroll = () => {
      const activationLine = window.innerHeight * 0.2;
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Near bottom of page → activate last section
      if (docHeight - scrollBottom < 150) {
        setActiveSection(lastSectionId);
        return;
      }

      // Collect sections with their real vertical positions and sort by DOM order
      const sections = NAV_ITEMS
        .map(({ id }) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.getBoundingClientRect().top } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];
      sections.sort((a, b) => a.top - b.top);

      let current = sections[0]?.id ?? NAV_ITEMS[0].id;
      for (const { id, top } of sections) {
        if (top <= activationLine) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    // Initial calculation after conditional sections mount
    const frameId = requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);


  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!mobileSectionsOpen) return;
      const root = mobileSectionsRef.current;
      if (root && !root.contains(e.target as Node)) {
        setMobileSectionsOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [mobileSectionsOpen]);

  const resolvedCaseId = caseSlug ? (LEGACY_CASE_SLUG[caseSlug] ?? caseSlug) : undefined;
  const caseStudy: CaseStudy | undefined = resolvedCaseId
    ? cases.find((c) => c.id === resolvedCaseId)
    : undefined;

  if (!caseStudy) {
    return (
      <div className="min-h-dvh bg-[var(--color-bg)] flex items-center justify-center px-4 md:px-8 lg:px-[60px]">
        <div className="max-w-[960px] w-full">
          <Link to="/" className="inline-flex items-center text-[16px] font-medium text-[var(--color-text-secondary)] mb-4">
            ← {locale === 'ru' ? 'Назад к работам' : 'Back to projects'}
          </Link>
          <h1 className="text-[28px] font-bold mb-2">
            {locale === 'ru' ? 'Кейс не найден' : 'Case not found'}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
    <ScrollToTop />

    {/* Mobile sticky sections menu — hidden at 1500px+ where fixed side nav appears */}
    {(caseStudy.id === 'yandex-lavka' || caseStudy.id === 't-bank' || caseStudy.id === 'okolo') && (
      <nav
        className="min-[1500px]:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border)]"
        style={{ padding: '10px 16px' }}
      >
        <div className="relative" ref={mobileSectionsRef}>
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-sans font-semibold text-[16px] text-[var(--color-text-primary)] no-underline"
            >
              <img loading="eager" src="/Icons/arrow-sm-left.svg" alt="" className="w-5 h-5" />
              {locale === 'ru' ? 'Назад' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={() => setMobileSectionsOpen((v) => !v)}
              className="shrink-0 inline-flex items-center justify-center w-[40px] h-[40px] rounded-[14px] bg-[#F1F1F1]"
              aria-label={locale === 'ru' ? 'Разделы' : 'Sections'}
              aria-expanded={mobileSectionsOpen}
            >
              <img loading="eager" src="/Icons/menu.svg" alt="" className="w-[18px] h-[18px] block shrink-0" width={18} height={18} />
            </button>
          </div>

          {mobileSectionsOpen && (
            <div
              className="absolute right-0 mt-2 w-[220px] rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)] border border-[var(--color-border)] overflow-hidden"
            >
              {NAV_ITEMS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setMobileSectionsOpen(false);
                  }}
                  className="w-full text-left"
                  style={{
                    padding: '12px 14px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14,
                    fontWeight: activeSection === id ? 600 : 500,
                    color: activeSection === id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    backgroundColor: activeSection === id ? 'rgba(0,0,0,0.04)' : '#ffffff',
                  }}
                >
                  {label[locale]}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    )}

    {/* Fixed side navigation — only visible at 1500px+ where content clears it naturally */}
    {(caseStudy.id === 'yandex-lavka' || caseStudy.id === 't-bank' || caseStudy.id === 'okolo') && (
      <nav
        className="hidden min-[1500px]:flex flex-col gap-[12px] fixed z-40"
        style={{ top: 120, left: 56, width: 230 }}
      >
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            className="text-left whitespace-nowrap bg-transparent border-none cursor-pointer p-0 m-0 w-full min-w-0"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 20,
              fontWeight: activeSection === id ? 600 : 500,
              lineHeight: 1.3,
              color: activeSection === id
                ? 'var(--color-text-primary)'
                : 'var(--color-text-secondary)',
            }}
          >
            {label[locale]}
          </button>
        ))}
      </nav>
    )}

    <div className="case-container page-enter min-h-dvh bg-[var(--color-bg)] flex flex-col items-center pt-[64px] min-[1500px]:pt-0 pb-[84px] px-4 md:px-8 xl:px-[60px]">

      <div className="max-w-[880px] w-full min-[1500px]:pt-[32px]">
        <Link
          to="/"
          className="hidden min-[1500px]:inline-flex items-center gap-2 font-sans font-semibold text-[20px] text-[var(--color-text-primary)] no-underline hover:underline"
        >
          <img loading="eager" src="/Icons/arrow-sm-left.svg" alt="" className="w-5 h-5" />
          {locale === 'ru' ? 'Назад' : 'Back'}
        </Link>

        {/* Case content — spacing system: 64px between major sections, 8px title→desc, 24px inner blocks, 32px text→media */}
        <div className="flex flex-col" style={{ marginTop: 32 }}>
          {/* Header: meta line + logo + title (8px internal gap) */}
          <div className="flex flex-col gap-[8px]">
            <p className="text-[16px] font-medium text-[var(--color-text-tertiary)]">
              {caseStudy.industry} • {caseStudy.year}
            </p>
            <header>
              <div className="flex items-center gap-4">
                <img loading="eager"
                  src={caseStudy.logo}
                  alt=""
                  className="w-[48px] h-[48px] object-contain shrink-0"
                />
                <h1 className="text-[24px] font-bold leading-[1.3]">
                  {typograph(caseStudy.title[locale])}
                </h1>
              </div>
            </header>
          </div>

          {/* Info grid — 24px below header, 24px internal row spacing */}
          <section
            className="grid grid-cols-1 md:grid-cols-2 gap-y-[24px] gap-x-[24px] md:gap-x-[48px]"
            style={{ marginTop: 24 }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-[20px] font-semibold text-[var(--color-text-primary)]">
                {locale === 'ru' ? 'Период выполнения' : 'Timeline'}
              </p>
              <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                {caseStudy.year === 'coming soon'
                  ? (locale === 'ru' ? 'скоро' : 'coming soon')
                  : locale === 'ru'
                    ? `${caseStudy.year} год`
                    : caseStudy.year}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[20px] font-semibold text-[var(--color-text-primary)]">
                {locale === 'ru' ? 'Платформы' : 'Platforms'}
              </p>
              <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                {caseStudy.platforms[locale]}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[20px] font-semibold text-[var(--color-text-primary)]">
                {locale === 'ru' ? 'Моя роль' : 'My role'}
              </p>
              <p className="text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.5]">
                {typograph(caseStudy.role[locale])}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[20px] font-semibold text-[var(--color-text-primary)]">
                {locale === 'ru' ? 'Софты' : 'Tools'}
              </p>
              <p className="text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.5]">
                {typograph(caseStudy.tools[locale])}
              </p>
            </div>
          </section>

          {/* Cover — 24px from info grid */}
          <section style={{ marginTop: 24 }}>
            {caseStudy.coverVideo ? (
              <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-bg-secondary)]">
                <video
                  src={caseStudy.coverVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full object-cover h-[360px] sm:h-[500px] md:h-[660px] lg:h-[860px]"
                  style={{ transform: 'scale(1.06)', objectPosition: 'center' }}
                />
              </div>
            ) : (
              <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#EFEFEF] min-h-[180px] sm:min-h-[260px] md:min-h-[320px]">
                <img loading="eager"
                  src={caseStudy.cover}
                  alt={caseStudy.title[locale]}
                  className="block w-full h-full object-cover"
                  style={caseStudy.id === 'okolo' ? { transform: 'scale(1.04)', transformOrigin: 'center' } : undefined}
                />
              </div>
            )}
          </section>

          {/* Контекст задачи — standalone block */}
          <section id="section-context" style={{ marginTop: 24, scrollMarginTop: 32 }}>
            <div className="bg-[#F5F5F5] rounded-[24px] flex flex-col gap-[8px]" style={{ padding: 24 }}>
              <h2 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                {locale === 'ru' ? 'Контекст задачи' : 'Task Context'}
              </h2>
              {caseStudy.id === 'yandex-lavka' ? (
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    {locale === 'ru'
                      ? typograph('В Лавке есть возможность отправить ссылкой товары из корзины другому пользователю. Получатель открывает ссылку и товары переходят в его корзину')
                      : typograph('Lavka allows sending cart items via link to another user. The recipient opens the link and items are added to their cart')}
                  </p>
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    {locale === 'ru'
                      ? typograph('Такое решение не развивает логику совместного сбора товаров с другими пользователями, не поддерживает сценарии совместного планирования покупок и не создаёт ощущение общей корзины как единого пространства для взаимодействия и координации заказов')
                      : typograph("This solution doesn't develop the logic of collaborative item collection, doesn't support joint purchase planning scenarios, and doesn't create a sense of shared cart as a unified space for interaction and order coordination")}
                  </p>
                </div>
              ) : caseStudy.id === 't-bank' ? (
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    {locale === 'ru'
                      ? typograph('Согласно законодательству РФ, иностранные граждане могут оформлять кредиты и рассрочки при наличии документов, подтверждающих легальное пребывание (ВНЖ, РВП, миграционная регистрация и\u00A0т.д.). При этом на практике значительная часть банков по-прежнему требует личного визита в отделение для подтверждения личности и документов.')
                      : typograph('According to Russian legislation, foreign citizens can apply for loans and installments with documents confirming legal residence (residence permit, temporary residence permit, migration registration, etc.). In practice, however, a significant number of banks still require an in-person visit to a branch for identity and document verification.')}
                  </p>
                  <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                    <p className="m-0">{locale === 'ru' ? typograph('1. около 60–70% банков РФ требуют очную идентификацию нерезидентов при оформлении кредитных продуктов') : typograph('1. approximately 60–70% of Russian banks require in-person identification of non-residents when applying for credit products')}</p>
                    <p className="m-0">{locale === 'ru' ? typograph('2. дистанционная выдача кредитов и рассрочек доступна преимущественно гражданам РФ через ЕСИА и биометрию') : typograph('2. remote issuance of loans and installments is primarily available to Russian citizens via ESIA and biometrics')}</p>
                    <p className="m-0">{locale === 'ru' ? typograph('3. иностранные клиенты чаще сталкиваются с разрывом цифрового сценария') : typograph('3. foreign clients more often face a break in the digital scenario')}</p>
                  </div>
                </div>
              ) : caseStudy.id === 'okolo' ? (
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    {locale === 'ru'
                      ? typograph('Большинство тревел-сервисов предлагают бесконечные списки мест и\u00A0рейтинги, оставляя пользователю задачу самостоятельно выстроить маршрут. Это создаёт когнитивную перегрузку и\u00A0снижает мотивацию к\u00A0исследованию города')
                      : typograph('Most travel services offer endless lists of places and ratings, leaving the user to build a route on their own. This creates cognitive overload and reduces motivation to explore the city.')}
                  </p>
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    {locale === 'ru'
                      ? typograph('okolo формирует ограниченное количество готовых маршрутов с\u00A0логикой передвижения, учитывая локальный контекст и\u00A0пользовательские предпочтения')
                      : typograph('okolo creates a limited number of ready-made routes with movement logic, taking into account local context and user preferences.')}
                  </p>
                </div>
              ) : (
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)] whitespace-pre-line">
                  {typograph(caseStudy.description[locale])}
                </p>
              )}
            </div>
          </section>

          {/* Content group — 112px from Контекст задачи, 24px between sections */}
          <section className="case-sections flex flex-col" style={{ marginTop: 96, gap: 24 }}>
            {/* Вводные */}
            {(caseStudy.id === 'yandex-lavka' || caseStudy.id === 't-bank' || caseStudy.id === 'okolo') && (
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Вводные' : 'Brief'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {caseStudy.id === 'yandex-lavka'
                    ? (locale === 'ru'
                      ? typograph('Внедрить функцию группового заказа — возможность формирования одной общей корзины несколькими пользователями')
                      : typograph('Implement group ordering — the ability for multiple users to form a single shared cart'))
                    : caseStudy.id === 'okolo'
                    ? (locale === 'ru'
                      ? typograph('Спроектировать веб-сервис подбора маршрутов по локальным местам города с\u00A0фокусом на\u00A0Discovery-фазу, пользовательские сценарии и\u00A0дизайн-систему')
                      : typograph('Design a web service for curating city routes through local places, focusing on the Discovery phase, user scenarios, and design system'))
                    : (locale === 'ru'
                      ? typograph('Разработать сценарий онлайн-оформления рассрочки, адаптированный под пользователей с иностранными документами')
                      : typograph('Design an online installment application flow adapted for users with foreign documents'))
                  }
                </p>
              </div>
            )}

            {/* Миссия */}
            {(caseStudy.id === 'yandex-lavka' || caseStudy.id === 't-bank' || caseStudy.id === 'okolo') && (
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Миссия' : 'Mission'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {caseStudy.id === 'yandex-lavka' ? (
                    <>
                      <p className="m-0">— {locale === 'ru' ? typograph('Облегчить взаимодействие между пользователями в процессе совместных покупок') : typograph('Facilitate user interaction during joint purchases')}</p>
                      <p className="m-0">— {locale === 'ru' ? typograph('Дать возможность пользователям создавать постоянные корзины для экономии времени и получения бонусов и скидок') : typograph('Enable users to create permanent carts to save time and earn bonuses')}</p>
                      <p className="m-0">— {locale === 'ru' ? typograph('Снизить количество затрат на доставку') : typograph('Reduce delivery costs')}</p>
                    </>
                  ) : caseStudy.id === 'okolo' ? (
                    <>
                      <p className="m-0">— {locale === 'ru' ? typograph('Снизить когнитивную нагрузку при планировании прогулок и\u00A0поездок по\u00A0городу') : typograph('Reduce cognitive load when planning walks and city trips')}</p>
                      <p className="m-0">— {locale === 'ru' ? typograph('Предложить альтернативу бесконечным спискам мест — готовые маршруты с\u00A0логикой передвижения') : typograph('Offer an alternative to endless place lists — ready-made routes with movement logic')}</p>
                      <p className="m-0">— {locale === 'ru' ? typograph('Помочь пользователям открывать локальные места, о\u00A0которых они не\u00A0узнали\u00A0бы через стандартные агрегаторы') : typograph('Help users discover local places they wouldn\'t find through standard aggregators')}</p>
                    </>
                  ) : (
                    <>
                      <p className="m-0">— {locale === 'ru' ? typograph('Снизить барьер получения финансовых продуктов для иностранных граждан') : typograph('Lower the barrier to financial products for foreign citizens')}</p>
                      <p className="m-0">— {locale === 'ru' ? typograph('Сделать процесс оформления рассрочки понятным, прозрачным и доступным (в рамках отсутствия офлайн-офисов банка)') : typograph('Make the installment process clear, transparent and accessible (given the absence of offline bank offices)')}</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Цель */}
            {(caseStudy.id === 'yandex-lavka' || caseStudy.id === 't-bank' || caseStudy.id === 'okolo') && (
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Цель' : 'Goal'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {caseStudy.id === 'yandex-lavka' ? (
                    <>
                      <p className="m-0">— {locale === 'ru' ? typograph('Привлечь больше пользователей в приложение через совместную корзину') : typograph('Attract more users through shared cart')}</p>
                      <p className="m-0">— {locale === 'ru' ? typograph('Увеличить время удержания пользователей и средний чек через уникальные предложения для группы пользователей') : typograph('Increase retention and average check through unique group offers')}</p>
                    </>
                  ) : caseStudy.id === 'okolo' ? (
                    <>
                      <p className="m-0">— {locale === 'ru' ? typograph('Провести полный цикл Discovery и\u00A0валидировать ключевые гипотезы через Custdev-интервью') : typograph('Conduct a full Discovery cycle and validate key hypotheses through Custdev interviews')}</p>
                      <p className="m-0">— {locale === 'ru' ? typograph('Спроектировать пользовательские сценарии и\u00A0дизайн-систему для MVP веб-сервиса') : typograph('Design user scenarios and a design system for the web service MVP')}</p>
                    </>
                  ) : (
                    <p className="m-0">{locale === 'ru' ? typograph('Адаптировать существующий онлайн-процесс оформления рассрочки под особенности идентификации и проверки иностранных клиентов') : typograph('Adapt the existing online installment process for the identification and verification specifics of foreign clients')}</p>
                  )}
                </div>
              </div>
            )}

            {/* Аудитория */}
            {(caseStudy.id === 'yandex-lavka' || caseStudy.id === 't-bank' || caseStudy.id === 'okolo') && (
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Аудитория' : 'Audience'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {caseStudy.id === 'yandex-lavka'
                    ? (locale === 'ru'
                      ? typograph('Семейные пары, компании друзей, партнёры (группа от 2+ человек)')
                      : typograph('Couples, friend groups, partners (groups of 2+ people)'))
                    : caseStudy.id === 'okolo'
                    ? (locale === 'ru'
                      ? typograph('Путешественники и\u00A0локальные жители, которые хотят исследовать город через готовые маршруты вместо самостоятельного поиска и\u00A0планирования')
                      : typograph('Travelers and locals who want to explore the city through curated routes instead of searching and planning on their own'))
                    : (locale === 'ru'
                      ? typograph('Иностранные граждане с РВП и ВНЖ')
                      : typograph('Foreign citizens with a temporary residence permit (TRP) or permanent residence permit (RP)'))
                  }
                </p>
              </div>
            )}

            {/* Критерии успеха */}
            {(caseStudy.id === 'yandex-lavka' || caseStudy.id === 't-bank' || caseStudy.id === 'okolo') && (
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Критерии успеха' : 'Success Criteria'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {caseStudy.id === 'yandex-lavka' ? (
                    <>
                      <p className="m-0">— {locale === 'ru' ? typograph('Повторное пользование после нововведения') : typograph('Repeat usage after feature launch')}</p>
                      <p className="m-0">— {locale === 'ru' ? typograph('Увеличить время удержания пользователей и средний чек через уникальные предложения для группы пользователей') : typograph('Increase retention and average check through unique group offers')}</p>
                    </>
                  ) : caseStudy.id === 'okolo' ? (
                    <>
                      <p className="m-0">— {locale === 'ru' ? typograph('Валидация гипотез через Custdev: подтверждение потребности в\u00A0готовых маршрутах у\u00A0целевой аудитории') : typograph('Hypothesis validation through Custdev: confirming demand for curated routes among the target audience')}</p>
                      <p className="m-0">— {locale === 'ru' ? typograph('Готовая дизайн-система и\u00A0пользовательские сценарии для передачи в\u00A0разработку MVP') : typograph('Complete design system and user scenarios ready to hand off for MVP development')}</p>
                    </>
                  ) : (
                    <>
                      <p className="m-0">— {locale === 'ru' ? typograph('Рост доли успешно завершённых заявок среди иностранных пользователей') : typograph('Increase in the share of successfully completed applications among foreign users')}</p>
                      <p className="m-0">— {locale === 'ru' ? typograph('Снижение количества отказов и брошенных заявок на этапе заполнения формы') : typograph('Reduction in rejections and abandoned applications at the form completion stage')}</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Бенчмаркинг — Okolo */}
            {caseStudy.id === 'okolo' && (
            <div className="flex flex-col gap-[24px]" style={{ marginTop: 88, scrollMarginTop: 32 }}>
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Бенчмаркинг' : 'Benchmarking'}
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-[12px] max-w-[252px] mx-auto sm:max-w-none sm:mx-0 sm:gap-[24px]">
                {okoloBenchmarkingLogos.map((src, idx) => {
                  const total = okoloBenchmarkingLogos.length;
                  const isLastRow = idx >= 3;
                  // Center the last row on mobile by offsetting its first item.
                  // With 6 columns and each item spanning 2:
                  // - total=4 → last row has 1 item → start at col 3
                  const mobileStart =
                    isLastRow && idx === 3 && total === 4 ? 'col-start-3' : '';

                  return (
                  <div
                    key={src}
                    className={`col-span-2 ${mobileStart} w-[72px] h-[72px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-[16px] md:rounded-[24px] overflow-hidden bg-white flex items-center justify-center`}
                  >
                    <img loading="lazy"
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  );
                })}
              </div>

              <div className="bg-[#F5F5F5] rounded-[24px]" style={{ padding: 24 }}>
                <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Общие выводы' : 'Key Findings'}
                </h3>
                <div className="flex flex-col gap-[8px]" style={{ marginTop: 8 }}>
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    — {locale === 'ru' ? typograph('Конкуренты закрывают отдельные этапы планирования: подбор мест, списки, карты') : typograph('Competitors cover individual planning steps: place selection, lists, maps')}
                  </p>
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    — {locale === 'ru' ? typograph('Сборка маршрута, логика перемещения и тайминг остаются на пользователе') : typograph('Route assembly, travel logic, and timing are left to the user')}
                  </p>
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    — {locale === 'ru' ? typograph('Готового решения, формирующего цельный маршрут с учётом времени и логистики, на рынке нет') : typograph('No existing solution builds a complete route with time and logistics factored in')}
                  </p>
                </div>
              </div>
            </div>
            )}

            {/* Онбординг обновления — 112px from previous block (88px margin + 24px parent gap = 112px) */}
            {caseStudy.id === 'yandex-lavka' && (
              <Suspense>
                <LavkaCase
                  locale={locale}
                  benchmarkingLogos={benchmarkingLogos}
                  activePersona={activePersona}
                  setActivePersona={setActivePersona}
                  mobileOnboardingSlide={mobileOnboardingSlide}
                  onboardingScrollRef={onboardingScrollRef}
                  handleOnboardingScroll={handleOnboardingScroll}
                  activeTestChip={activeTestChip}
                  setActiveTestChip={setActiveTestChip}
                />
              </Suspense>
            )}

            {caseStudy.id === 't-bank' && (
              <Suspense>
                <TBankCase
                  locale={locale}
                  activePersona={activePersona}
                  setActivePersona={setActivePersona}
                  activeTbankTestChip={activeTbankTestChip}
                  setActiveTbankTestChip={setActiveTbankTestChip}
                />
              </Suspense>
            )}

          </section>
        </div>
      </div>
    </div>
    </>
  );
}
