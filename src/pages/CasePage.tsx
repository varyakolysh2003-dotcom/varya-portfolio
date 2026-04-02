import { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cases } from '../data/cases';
import { ScrollToTop } from '../components/ScrollToTop';
import { useLocale } from '../context/LocaleContext';
import { typograph } from '../utils/typograph';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { CaseStudy } from '../types';

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

/** T-Bank testing block: prototype screens in filename order (same for RU/EN). */
const TBANK_TESTING_PROTOTYPE_IMAGES = [
  '/covers/T-bank/1_1.webp',
  '/covers/T-bank/1_2.webp',
  '/covers/T-bank/1_3.webp',
  '/covers/T-bank/1_4.webp',
] as const;

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
    '/covers/okolo/1.png',
    '/covers/okolo/2.png',
    '/covers/okolo/3.png',
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

    {/* Sticky side navigation — visible only on wide screens */}
    {(caseStudy.id === 'yandex-lavka' || caseStudy.id === 't-bank' || caseStudy.id === 'okolo') && (
      <nav
        className="hidden xl:flex flex-col gap-[12px] fixed z-50"
        style={{
          top: 120,
          left: 56,
          width: 230,
        }}
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

    {/* Mobile sticky sections menu */}
    {(caseStudy.id === 'yandex-lavka' || caseStudy.id === 't-bank' || caseStudy.id === 'okolo') && (
      <nav
        className="xl:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border)]"
        style={{ padding: '10px 16px' }}
      >
        <div className="relative" ref={mobileSectionsRef}>
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-sans font-semibold text-[16px] text-[var(--color-text-primary)] no-underline"
            >
              <img src="/Icons/arrow-sm-left.svg" alt="" className="w-5 h-5" />
              {locale === 'ru' ? 'Назад' : 'Back'}
            </Link>

            <button
              type="button"
              onClick={() => setMobileSectionsOpen((v) => !v)}
              className="shrink-0 inline-flex items-center justify-center w-[40px] h-[40px] rounded-[14px] bg-[#F1F1F1]"
              aria-label={locale === 'ru' ? 'Разделы' : 'Sections'}
              aria-expanded={mobileSectionsOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-secondary)' }}>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
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

    <div className="case-container page-enter min-h-dvh bg-[var(--color-bg)] flex justify-center items-start pt-[64px] xl:pt-[32px] pb-[84px] px-4 md:px-8 xl:px-[60px]">
      <div className="max-w-[880px] w-full">
        <Link
          to="/"
          className="hidden xl:inline-flex items-center gap-2 font-sans font-semibold text-[20px] text-[var(--color-text-primary)] no-underline hover:underline"
        >
          <img src="/Icons/arrow-sm-left.svg" alt="" className="w-5 h-5" />
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
                <img
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
                <img
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
                    <img
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

            {/* Custdev и анализ персон — Okolo */}
            {caseStudy.id === 'okolo' && (
            <div className="flex flex-col gap-[24px]" style={{ marginTop: 88, scrollMarginTop: 32 }}>
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Custdev и анализ персон' : 'Custdev and Persona Analysis'}
                </h2>
                {/* Link temporarily hidden — table not ready yet */}
                <a
                  href="https://docs.google.com/spreadsheets/d/1LRl-KDdeQimxpKBun8hETvOJCzPieYxeCYp-0cD6-xk/edit?gid=1347481814#gid=1347481814"
                  target="_blank"
                  rel="noreferrer"
                  className="case-link"
                  style={{ display: 'none' }}
                >
                  {locale === 'ru' ? typograph('Полная таблица анализа опроса и персон') : typograph('Full survey and persona analysis table')}
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                {/* Left column — persona tab cards */}
                <div className="no-scrollbar flex flex-row gap-[8px] overflow-x-auto pb-[2px] md:flex-col md:overflow-visible md:pb-0 md:gap-[24px]">
                  {([
                    { id: 'families' as const, title: locale === 'ru' ? 'Семьи' : 'Families', desc: locale === 'ru' ? typograph('Семьи из 2+ человек с регулярными совместными покупками') : typograph('Families of 2+ people with regular joint purchases') },
                    { id: 'friends' as const, title: locale === 'ru' ? 'Парочки' : 'Couples', desc: locale === 'ru' ? typograph('Пары, живущие вместе или встречающиеся, ценящие удобство и совместные покупки') : typograph('Couples living together or dating who value convenience and joint shopping') },
                    { id: 'colleagues' as const, title: locale === 'ru' ? 'Коллеги' : 'Colleagues', desc: locale === 'ru' ? typograph('Офисные сотрудники и команды, организаторы корпоративов и встреч') : typograph('Office workers, remote teams, corporate event organizers') },
                    { id: 'couples' as const, title: locale === 'ru' ? 'Друзья' : 'Friends', desc: locale === 'ru' ? typograph('Компании, которые часто собираются вместе на вечеринки, просмотр фильмов, настольные игры, пикники') : typograph('Groups of friends who often get together for parties, movie nights, board games, and picnics') },
                  ]).map((persona) => (
                    <button
                      key={persona.id}
                      type="button"
                      onClick={(e) => { setActivePersona(persona.id); if (window.innerWidth < 768) {
          const btn = e.currentTarget;
          const c = btn.parentElement;
          if (c) {
            const peek = 44;
            const bL = btn.offsetLeft;
            const bR = bL + btn.offsetWidth;
            const goRight = (bL + btn.offsetWidth / 2) >= (c.scrollLeft + c.clientWidth / 2);
            const max = c.scrollWidth - c.clientWidth;
            let next = c.scrollLeft;
            if (goRight) { const t = bR + peek - c.clientWidth; if (t > next) next = t; }
            else { const t = bL - peek; if (t < next) next = t; }
            c.scrollTo({ left: Math.max(0, Math.min(max, next)), behavior: 'smooth' });
          }
        } }}
                      className="rounded-full text-left shrink-0 px-[14px] py-[8px] md:rounded-[24px] md:p-[24px] md:shrink md:w-full"
                      style={{
                        backgroundColor: activePersona === persona.id ? '#000000' : '#F8F8F8',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <h3
                        className="font-sans text-[14px] font-semibold leading-none md:text-[20px] md:leading-normal"
                        style={{ color: activePersona === persona.id ? '#ffffff' : 'var(--color-text-primary)' }}
                      >
                        {persona.title}
                      </h3>
                      <p
                        className="hidden text-[16px] font-medium md:block"
                        style={{
                          marginTop: 0,
                          color: activePersona === persona.id ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary)',
                        }}
                      >
                        {persona.desc}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Right column — single insight card, content switches */}
                <div className="bg-[#F5F5F5] rounded-[24px]" style={{ padding: 24 }}>
                  <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                    {locale === 'ru' ? 'О ядре категории пользователей' : 'Category Core Insights'}
                  </h3>
                  <div className="flex flex-col gap-[8px]" style={{ marginTop: 8 }}>
                    <p className="text-[15px] font-medium text-[var(--color-text-secondary)] md:hidden" style={{ marginBottom: 4 }}>
                      {({
                        families: locale === 'ru' ? typograph('Семьи из\u00A02+ человек с регулярными совместными покупками') : typograph('Families of 2+ people with regular joint purchases'),
                        friends: locale === 'ru' ? typograph('Пары, живущие вместе или встречающиеся, ценящие удобство и совместные покупки') : typograph('Couples living together or dating who value convenience and joint shopping'),
                        colleagues: locale === 'ru' ? typograph('Офисные сотрудники и команды, организаторы корпоративов и встреч') : typograph('Office workers, remote teams, corporate event organizers'),
                        couples: locale === 'ru' ? typograph('Компании, которые часто собираются вместе на вечеринки, просмотр фильмов, настольные игры, пикники') : typograph('Groups of friends who often get together for parties, movie nights, board games, and picnics'),
                      } as Record<string, string>)[activePersona] ?? ''}
                    </p>
                    {activePersona === 'families' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Семьи часто сталкиваются с отсутствием возможности координировать покупки вместе') : typograph('Families often lack the ability to coordinate purchases together')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Некоторые респонденты признавались, что раздражались, когда их партнер забывал про часть товаров во время покупки, что заставляло их возвращаться в магазин и доплачивать за быструю доставку через сервисы') : typograph('Some respondents admitted frustration when their partner forgot items, forcing them to return to the store or pay for express delivery')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Семьи часто закупают много товаров сразу (с интервалом в 1-3 недели)') : typograph('Families often buy in bulk (every 1-3 weeks)')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Когда семья большая продукты заканчиваются быстрее, создавая необходимость в регулярном пополнении продуктов так, чтобы это не сильно било по бюджету') : typograph('In larger families, products run out faster, creating a need for regular restocking without straining the budget')}
                        </p>
                      </>
                    )}
                    {activePersona === 'couples' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Основной интерес товаров: снэки и закуски') : typograph('Main product interest: snacks and appetizers')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Еда к столу часто нужна в моменте без предварительного планирования') : typograph('Food is often needed on the spot without prior planning')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Молодая аудитория сфокусирована на экономии бюджета') : typograph('Young audience is focused on saving budget')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Товары из доставки часто могут заказываться к уже готовому столу') : typograph('Delivery items are often ordered to complement an already set table')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Аудитория часто делит бюджет пополам или договаривается скинуться на заказ') : typograph('The audience often splits the budget or agrees to chip in')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Ценят скорость обслуживания') : typograph('Value speed of service')}
                        </p>
                      </>
                    )}
                    {activePersona === 'colleagues' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Заказ на всех в офис или коворкинг') : typograph('Orders for everyone in the office or coworking space')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Корпоративные скидки или бонусы') : typograph('Corporate discounts or bonuses')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Им часто нужно укладываться в бюджет и отчетность') : typograph('They often need to stay within budget and reporting requirements')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Товары из доставки часто могут заказываться к уже готовому столу') : typograph('Delivery items are often ordered to complement an already set table')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Чаще всего оплачивает одна сторона') : typograph('Most often, one party pays')}
                        </p>
                      </>
                    )}
                    {activePersona === 'friends' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Их интерес покупок схож с категорией семей') : typograph('Their shopping interests are similar to the families category')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Часто берут сэты или готовую еду') : typograph('Often order sets or ready-made food')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Ценят эмоциональные и атмосферные предложения') : typograph('Emotional and atmospheric offers')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Экономия времени после работы') : typograph('Time saving after work')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Аудитория часто делит бюджет пополам или договаривается скинуться на заказ') : typograph('The audience often splits the budget or agrees to chip in')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Ценят скорость обслуживания') : typograph('Value speed of service')}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Текущие проблемы формы — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div id="section-analysis" className="flex flex-col" style={{ marginTop: 88, scrollMarginTop: 32 }}>
                <div className="flex flex-col gap-[8px]">
                  <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                    {locale === 'ru' ? 'Текущие проблемы формы' : 'Current Form Issues'}
                  </h2>
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/T-bank/1.webp"
                    alt={locale === 'ru' ? 'Проблемы формы — часть 1' : 'Form issues — part 1'}
                    className="block w-full h-auto"
                  />
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/T-bank/2.webp"
                    alt={locale === 'ru' ? 'Проблемы формы — часть 2' : 'Form issues — part 2'}
                    className="block w-full h-auto"
                  />
                </div>
              </div>
            )}

            {/* Пути решения — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 88, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Пути решения' : 'Solution Paths'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <p className="m-0">1. {locale === 'ru' ? typograph('Выбор типа документа: иностранный паспорт, РВП, ВНЖ') : typograph('Document type selection: foreign passport, temporary residence permit, permanent residence permit, arrival registration')}</p>
                  <p className="m-0">2. {locale === 'ru' ? typograph('Если у иностранного гражданина уже имеется кредитная карта Т-Банка, она может помочь в проведении скоринга анализа транзакционной активности по карте, личности и статуса') : typograph('If a foreign citizen already has a T-Bank credit card, it can help with scoring analysis of card transaction activity, identity and status')}</p>
                  <p className="m-0">3. {locale === 'ru' ? typograph('Указать, что на шанс повышения одобрения рассрочки может повлиять открытие кредитной карты и положительная КИ') : typograph('Indicate that opening a credit card and a positive credit history can increase the chance of installment approval')}</p>
                  <p className="m-0">4. {locale === 'ru' ? typograph('Указать, что шанс одобрения рассрочки повышается, если у потребителя имеется ВНЖ') : typograph('Indicate that the chance of installment approval increases if the consumer has a permanent or temporary residence permit')}</p>
                  <p className="m-0">5. {locale === 'ru' ? typograph('Уконкретить условия оформления рассрочки для иностранцев') : typograph('Specify the installment terms for foreign citizens')}</p>
                </div>
              </div>
            )}

            {/* Основные ограничения — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 48 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Основные ограничения' : 'Key Limitations'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('Иностранцы проходят ручное или полуавтоматизированное подтверждение: загранпаспорт, документ о легальности пребывания и SIM-карта РФ — без таких документов рассрочка не подключится')
                      : typograph('Foreign citizens go through manual or semi-automated verification: foreign passport, legal residency document and Russian SIM card — without these documents, installment cannot be activated')}
                  </p>
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('В поддержке ответили, что именно нужно, чтобы у\u00A0иностранца была возможность оформить такую же карту, мне ответили почти дословно так:')
                      : typograph('Support replied what exactly is needed for a foreign citizen to apply for a similar card, they responded almost verbatim:')}
                  </p>
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('— кредитную карту для иностранца вероятнее одобрят при наличии дебетовой карты с\u00A0оборотом покупок и\u00A0прочих операций — то есть, чтобы просто было видно, что клиент-иностранец пользуется картой и\u00A0она не\u00A0пылится на\u00A0полке')
                      : typograph('— a credit card for a foreigner is more likely to be approved with an active debit card with purchase and transaction turnover — meaning it should simply be visible that the foreign client uses the card')}
                  </p>
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('— актуальные данные всех документов, причем это все можно проверить в\u00A0профиле приложения')
                      : typograph('— up-to-date data of all documents, which can all be verified in the app profile')}
                  </p>
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('Иностранцам требуется несколько месяцев вести активный счет (оплачивать покупки, держать баланс), прежде чем к ним станет возможен минимальный уровень доверия для выдачи рассрочки. Сразу после получения кредитки таких возможностей нет')
                      : typograph('Foreign citizens need several months of active account usage (making purchases, maintaining balance) before a minimum level of trust for installment issuance becomes possible. Immediately after receiving a credit card, such options are not available')}
                  </p>
                </div>
              </div>
            )}

            {/* POS-система — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 48 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'POS-система' : 'POS System'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('POS-рассрочка через магазин ориентирована на\u00A0паспорта РФ и\u00A0БКИ, а\u00A0иностранный паспорт не\u00A0подходит для автоматической проверки.')
                      : typograph('POS installment through a store is oriented towards Russian passports and credit bureaus, while a foreign passport is not suitable for automated verification.')}
                  </p>
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('Как данные кредитной карты могут помочь: Банк видит историю платежей по\u00A0своей карте:')
                      : typograph('How credit card data can help: The bank sees the payment history on its card:')}
                  </p>
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('— своевременные погашения')
                      : typograph('— timely repayments')}
                  </p>
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('— регулярные расходы')
                      : typograph('— regular expenses')}
                  </p>
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('— лимиты и\u00A0задолженности')
                      : typograph('— limits and debts')}
                  </p>
                </div>
              </div>
            )}

            {/* Что уже известно — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 88, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Что уже известно' : 'What is already known'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('«Теперь про саму кредитную карту для иностранных граждан. Мне одобрили лимит 60\u00A0000\u00A0рублей. Беспроцентный период до\u00A055\u00A0дней и\u00A0работает это так: покупаешь в\u00A0течение месяца после выписки, и\u00A0потом у\u00A0тебя есть 25\u00A0дней на\u00A0погашение до\u00A0даты платежа. Тут еще раз спасибо поддержке за\u00A0понятные объяснения. Интересно, что перевод денег с\u00A0кредитки на\u00A0дебетовую или любым другим людям в\u00A0другие банки по\u00A0СБП — тоже входит в\u00A0беспроцентный период как и\u00A0покупки, в\u00A0том числе за\u00A0границу. То есть, с\u00A0кредитки можно в\u00A0беспроцентный период перевести деньги на\u00A0родину. Знаю что коллеги из\u00A0других стран так тоже делают»')
                      : typograph('"Now about the credit card itself for foreign citizens. I was approved for a 60,000 ruble limit. Interest-free period up to 55 days and it works like this: you buy within a month after the statement, and then you have 25 days to repay before the payment date. Thanks again to support for clear explanations. Interestingly, transferring money from the credit card to a debit card or to anyone else via SBP is also included in the interest-free period, just like purchases, including abroad. That is, you can transfer money home during the interest-free period. I know colleagues from other countries do the same."')}
                  </p>
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('«Банку тогда предоставил паспорт и\u00A0миграционку, потому что сразу знал, что срок пребывания будет дольше 90\u00A0дней (вообще не\u00A0знаю как у\u00A0всех иностранных граждан, но\u00A0белорусам можно без\u00A0проблем находиться в\u00A0России без\u00A0миграционки, но\u00A0до\u00A0определенного срока пребывания).»')
                      : typograph('"I provided the bank with my passport and migration card, because I knew right away that my stay would be longer than 90 days (I don\'t know about all foreign citizens, but Belarusians can stay in Russia without a migration card, but up to a certain period of stay)."')}
                  </p>
                  <a
                    href="https://vc.ru/life/2132957-kredit-dlya-inostrannyh-grazhdan-v-tinkoff?utm_source=chatgpt.com"
                    target="_blank"
                    rel="noreferrer"
                    className="case-link"
                    style={{ marginTop: 8 }}
                  >
                    {locale === 'ru'
                      ? typograph('Источник: Кредит для иностранных граждан в\u00A0Тинькофф (Т-Банке) — реально ли\u00A0получить (02.08.2025)')
                      : typograph('Source: Credit for foreign citizens at Tinkoff (T-Bank) — is it realistic to get (02.08.2025)')}
                  </a>
                </div>
              </div>
            )}

            {/* Custdev и анализ персон — T-Bank only */}
            {caseStudy.id === 't-bank' && (
            <div className="flex flex-col gap-[24px]" style={{ marginTop: 84 }}>
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Custdev и анализ персон' : 'Custdev and Persona Analysis'}
                </h2>
                {/* Link temporarily hidden — table not ready yet
                <a
                  href="https://docs.google.com/spreadsheets/d/1LRl-KDdeQimxpKBun8hETvOJCzPieYxeCYp-0cD6-xk/edit?gid=1347481814#gid=1347481814"
                  target="_blank"
                  rel="noreferrer"
                  className="case-link"
                >
                  {locale === 'ru' ? typograph('Полная таблица анализа опроса и персон') : typograph('Full survey and persona analysis table')}
                </a>
                */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:items-start">
                {/* Left column — persona tab cards */}
                <div className="no-scrollbar flex flex-row gap-[8px] overflow-x-auto pb-[2px] md:flex-col md:overflow-visible md:pb-0 md:gap-[24px]">
                  {([
                    { id: 'rvp' as const, title: locale === 'ru' ? 'Иностранцы с РВП' : 'Foreigners with TRP', desc: locale === 'ru' ? typograph('Находятся в переходном статусе: уже работают, но ограничены в доступе к кредитным продуктам и долгосрочному финансовому планированию из-за временного характера разрешения') : typograph('In a transitional status: already employed, but limited in access to credit products and long-term financial planning due to the temporary nature of their permit') },
                    { id: 'vnzh' as const, title: locale === 'ru' ? 'Иностранцы с ВНЖ' : 'Foreigners with RP', desc: locale === 'ru' ? typograph('Наиболее интегрированный сегмент: имеют стабильный доход, пользуются банковскими продуктами, но сталкиваются с отказами и ограничениями, нетипичными для граждан') : typograph('The most integrated segment: have stable income, use banking products, but face rejections and restrictions atypical for citizens') },
                  ]).map((persona) => (
                    <button
                      key={persona.id}
                      type="button"
                      onClick={(e) => { setActivePersona(persona.id); if (window.innerWidth < 768) {
          const btn = e.currentTarget;
          const c = btn.parentElement;
          if (c) {
            const peek = 44;
            const bL = btn.offsetLeft;
            const bR = bL + btn.offsetWidth;
            const goRight = (bL + btn.offsetWidth / 2) >= (c.scrollLeft + c.clientWidth / 2);
            const max = c.scrollWidth - c.clientWidth;
            let next = c.scrollLeft;
            if (goRight) { const t = bR + peek - c.clientWidth; if (t > next) next = t; }
            else { const t = bL - peek; if (t < next) next = t; }
            c.scrollTo({ left: Math.max(0, Math.min(max, next)), behavior: 'smooth' });
          }
        } }}
                      className="rounded-full text-left shrink-0 px-[14px] py-[8px] md:rounded-[24px] md:p-[24px] md:shrink md:w-full"
                      style={{
                        backgroundColor: activePersona === persona.id ? '#000000' : '#F8F8F8',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <h3
                        className="font-sans text-[14px] font-semibold leading-none md:text-[20px] md:leading-normal"
                        style={{ color: activePersona === persona.id ? '#ffffff' : 'var(--color-text-primary)' }}
                      >
                        {persona.title}
                      </h3>
                      <p
                        className="hidden text-[16px] font-medium md:block"
                        style={{
                          marginTop: 0,
                          color: activePersona === persona.id ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary)',
                        }}
                      >
                        {persona.desc}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Right column — single insight card, content switches */}
                <div className="bg-[#F5F5F5] rounded-[24px]" style={{ padding: 24 }}>
                  <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                    {locale === 'ru' ? 'О ядре категории пользователей' : 'Category Core Insights'}
                  </h3>
                  <div className="flex flex-col gap-[8px]" style={{ marginTop: 8 }}>
                    <p className="text-[15px] font-medium text-[var(--color-text-secondary)] md:hidden" style={{ marginBottom: 4 }}>
                      {({
                        rvp: locale === 'ru' ? typograph('Находятся в переходном статусе: уже работают, но ограничены в доступе к кредитным продуктам из-за временного характера разрешения') : typograph('In a transitional status: already employed, but limited in access to credit products due to the temporary nature of their permit'),
                        vnzh: locale === 'ru' ? typograph('Наиболее интегрированный сегмент: имеют стабильный доход, пользуются банковскими продуктами, но сталкиваются с отказами и ограничениями') : typograph('The most integrated segment: have stable income, use banking products, but face rejections and restrictions atypical for citizens'),
                      } as Record<string, string>)[activePersona] ?? ''}
                    </p>
                    {activePersona === 'rvp' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Статус РВП создаёт неопределённост,пользователь уже зарабатывает и тратит, но не может получить рассрочку на стандартных условиях') : typograph('TRP status creates uncertainty: the user already earns and spends locally but cannot get a loan, mortgage, or installment plan on standard terms')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Паттерн переводов двунаправленный: часть дохода отправляется семье, часть остаётся на локальные нужды — продукт должен поддерживать оба сценария') : typograph('Transfer pattern is bidirectional: part of income is sent to family, part stays for local needs — the product must support both scenarios')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Языковой барьер в интерфейсах и документах остаётся критичным: ошибки в заполнении форм приводят к отказам, которые воспринимаются как дискриминация') : typograph('Language barrier in interfaces and documents remains critical: errors in filling out forms lead to rejections perceived as discrimination')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Ожидания от продукта: прозрачные условия, предсказуемые комиссии и понятный статус заявки — без скрытых требований, которые выясняются только при отказе') : typograph('Product expectations: transparent terms, predictable fees, and clear application status — no hidden requirements discovered only upon rejection')}
                        </p>
                      </>
                    )}
                    {activePersona === 'vnzh' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Несмотря на стабильный статус, ВНЖ не приравнивается к гражданству в скоринговых моделях банков — это ключевой friction point при попытке получить кредитные продукты') : typograph('Despite stable status, residence permit is not equated to citizenship in bank scoring models — this is the key friction point when trying to obtain credit products')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Долгосрочное планирование возможно, но ограничено, пользователи готовы к ипотеке и инвестициям, однако банки не предлагают адаптированных продуктов под этот сегмент') : typograph('Long-term planning is possible but limited: users are ready for mortgages and investments, yet banks do not offer adapted products for this segment')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Переводы за рубеж сохраняются, но их доля в бюджете снижается — растёт потребность в локальных финансовых инструментах') : typograph('International transfers persist but their share of the budget decreases — demand grows for local financial instruments: savings accounts, insurance, subscriptions')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Сегмент наиболее чувствителен к качеству сервиса, негативный опыт (отказ без объяснения, повторный запрос документов) приводит к оттоку в банки с более лояльной политикой к нерезидентам') : typograph('This segment is most sensitive to service quality: negative experience (rejection without explanation, repeated document requests) leads to churn toward banks with more loyal policies for non-residents')}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Результаты Drop-off из Custdev интервью — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col" style={{ marginTop: 48 }}>
                <div className="flex flex-col gap-[8px]">
                  <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                    {locale === 'ru' ? 'Результаты Drop-off из\u00A0Custdev интервью' : 'Drop-off Results from Custdev Interviews'}
                  </h2>
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/T-bank/4.webp"
                    alt={locale === 'ru' ? 'Результаты Drop-off — часть 1' : 'Drop-off results — part 1'}
                    className="block w-full h-auto origin-center scale-[1.007]"
                  />
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/T-bank/3.webp"
                    alt={locale === 'ru' ? 'Результаты Drop-off — часть 2' : 'Drop-off results — part 2'}
                    className="block w-full h-auto origin-center scale-[1.007]"
                  />
                </div>
              </div>
            )}

            {/* Слабые точки пути пользователей — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="bg-[#F5F5F5] rounded-[24px] flex flex-col gap-[8px]" style={{ padding: 24, marginTop: 32 }}>
                <h2 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Слабые точки пути пользователей пришлись на:' : 'User journey weak points were:'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <p className="m-0">1. {locale === 'ru' ? typograph('«Как оформить» предоставляет информацию для граждан РФ') : typograph('"How to apply" provides information for Russian citizens')}</p>
                  <p className="m-0">2. {locale === 'ru' ? typograph('Форма поддерживает только два вида языка') : typograph('The form supports only two languages')}</p>
                  <p className="m-0">3. {locale === 'ru' ? typograph('Форма поддерживает только заполнение под паспорт РФ') : typograph('The form only supports Russian passport data entry')}</p>
                </div>
              </div>
            )}

            {/* JTBD — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 48 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  JTBD
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px] items-stretch" style={{ marginTop: 16 }}>
                  {(
                    locale === 'ru'
                      ? [
                          { prefix: 'Когда я', text: 'оформляю рассрочку через интернет магазин,' },
                          { prefix: 'я хочу', text: 'заполнить форму, имеющую ввод иностранных данных,' },
                          { prefix: 'чтобы', text: 'завершить процесс оформления покупки' },
                          { prefix: 'Когда я', text: 'заполняю форму на онлайн рассрочку,' },
                          { prefix: 'я хочу', text: 'знать проценты одобрения под свою форму документов,' },
                          { prefix: 'чтобы', text: 'оценить риск отказа' },
                          { prefix: 'Когда я', text: 'оформлю кредитную карту для иностранцев в Т-банке' },
                          { prefix: 'я хочу', text: 'знать, как это повлияет на процент одобрения моей рассрочки' },
                          { prefix: 'чтобы', text: 'у меня была мотивация улучшать свою КИ по выделенному лимиту и повысить шанс одобрения' },
                          { prefix: 'Когда я', text: 'открываю форму заполнения данных перед оформлением рассрочки' },
                          { prefix: 'я хочу', text: 'чтобы она поддерживала больше двух языков' },
                          { prefix: 'чтобы', text: 'я мог заполнить поля ввода правильно' },
                        ]
                      : [
                          { prefix: 'When I', text: 'apply for installment through an online store,' },
                          { prefix: 'I want', text: 'to fill a form that accepts foreign document input,' },
                          { prefix: 'so that', text: 'I can complete the purchase process' },
                          { prefix: 'When I', text: 'fill in an online installment form,' },
                          { prefix: 'I want', text: 'to know approval rates for my document type,' },
                          { prefix: 'so that', text: 'I can estimate rejection risk' },
                          { prefix: 'When I', text: 'open a T-Bank credit card for foreigners,' },
                          { prefix: 'I want', text: 'to understand how it affects my installment approval rate' },
                          { prefix: 'so that', text: 'I stay motivated to improve my credit history and increase approval chances' },
                          { prefix: 'When I', text: 'open the data entry form before installment application,' },
                          { prefix: 'I want', text: 'it to support more than two languages' },
                          { prefix: 'so that', text: 'I can fill in the fields correctly' },
                        ]
                  ).map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#F4F4F4] rounded-[20px] h-auto text-left"
                      style={{ padding: '16px 20px', boxSizing: 'border-box' }}
                    >
                      <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.45]">
                        <span className="font-semibold text-[var(--color-text-primary)]">{typograph(item.prefix)}</span>{' '}
                        {typograph(item.text)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Архитектура — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Архитектура' : 'Architecture'}
                </h2>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/T-bank/5.webp"
                    alt={locale === 'ru' ? 'Архитектура' : 'Architecture'}
                    className="block w-full h-auto"
                  />
                </div>
              </div>
            )}

            {/* Экраны — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col" style={{ marginTop: 40 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Экраны' : 'Screens'}
                </h2>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden"
                  style={{ marginTop: 20, padding: 0, height: 'auto', lineHeight: 0 }}
                >
                  <img
                    src="/covers/T-bank/6.webp"
                    alt={locale === 'ru' ? 'Экраны' : 'Screens'}
                    className="block w-full h-auto origin-center scale-[1.007]"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            )}

            {/* Локализация — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div id="section-solutions" className="flex flex-col gap-[8px]" style={{ marginTop: 48, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Локализация' : 'Localization'}
                </h2>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Если анкета и\u00A0коммуникации с\u00A0банком доступны только на\u00A0русском, часть иностранных пользователей (особенно без сильного знания языка) может не\u00A0справиться с\u00A0заполнением полей для ввода, как следствие: увеличение роста отказа от\u00A0попытки заполнить форму дальше')
                    : typograph('If the application form and bank communications are only available in Russian, some foreign users (especially those without strong language skills) may struggle to fill in the input fields, resulting in an increased drop-off rate from attempting to complete the form')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden"
                  style={{ marginTop: 16 }}
                >
                  <div className="relative w-full overflow-hidden leading-none">
                    <img
                      src="/covers/T-bank/1_1.webp"
                      alt={locale === 'ru' ? 'Локализация' : 'Localization'}
                      className="block w-full h-auto max-w-none origin-center scale-[1.055]"
                      style={{ marginTop: 8 }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Варианты перевода — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col" style={{ marginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Варианты перевода' : 'Translation Variants'}
                </h2>
                <div className="flex flex-col gap-[24px]" style={{ marginTop: 24 }}>
                  {[
                    { label: 'Kazakh', src: '/covers/T-bank/Kazakhskyu.webp' },
                    { label: 'Kyrgyz', src: '/covers/T-bank/Kyrgyzskyu.webp' },
                    { label: 'Tajik', src: '/covers/T-bank/Tadjitsky.webp' },
                    { label: 'Uzbek', src: '/covers/T-bank/Uzbekskyu.webp' },
                    { label: 'Belarusian', src: '/covers/T-bank/Belorussky.webp' },
                  ].map(({ label, src }) => (
                    <div key={label} className="w-full rounded-[var(--radius-media)] overflow-hidden">
                      <div className="relative w-full overflow-hidden leading-none">
                        <img
                          src={src}
                          alt={label}
                          className="block w-full h-auto max-w-none origin-center scale-[1.02]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Внести ясность получения рассрочки — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Внести ясность получения рассрочки' : 'Clarifying Installment Approval'}
                </h2>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Сейчас условия и\u00A0вероятность одобрения рассрочки для иностранных граждан с\u00A0разными типами документов остаются недостаточно прозрачными. Чтобы узнать больше информации об\u00A0условиях в\u00A0Т-банке нужно искать подходящие статьи вручную. Отдельный раздел с\u00A0переходом на\u00A0официальные источники поможет снизить риск дезинформации и\u00A0следить за\u00A0актуальными условиями')
                    : typograph('Currently, the conditions and likelihood of installment approval for foreign citizens with different document types remain insufficiently transparent. To learn more about the conditions at T-Bank, one needs to search for relevant articles manually. A dedicated section with links to official sources will help reduce the risk of misinformation and keep track of current conditions')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden"
                  style={{ marginTop: 16 }}
                >
                  <div className="relative w-full overflow-hidden leading-none">
                    <img
                      src="/covers/T-bank/8.webp"
                      alt={locale === 'ru' ? 'Внести ясность получения рассрочки' : 'Clarifying Installment Approval'}
                      className="block w-full h-auto max-w-none origin-center scale-[1.055]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Расширение типов документов в анкете — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Расширение типов документов в\u00A0анкете' : 'Expanding Document Types in the Application'}
                </h2>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Разные типы документов требуют разных данных для заполнения. Если форма будет предусматривать больше вариантов ввода документов и\u00A0стран, пользователи смогут корректно заполнить анкету с\u00A0первого раза')
                    : typograph('Different document types require different data to fill in. If the form accommodates more document and country input options, users will be able to correctly complete the application on the first attempt')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] leading-none"
                  style={{ marginTop: 16 }}
                >
                  <img
                    src="/covers/T-bank/9.webp"
                    alt={locale === 'ru' ? 'Расширение типов документов в анкете' : 'Expanding Document Types'}
                    className="block w-full h-auto"
                  />
                </div>
              </div>
            )}

            {/* Экран 10 — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div
                className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] leading-none"
                style={{ marginTop: 24 }}
              >
                <img
                  src="/covers/T-bank/10.webp"
                  alt={locale === 'ru' ? 'Расширение типов документов' : 'Expanding Document Types'}
                  className="block w-full h-auto"
                />
              </div>
            )}

            {/* Предварительная оценка шанса одобрения — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Предварительная оценка шанса одобрения' : 'Preliminary Approval Chance Assessment'}
                </h2>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Если динамически показывать вероятность одобрения на\u00A0основе типа документа и\u00A0дохода, пользователь получит прозрачную обратную связь на\u00A0каждом шаге — это снизит неопределённость и\u00A0повысит готовность продолжить оформление')
                    : typograph('If the approval probability is shown dynamically based on document type and income, the user gets transparent feedback at every step — reducing uncertainty and increasing willingness to continue the application')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] leading-none"
                  style={{ marginTop: 16 }}
                >
                  <img
                    src="/covers/T-bank/11.webp"
                    alt={locale === 'ru' ? 'Предварительная оценка шанса одобрения' : 'Preliminary Approval Chance Assessment'}
                    className="block w-full h-auto origin-center scale-[0.992]"
                  />
                </div>
              </div>
            )}

            {/* Кредитная карта для иностранцев — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Кредитная карта для иностранцев' : 'Credit Card for Foreigners'}
                </h2>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('По данным desk research, наличие кредитной карты положительно влияет на\u00A0кредитную историю иностранного гражданина. Если явно показывать пользователю, что это повышает вероятность одобрения, это снизит неопределённость и\u00A0повысит конверсию в\u00A0завершение заявки, а\u00A0отдельный блок с\u00A0переходом к\u00A0оформлению упростит вход через внутренние ссылки от\u00A0Т-Банка')
                    : typograph('According to desk research, having a credit card positively affects a foreign citizen\'s credit history. Explicitly showing the user that this increases approval probability reduces uncertainty and boosts application completion, while a dedicated block with a link to apply simplifies entry through T-Bank\'s internal links')}
                </p>

                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] leading-none"
                  style={{ marginTop: 16 }}
                >
                  <img
                    src="/covers/T-bank/12.webp"
                    alt={locale === 'ru' ? 'Предварительная оценка шанса одобрения' : 'Preliminary Approval Chance Assessment'}
                    className="block w-full h-auto origin-center scale-[0.992]"
                  />
                </div>
              </div>
            )}

            {/* Тестирование — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Тестирование' : 'Testing'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Для проверки гипотез я разработала обновлённой формы подачи заявки на\u00A0рассрочку и использовала метод опроса по экранам уже готовых решений. Сценарий включал заполнение анкеты, выбор типа документа, предварительную оценку одобрения и\u00A0оформление кредитной карты. Прототип был протестирован на\u00A0респондентах из\u00A0сегментов РВП и\u00A0ВНЖ')
                    : typograph('To validate hypotheses, an interactive prototype of the updated installment application form was developed. The scenario included filling out the form, selecting document type, receiving a preliminary approval estimate, and applying for a credit card. The prototype was tested on respondents from the TRP and RP segments.')}
                </p>

                {/* Что было протестировано */}
                <h3
                  className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]"
                  style={{ marginTop: 24 }}
                >
                  {locale === 'ru' ? 'Что было протестировано' : 'What was tested'}
                </h3>

                {/* Filter chips */}
                <div className="no-scrollbar flex flex-nowrap overflow-x-auto gap-[8px] md:flex-wrap md:overflow-visible" style={{ marginTop: 12 }}>
                  {([
                    { ru: 'Локализация интерфейса', en: 'Interface localization' },
                    { ru: 'Расширение документов', en: 'Document expansion' },
                    { ru: 'Оценка шанса одобрения', en: 'Approval probability' },
                    { ru: 'Кредитная карта', en: 'Credit card' },
                  ]).map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => { setActiveTbankTestChip(idx); if (window.innerWidth < 768) {
          const btn = e.currentTarget;
          const c = btn.parentElement;
          if (c) {
            const peek = 44;
            const bL = btn.offsetLeft;
            const bR = bL + btn.offsetWidth;
            const goRight = (bL + btn.offsetWidth / 2) >= (c.scrollLeft + c.clientWidth / 2);
            const max = c.scrollWidth - c.clientWidth;
            let next = c.scrollLeft;
            if (goRight) { const t = bR + peek - c.clientWidth; if (t > next) next = t; }
            else { const t = bL - peek; if (t < next) next = t; }
            c.scrollTo({ left: Math.max(0, Math.min(max, next)), behavior: 'smooth' });
          }
        } }}
                      className="skill-pill whitespace-nowrap border-none cursor-pointer rounded-[24px] inline-flex items-center justify-center"
                      style={{
                        padding: '10px 12px',
                        lineHeight: 1,
                        backgroundColor: activeTbankTestChip === idx ? '#000000' : '#F1F1F1',
                        color: activeTbankTestChip === idx ? '#ffffff' : 'rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      {locale === 'ru' ? chip.ru : chip.en}
                    </button>
                  ))}
                </div>

                {/* Prototype result card */}
                <div
                  className="rounded-[var(--radius-media)] bg-[#F5F5F5] overflow-hidden"
                  style={{ marginTop: 24 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
                    {/* Left — text column with 16px padding */}
                    <div className="flex flex-col gap-[8px]" style={{ padding: '16px' }}>
                      <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                        {locale === 'ru' ? 'Контекст' : 'Context'}
                      </h3>
                      <p className="text-[16px] font-medium text-[var(--color-text-secondary)]" style={{ margin: 0 }}>
                        {activeTbankTestChip === 1
                          ? (locale === 'ru'
                            ? typograph('Проверяла, снижает\u00A0ли расширение списка принимаемых документов количество отказов на\u00A0этапе верификации и как меняется конверсия на\u00A0завершение заявки')
                            : typograph('Tested whether expanding the list of accepted documents reduces rejections at verification and increases application completion rate.'))
                          : activeTbankTestChip === 2
                          ? (locale === 'ru'
                            ? typograph('Проверяла, повышает\u00A0ли динамическое отображение вероятности одобрения готовность пользователя продолжить оформление и\u00A0снижает\u00A0ли ощущение неопределённости')
                            : typograph('Tested whether dynamically displaying approval probability increases user willingness to continue and reduces uncertainty.'))
                          : activeTbankTestChip === 3
                          ? (locale === 'ru'
                            ? typograph('Проверяла, влияет\u00A0ли предложение кредитной карты для иностранцев на\u00A0восприятие шансов одобрения и\u00A0готовность оформить дополнительный продукт')
                            : typograph('Tested whether the credit card offer for foreigners affects perceived approval chances and willingness to apply for an additional product.'))
                          : (locale === 'ru'
                            ? typograph('Оценивала, как влияет\u00A0 переключение языка интерфейса на\u00A0скорость и\u00A0точность заполнения формы у респондентов, а\u00A0также на\u00A0уровень доверия к\u00A0сервису')
                            : typograph('Tested whether interface language switching affects form completion speed and accuracy, as well as trust in the service.'))
                        }
                      </p>
                      <h3
                        className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]"
                        style={{ marginTop: 16 }}
                      >
                        {locale === 'ru' ? 'Выводы' : 'Conclusions'}
                      </h3>
                      <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                        {activeTbankTestChip === 1 ? (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Пользователи с\u00A0нестандартными документами проходили верификацию без ручного обращения в\u00A0поддержку или отказа от заполнения формы') : typograph('— Users with non-standard documents passed verification without manual support requests')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Конверсия в\u00A0завершение заявки выросла за\u00A0счёт устранения тупикового сценария на\u00A0этапе выбора документа') : typograph('— Application completion rate increased by eliminating the dead-end scenario at the document selection step')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Респонденты отметили, что наличие знакомого типа документа в\u00A0списке повысило доверие к\u00A0сервису') : typograph('— Respondents noted that seeing a familiar document type in the list increased trust in the service')}</p>
                          </>
                        ) : activeTbankTestChip === 2 ? (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Индикатор вероятности одобрения снизил тревожность и\u00A0повысил готовность продолжить оформление') : typograph('— The approval probability indicator reduced anxiety and increased willingness to continue')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Пользователи воспринимали шкалу как прозрачную обратную связь, а\u00A0не как маркетинговый элемент') : typograph('— Users perceived the scale as transparent feedback, not a marketing element')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Динамическое обновление оценки при изменении данных мотивировало заполнять форму полностью') : typograph('— Dynamic estimate updates when changing data motivated users to complete the form fully')}</p>
                          </>
                        ) : activeTbankTestChip === 3 ? (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Предложение кредитной карты воспринималось как логичный шаг для улучшения кредитной истории') : typograph('— The credit card offer was perceived as a logical step to improve credit history')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Блок с\u00A0переходом к\u00A0оформлению не\u00A0вызывал раздражения благодаря контекстной подаче') : typograph('— The application block did not cause irritation due to contextual presentation')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Респонденты отметили, что явная связь карты с\u00A0вероятностью одобрения повышает мотивацию к\u00A0оформлению') : typograph('— Respondents noted that the explicit link between the card and approval probability increases motivation to apply')}</p>
                          </>
                        ) : (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Переключение на\u00A0родной язык сократило время заполнения формы и\u00A0снизило количество ошибок среди иностранцев со слабым русским') : typograph('— Switching to a native language reduced form completion time and errors among respondents with limited Russian proficiency')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Пользователи чувствовали себя увереннее при заполнении юридических полей на\u00A0знакомом языке') : typograph('— Users felt more confident filling in legal fields in a familiar language')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Локализация воспринималась как знак того, что банк учитывает потребности иностранных клиентов, тем самым повышая лояльность') : typograph('— Localization was perceived as a sign that the bank considers the needs of foreign clients')}</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right — image column, touches top/right/bottom edges */}
                    <div className="flex items-stretch overflow-hidden" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)', borderRadius: '24px' }}>
                      <img
                        src={TBANK_TESTING_PROTOTYPE_IMAGES[activeTbankTestChip] ?? TBANK_TESTING_PROTOTYPE_IMAGES[0]}
                        alt={locale === 'ru' ? 'Экраны прототипа' : 'Prototype screens'}
                        className="w-full h-full object-cover object-left-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Насколько реалистичный прогноз? — T-Bank only */}
            {caseStudy.id === 't-bank' && (
              <div id="section-testing" className="flex flex-col gap-[8px]" style={{ marginTop: 84, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Насколько реалистичный прогноз?' : 'How Realistic Is This Forecast?'}
                </h2>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Основными барьерами остаются сложность удалённой идентификации, отсутствие кредитной истории в\u00A0российских бюро, повышенные требования к\u00A0комплаенсу и\u00A0рискам невозврата. Именно поэтому большинство банков по-прежнему требуют личный визит в\u00A0офис. Тем не\u00A0менее рынок иностранных граждан в\u00A0России значителен, а\u00A0финтех постепенно цифровизирует. Например через онлайн форму\u00A0+ курьера или видео-KYC проверку')
                    : typograph('Legislation does not prohibit issuing loans to non-residents with proper documents, but the main barriers remain the complexity of remote identification, lack of credit history in Russian bureaus, increased compliance requirements and non-repayment risks. That is why most banks still require an in-person office visit. Nevertheless, the market of foreign citizens in Russia is significant, and fintech is gradually digitizing — for example, through online forms + courier or video-KYC verification')}
                </p>
              </div>
            )}

            {/* Бенчмаркинг — 112px from previous block (88px margin + 24px parent gap = 112px) */}
            {caseStudy.id === 'yandex-lavka' && (
            <div id="section-analysis" className="flex flex-col gap-[24px]" style={{ marginTop: 88, scrollMarginTop: 32 }}>
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Бенчмаркинг' : 'Benchmarking'}
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-[12px] max-w-[252px] mx-auto sm:max-w-none sm:mx-0 sm:gap-[24px]">
                {benchmarkingLogos.map((src, idx) => {
                  const total = benchmarkingLogos.length;
                  const isLastRow = idx >= 3;
                  // total=5 → last row has 2 items → start first at col 2, second at col 4
                  const mobileStart =
                    isLastRow && idx === 3 && total === 5
                      ? 'col-start-2'
                      : isLastRow && idx === 4 && total === 5
                        ? 'col-start-4'
                        : '';

                  return (
                  <div
                    key={src}
                    className={`col-span-2 ${mobileStart} w-[72px] h-[72px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-[16px] md:rounded-[24px] overflow-hidden bg-white flex items-center justify-center`}
                  >
                    <img
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
                    — {locale === 'ru' ? typograph('Полноценных аналогов решения совместной корзины на рынке России нет') : typograph('No full analogues of shared cart solution exist on the Russian market')}
                  </p>
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    — {locale === 'ru' ? typograph('Мало выгодных предложений или товаров бюджетного сегмента') : typograph('Few profitable offers or budget segment products')}
                  </p>
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    — {locale === 'ru' ? typograph('Все конкуренты используют персонализацию рекомендаций после совершения покупок') : typograph('All competitors use personalized recommendations after purchases')}
                  </p>
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    — {locale === 'ru' ? typograph('Иконка «поделиться» передаёт только товары по ссылке') : typograph('The share icon only sends cart items via a link')}
                  </p>
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    — {locale === 'ru' ? typograph('Хорошая реализация совместных корзин есть в Instacart и Uber Eats') : typograph('Strong shared-cart implementations exist in Instacart and Uber Eats')}
                  </p>
                </div>
              </div>
            </div>
            )}

            {/* Cust-dev и анализ персон — 112px from previous block (88px margin + 24px parent gap = 112px) */}
            {caseStudy.id === 'yandex-lavka' && (
            <div className="flex flex-col gap-[24px]" style={{ marginTop: 88, scrollMarginTop: 32 }}>
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Custdev и анализ персон' : 'Custdev and Persona Analysis'}
                </h2>
                {/* Link temporarily hidden — table not ready yet */}
                <a
                  href="https://docs.google.com/spreadsheets/d/1LRl-KDdeQimxpKBun8hETvOJCzPieYxeCYp-0cD6-xk/edit?gid=1347481814#gid=1347481814"
                  target="_blank"
                  rel="noreferrer"
                  className="case-link"
                  style={{ display: 'none' }}
                >
                  {locale === 'ru' ? typograph('Полная таблица анализа опроса и персон') : typograph('Full survey and persona analysis table')}
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                {/* Left column — persona tab cards */}
                <div className="no-scrollbar flex flex-row gap-[8px] overflow-x-auto pb-[2px] md:flex-col md:overflow-visible md:pb-0 md:gap-[24px]">
                  {([
                    { id: 'families' as const, title: locale === 'ru' ? 'Семьи' : 'Families', desc: locale === 'ru' ? typograph('Семьи из 2+ человек с регулярными совместными покупками') : typograph('Families of 2+ people with regular joint purchases') },
                    { id: 'friends' as const, title: locale === 'ru' ? 'Парочки' : 'Couples', desc: locale === 'ru' ? typograph('Пары, живущие вместе или встречающиеся, ценящие удобство и совместные покупки') : typograph('Couples living together or dating who value convenience and joint shopping') },
                    { id: 'colleagues' as const, title: locale === 'ru' ? 'Коллеги' : 'Colleagues', desc: locale === 'ru' ? typograph('Офисные сотрудники и команды, организаторы корпоративов и встреч') : typograph('Office workers, remote teams, corporate event organizers') },
                    { id: 'couples' as const, title: locale === 'ru' ? 'Друзья' : 'Friends', desc: locale === 'ru' ? typograph('Компании, которые часто собираются вместе на вечеринки, просмотр фильмов, настольные игры, пикники') : typograph('Groups of friends who often get together for parties, movie nights, board games, and picnics') },
                  ]).map((persona) => (
                    <button
                      key={persona.id}
                      type="button"
                      onClick={(e) => { setActivePersona(persona.id); if (window.innerWidth < 768) {
          const btn = e.currentTarget;
          const c = btn.parentElement;
          if (c) {
            const peek = 44;
            const bL = btn.offsetLeft;
            const bR = bL + btn.offsetWidth;
            const goRight = (bL + btn.offsetWidth / 2) >= (c.scrollLeft + c.clientWidth / 2);
            const max = c.scrollWidth - c.clientWidth;
            let next = c.scrollLeft;
            if (goRight) { const t = bR + peek - c.clientWidth; if (t > next) next = t; }
            else { const t = bL - peek; if (t < next) next = t; }
            c.scrollTo({ left: Math.max(0, Math.min(max, next)), behavior: 'smooth' });
          }
        } }}
                      className="rounded-full text-left shrink-0 px-[14px] py-[8px] md:rounded-[24px] md:p-[24px] md:shrink md:w-full"
                      style={{
                        backgroundColor: activePersona === persona.id ? '#000000' : '#F8F8F8',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <h3
                        className="font-sans text-[14px] font-semibold leading-none md:text-[20px] md:leading-normal"
                        style={{ color: activePersona === persona.id ? '#ffffff' : 'var(--color-text-primary)' }}
                      >
                        {persona.title}
                      </h3>
                      <p
                        className="hidden text-[16px] font-medium md:block"
                        style={{
                          marginTop: 0,
                          color: activePersona === persona.id ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary)',
                        }}
                      >
                        {persona.desc}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Right column — single insight card, content switches */}
                <div className="bg-[#F5F5F5] rounded-[24px]" style={{ padding: 24 }}>
                  <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                    {locale === 'ru' ? 'О ядре категории пользователей' : 'Category Core Insights'}
                  </h3>
                  <div className="flex flex-col gap-[8px]" style={{ marginTop: 8 }}>
                    <p className="text-[15px] font-medium text-[var(--color-text-secondary)] md:hidden" style={{ marginBottom: 4 }}>
                      {({
                        families: locale === 'ru' ? typograph('Семьи из\u00A02+ человек с регулярными совместными покупками') : typograph('Families of 2+ people with regular joint purchases'),
                        friends: locale === 'ru' ? typograph('Пары, живущие вместе или встречающиеся, ценящие удобство и совместные покупки') : typograph('Couples living together or dating who value convenience and joint shopping'),
                        colleagues: locale === 'ru' ? typograph('Офисные сотрудники и команды, организаторы корпоративов и встреч') : typograph('Office workers, remote teams, corporate event organizers'),
                        couples: locale === 'ru' ? typograph('Компании, которые часто собираются вместе на вечеринки, просмотр фильмов, настольные игры, пикники') : typograph('Groups of friends who often get together for parties, movie nights, board games, and picnics'),
                      } as Record<string, string>)[activePersona] ?? ''}
                    </p>
                    {activePersona === 'families' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Семьи часто сталкиваются с отсутствием возможности координировать покупки вместе') : typograph('Families often lack the ability to coordinate purchases together')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Некоторые респонденты признавались, что раздражались, когда их партнер забывал про часть товаров во время покупки, что заставляло их возвращаться в магазин и доплачивать за быструю доставку через сервисы') : typograph('Some respondents admitted frustration when their partner forgot items, forcing them to return to the store or pay for express delivery')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Семьи часто закупают много товаров сразу (с интервалом в 1-3 недели)') : typograph('Families often buy in bulk (every 1-3 weeks)')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Когда семья большая продукты заканчиваются быстрее, создавая необходимость в регулярном пополнении продуктов так, чтобы это не сильно било по бюджету') : typograph('In larger families, products run out faster, creating a need for regular restocking without straining the budget')}
                        </p>
                      </>
                    )}
                    {activePersona === 'couples' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Основной интерес товаров: снэки и закуски') : typograph('Main product interest: snacks and appetizers')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Еда к столу часто нужна в моменте без предварительного планирования') : typograph('Food is often needed on the spot without prior planning')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Молодая аудитория сфокусирована на экономии бюджета') : typograph('Young audience is focused on saving budget')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Товары из доставки часто могут заказываться к уже готовому столу') : typograph('Delivery items are often ordered to complement an already set table')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Аудитория часто делит бюджет пополам или договаривается скинуться на заказ') : typograph('The audience often splits the budget or agrees to chip in')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Ценять скорость обслуживания') : typograph('Value speed of service')}
                        </p>
                      </>
                    )}
                    {activePersona === 'colleagues' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Заказ на всех в офис или коворкинг') : typograph('Orders for everyone in the office or coworking space')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Корпоративные скидки или бонусы') : typograph('Corporate discounts or bonuses')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Им часто нужно укладываться в бюджет и отчетность') : typograph('They often need to stay within budget and reporting requirements')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Товары из доставки часто могут заказываться к уже готовому столу') : typograph('Delivery items are often ordered to complement an already set table')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Чаще всего оплачивает одна сторона') : typograph('Most often, one party pays')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Ценят скорость обслуживания') : typograph('Value speed of service')}
                        </p>
                      </>
                    )}
                    {activePersona === 'friends' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Их интерес покупок схож с категорией семей') : typograph('Their shopping interests are similar to the families category')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Часто берут сэты или готовую еду') : typograph('Often order sets or ready-made food')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Ценят эмоциональные и атмосферные предложения') : typograph('Emotional and atmospheric offers')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Экономия времени после работы') : typograph('Time saving after work')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Аудитория часто делит бюджет пополам или договаривается скинуться на заказ') : typograph('The audience often splits the budget or agrees to chip in')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Ценят скорость обслуживания') : typograph('Value speed of service')}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Онбординг обновления — 112px from previous block (88px margin + 24px parent gap = 112px) */}
            {caseStudy.id === 'yandex-lavka' && (
              <div id="section-solutions" className="flex flex-col" style={{ marginTop: 88, scrollMarginTop: 32 }}>
                <div className="flex flex-col gap-[8px]">
                  <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                    {locale === 'ru' ? 'Онбординг обновления' : 'Feature Onboarding'}
                  </h2>
                  <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                    {locale === 'ru'
                      ? typograph('Иконка «поделиться» без контекста неочевидна. Из custdev опроса следует вывод, что часть пользователей не знала о возможности отправить ссылку на товары из Лавки. Онбординг снижает барьер входа в новый сценарий и развивает функцию «поделиться корзиной», добавляя возможность создавать совместные заказы')
                      : typograph("The 'share' icon without context is not intuitive. Custdev research showed that some users were unaware they could send a link to Lavka items. Onboarding lowers the entry barrier for the new scenario and develops the 'share cart' feature by adding the ability to create shared orders")}
                  </p>
                </div>
                {/* Mobile: one shared background container, one image visible at a time */}
                <div className="md:hidden" style={{ marginTop: 24 }}>
                  <div
                    className="w-full bg-[#F5F5F5] overflow-hidden"
                    style={{ height: '297px', borderRadius: 'var(--radius-media)' }}
                  >
                    <div
                      ref={onboardingScrollRef}
                      onScroll={handleOnboardingScroll}
                      className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
                    >
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center"
                        >
                          <img
                            src={`/covers/YandexLavka materials/Mobile/${n}.webp`}
                            alt={`Onboarding screen ${n}`}
                            style={{
                              width: '125px',
                              height: '270px',
                              objectFit: 'cover',
                              borderRadius: '16px',
                              display: 'block',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pagination dots */}
                  <div className="flex items-center justify-center gap-[6px]" style={{ marginTop: 12 }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#1a1a1a',
                          opacity: mobileOnboardingSlide === i ? 1 : 0.2,
                          transition: 'opacity 200ms ease',
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Desktop/tablet: full-width Onboarding banner */}
                <div
                  className="hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Onboarding.png"
                    alt="Onboarding"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Точка входа в сценарий */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 48 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Точка входа в сценарий' : 'Scenario Entry Point'}
                </h2>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Scenario start.png"
                    alt={locale === 'ru' ? 'Точка входа в сценарий' : 'Scenario Entry Point'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Приглашение присоединиться к сбору корзины */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 48 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Приглашение присоединиться к сбору корзины' : 'Invitation to Join Cart'}
                </h2>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Invite.png"
                    alt={locale === 'ru' ? 'Приглашение присоединиться к сбору корзины' : 'Invitation to Join Cart'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Выбор способа оплаты */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Выбор способа оплаты' : 'Payment Method Selection'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Организатор решает, каким способом будет происходить оплата. Раздельная — каждый платит за своё. Единая — один оплачивает за всех. Решение делает сценарий финансово гибким под разные категории групп пользователей')
                    : typograph('The organizer decides the payment method. Separate — each pays for their own. Joint — one pays for all. This makes the scenario financially flexible for different user group categories')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Pay method.png"
                    alt={locale === 'ru' ? 'Выбор способа оплаты' : 'Payment Method Selection'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Состояния экранов при единой оплате у приглашенного пользователя */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Состояния экранов при единой оплате у приглашенного пользователя' : 'Screen States for Invited User with Joint Payment'}
                </h2>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Common user screen.png"
                    alt={locale === 'ru' ? 'Состояния экранов при единой оплате у приглашенного пользователя' : 'Screen States for Invited User with Joint Payment'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Проверка адреса перед оплатой */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Проверка адреса перед оплатой' : 'Address Verification Before Payment'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Решение помогает пользователю избежать ошибки при указании адреса, одновременно предоставляя ему выбор — продолжить оплату отдельно или остаться в совместной корзине')
                    : typograph('The solution helps avoid address errors while providing a choice — continue with separate payment or stay in the shared cart')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Adress.png"
                    alt={locale === 'ru' ? 'Проверка адреса перед оплатой' : 'Address Verification Before Payment'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Подтверждение заказа после полной оплаты участников */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Подтверждение заказа после полной оплаты участников' : 'Order Confirmation After Full Payment'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Заказ отправляется в обработку только после того, как все участники оплатят свою часть')
                    : typograph('The order is processed only after all participants have paid their share')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Delivery.png"
                    alt={locale === 'ru' ? 'Подтверждение заказа после полной оплаты участников' : 'Order Confirmation After Full Payment'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Пуш-напоминание при задержке оплаты или сбора */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col" style={{ marginTop: 64 }}>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? (<>Как только пользователь задерживает сбор или оплату заказа, ему приходит пуш-напоминание.<br />Если он остается последним без оплаты, дается 20 минут на завершение перед отменой позиций</>)
                    : typograph('When a user delays collection or payment, they receive a push reminder. If they\'re the last one unpaid, they get 20 minutes to complete before items are cancelled')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Notification.png"
                    alt={locale === 'ru' ? 'Пуш-напоминание при задержке оплаты или сбора' : 'Push Reminder on Payment Delay'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Возобновление совместного заказа */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Возобновление совместного заказа' : 'Resuming Shared Order'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('После истечения таймера оплаты организатор, оплачивающий весь заказ может повторно отправить приглашение участникам, чтобы не создавать совместную корзину заново')
                    : typograph('After the payment timer expires, the organizer can resend invitations to avoid recreating the shared cart')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Try again.png"
                    alt={locale === 'ru' ? 'Возобновление совместного заказа' : 'Resuming Shared Order'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Продвижение спецпредложений в группе */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Продвижение спецпредложений в группе' : 'Promoting Special Offers in Group'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Персональные предложения для разных типов групп стимулируют повторное использование совместной корзины и увеличивают средний чек')
                    : typograph('Personalized offers for different group types encourage repeat shared cart usage and increase average order value')}
                </p>
                <div className="flex flex-col gap-[24px]" style={{ marginTop: 24 }}>
                  <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]">
                    <img
                      src="/covers/YandexLavka materials/Friends.png"
                      alt="Спецпредложения — друзья"
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]">
                    <img
                      src="/covers/YandexLavka materials/Family.png"
                      alt="Спецпредложения — семья"
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]">
                    <img
                      src="/covers/YandexLavka materials/Collegues.png"
                      alt="Спецпредложения — коллеги"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Создание постоянных групп */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Создание постоянных групп' : 'Creating Permanent Groups'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Создание групповых корзин. Пользователи могут формировать постоянные группы под разные категории, экономя деньги на доставке и время на сбор других участников')
                    : typograph('Group cart creation. Users can form permanent groups for different categories, saving on delivery and time collecting participants')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Group.png"
                    alt={locale === 'ru' ? 'Создание постоянных групп' : 'Creating Permanent Groups'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Автосоздание групповой корзины */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Автосоздание групповой корзины' : 'Auto-creation of Group Cart'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('После завершения первого совместного заказа появляется предложение создать постоянную группу')
                    : typograph('After completing the first shared order, an offer to create a permanent group appears')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Suggestion.png"
                    alt={locale === 'ru' ? 'Автосоздание групповой корзины' : 'Auto-creation of Group Cart'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Раздел заданий для совместных групп в Лавке */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Раздел заданий для совместных групп в Лавке' : 'Tasks Section for Shared Groups'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Если добавить раздел заданий, совместные заказы увеличат общий объем покупок, потому что игровые цели, прогресс и бонусы создают дополнительную мотивацию покупать вместе и возвращаться в сервис')
                    : typograph('Adding a tasks section would increase total purchase volume, as game goals, progress and bonuses create additional motivation to buy together and return to the service')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Challenges.png"
                    alt={locale === 'ru' ? 'Раздел заданий для совместных групп в Лавке' : 'Tasks Section for Shared Groups'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Статусы заданий */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col" style={{ marginTop: 64 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Статусы заданий' : 'Task Statuses'}
                </h2>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                  style={{ marginTop: 24 }}
                >
                  <img
                    src="/covers/YandexLavka materials/Card.png"
                    alt={locale === 'ru' ? 'Статусы заданий' : 'Task Statuses'}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Тестирование */}
            {caseStudy.id === 'yandex-lavka' && (
              <div id="section-testing" className="flex flex-col gap-[8px]" style={{ marginTop: 84, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Тестирование' : 'Testing'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Для проверки гипотез был разработан интерактивный прототип функции совместной корзины. Пользовательский сценарий включал добавление товаров, отправку ссылки участникам и\u00A0совместное оформление заказа. Прототип был протестирован на\u00A0респондентах, участвовавших в\u00A0CustDev-исследовании')
                    : typograph('To validate hypotheses, an interactive prototype of the shared cart feature was developed. The user scenario included adding items, sending a link to participants, and placing a joint order. The prototype was tested on respondents who participated in the CustDev study.')}
                </p>

                {/* Что было протестировано */}
                <h3
                  className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]"
                  style={{ marginTop: 24 }}
                >
                  {locale === 'ru' ? 'Что было протестировано' : 'What was tested'}
                </h3>

                {/* Filter chips */}
                <div className="no-scrollbar flex flex-nowrap overflow-x-auto gap-[8px] md:flex-wrap md:overflow-visible" style={{ marginTop: 12 }}>
                  {([
                    { ru: 'Точка входа в\u00A0сценарий', en: 'Scenario entry point' },
                    { ru: 'Разделение оплаты', en: 'Payment splitting' },
                    { ru: 'Раздел заданий', en: 'Task section' },
                    { ru: 'Создание группы', en: 'Group creation' },
                    { ru: 'Процесс отправки повторного запроса', en: 'Request sending flow' },
                    { ru: 'Адрес и оплата', en: 'Bonus selection by category' },
                  ]).map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => { setActiveTestChip(idx); if (window.innerWidth < 768) {
          const btn = e.currentTarget;
          const c = btn.parentElement;
          if (c) {
            const peek = 44;
            const bL = btn.offsetLeft;
            const bR = bL + btn.offsetWidth;
            const goRight = (bL + btn.offsetWidth / 2) >= (c.scrollLeft + c.clientWidth / 2);
            const max = c.scrollWidth - c.clientWidth;
            let next = c.scrollLeft;
            if (goRight) { const t = bR + peek - c.clientWidth; if (t > next) next = t; }
            else { const t = bL - peek; if (t < next) next = t; }
            c.scrollTo({ left: Math.max(0, Math.min(max, next)), behavior: 'smooth' });
          }
        } }}
                      className="skill-pill whitespace-nowrap border-none cursor-pointer rounded-[24px] inline-flex items-center justify-center"
                      style={{
                        padding: '10px 12px',
                        lineHeight: 1,
                        backgroundColor: activeTestChip === idx ? '#000000' : '#F1F1F1',
                        color: activeTestChip === idx ? '#ffffff' : 'rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      {locale === 'ru' ? chip.ru : chip.en}
                    </button>
                  ))}
                </div>

                {/* Main result card */}
                <div
                  className="rounded-[var(--radius-media)] bg-[#F5F5F5] overflow-hidden"
                  style={{ marginTop: 24 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                    {/* Left — text column */}
                    <div className="flex flex-col gap-[8px]" style={{ padding: 24 }}>
                      <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                        {locale === 'ru' ? 'Контекст' : 'Context'}
                      </h3>
                      <p className="text-[16px] font-medium text-[var(--color-text-secondary)]" style={{ margin: 0 }}>
                        {activeTestChip === 1
                          ? (locale === 'ru'
                            ? typograph('Проверяла способ гибкости оплаты и\u00A0процент удовлетворенности настройки, исходя из\u00A0инсайтов о\u00A0потребностях целевой аудитории')
                            : typograph('Tested payment flexibility and the usage rate of the setting, based on insights about the target audience needs.'))
                          : activeTestChip === 2
                          ? (locale === 'ru'
                            ? typograph('Проверяла степень\u00A0интереса геймификации заданий для категорий групп')
                            : typograph('Evaluated the level of satisfaction and interest in light gamification through group tasks.'))
                          : activeTestChip === 3
                          ? (locale === 'ru'
                            ? typograph('Проверяла гипотезу интереса пользователей к\u00A0созданию групп для совместных покупок и\u00A0получению бонусов')
                            : typograph('Evaluated user interest in creating groups for joint purchases and earning bonuses.'))
                          : activeTestChip === 4
                          ? (locale === 'ru'
                            ? typograph('Оценила понятность и\u00A0скорость сценария повторного приглашения пользователей в\u00A0совместную корзину')
                            : typograph('Evaluated the clarity and speed of the re-invitation scenario for users to join a shared cart.'))
                          : activeTestChip === 5
                          ? (locale === 'ru'
                            ? typograph('Проверяла реакцию пользователей на\u00A0ошибку несовпадения адреса доставки при раздельной оплате')
                            : typograph('Evaluated user reactions to the delivery address mismatch error during split payment.'))
                          : (locale === 'ru'
                            ? typograph('Чтобы проверить результаты на\u00A0практике пользователи попробовали найти точку входа в\u00A0реальном приложении Лавки и\u00A0в\u00A0интерактивном прототипе (с\u00A0учетом добавления онбординга обновления и\u00A0без)')
                            : typograph('To verify results in practice, users tried to find the entry point in the real Lavka app and in the interactive prototype (with and without the onboarding update).'))
                        }
                      </p>
                      <h3
                        className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]"
                        style={{ marginTop: 16 }}
                      >
                        {locale === 'ru' ? 'Выводы' : 'Conclusions'}
                      </h3>
                      <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                        {activeTestChip === 1 ? (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Упростило решение регулирования оплаты в\u00A0компании') : typograph('— Simplified the payment regulation solution within the company')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Поп-ап с\u00A0разъяснением повысил прозрачность условий оплаты и\u00A0помог снизить уровень тревожности пользователей') : typograph('— The explanatory pop-up increased payment terms transparency and helped reduce user anxiety')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— CSAT по\u00A0результатам достиг 76%, исключения составили респонденты, кому привычнее отправить сумму одному человеку') : typograph('— CSAT reached 76%, with exceptions being respondents who prefer sending the amount to one person')}</p>
                          </>
                        ) : activeTestChip === 2 ? (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Пользователям интересно получать достижения с\u00A0вознаграждениями и\u00A0бонусами') : typograph('— Users are interested in earning achievements with rewards and bonuses')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Визуальная персонализация иконок заданий помогла ориентироваться в\u00A0категории групп') : typograph('— Visual personalization of tasks helped navigate group categories')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Задания помогли разнообразить опциональные задачи, которые пользователи могут закрывать в\u00A0Лавке') : typograph('— Tasks helped diversify optional objectives that users can set for themselves in Lavka')}</p>
                          </>
                        ) : activeTestChip === 3 ? (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Пользователи воспринимают создание группы как способ экономии') : typograph('— Users perceive group creation as a way to save money')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Поп-ап с\u00A0объяснением ценности повышает вероятность создания группы, однако не все респонденты выразили удовлетворенность в ситуации, если поп-ап будет появляться после каждого единоразового заказа') : typograph('— A pop-up explaining the value increases the likelihood of group creation, though not all respondents were happy with it appearing after every one-off order')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Возможность приглашать знакомых делает сценарий более понятным и\u00A0социально значимым') : typograph('— The ability to invite acquaintances makes the scenario more understandable and socially meaningful')}</p>
                          </>
                        ) : activeTestChip === 4 ? (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Повторное приглашение воспринимается как удобный способ вернуть участников в\u00A0заказ') : typograph('— Re-invitation is perceived as a convenient way to bring participants back to the order')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Чёткое состояние запроса снижает неопределённость ожидания') : typograph('— A clear request status reduces waiting uncertainty')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Возможность быстро принять или отклонить запрос ускоряет сценарий совместной покупки') : typograph('— The ability to quickly accept or decline a request speeds up the joint purchase scenario')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Решение исключает необходимость выходить из приложения для повторной отправки приглашения') : typograph('— The flow removes the need to leave the app to resend an invitation')}</p>
                          </>
                        ) : activeTestChip === 5 ? (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Понятное сообщение об\u00A0ошибке помогает быстрее принять решение') : typograph('— A clear error message helps make decisions faster')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Возможность изменить адрес снижает риск отказа от\u00A0оформления заказа') : typograph('— The ability to change the address reduces the risk of order abandonment')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Альтернативный сценарий продолжения оплаты воспринимается как полезная гибкость') : typograph('— An alternative payment continuation scenario is perceived as useful flexibility')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Степень риска возникновения заказов на неправильный адрес понижается, CSAT по опросу составил +92%') : typograph('— Risk of orders going to the wrong address is reduced; survey CSAT reached +92%')}</p>
                          </>
                        ) : (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— На\u00A0практике гипотеза о\u00A0неинтуитивности иконки «поделиться» в приложении подтвердилась') : typograph('— In practice, the hypothesis about the non-intuitiveness of the share icon was confirmed')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Даже без полного прохождения онбординга пользователям было достаточно всплывающего поп-апа об\u00A0обновлении, чтобы разобраться самостоятельно') : typograph('— Even without completing onboarding, users found the update pop-up sufficient to figure things out on their own')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— CSAT по\u00A0результатам достиг +97%') : typograph('— CSAT reached 97%')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Средняя длительность снизилась на 84%') : typograph('— Average duration decreased by 84%')}</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right — visual column */}
                    <div
                      className={`flex ${activeTestChip === 4 ? 'items-start pt-0' : 'items-end pt-[24px]'} justify-center px-[24px] pb-0 md:pl-0 md:pr-[24px] md:pt-[24px] md:pb-0`}
                      style={activeTestChip === 4 ? { paddingTop: 0 } : undefined}
                    >
                      <img
                        src={activeTestChip === 1 ? '/covers/YandexLavka materials/2.webp' : activeTestChip === 2 ? '/covers/YandexLavka materials/3.webp' : activeTestChip === 3 ? '/covers/YandexLavka materials/4.webp' : activeTestChip === 4 ? '/covers/YandexLavka materials/5.webp' : activeTestChip === 5 ? '/covers/YandexLavka materials/6.webp' : '/covers/YandexLavka materials/1.webp'}
                        alt={locale === 'ru' ? 'Экраны прототипа' : 'Prototype screens'}
                        className="h-auto object-contain"
                        style={{ display: 'block', maxWidth: '85%', margin: 0 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Результаты тестирования */}
            {caseStudy.id === 'yandex-lavka' && (
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Ключевые тезисы от Discovery до тестирования' : 'Testing Results'}
                </h2>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[24px]"
                  style={{ marginTop: 24 }}
                >
                  {/* Row 1 */}
                  <div className="rounded-[24px] bg-[#00ADFF] min-w-0 box-border" style={{ padding: 24 }}>
                    <p className="m-0 font-sans text-[20px] font-semibold leading-normal text-white break-words">
                      {locale === 'ru'
                        ? typograph('Совместная корзина снижает барьеры оформления покупки в группе')
                        : typograph('Shared cart reduces barriers to group checkout')}
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-[#F5F5F5] min-w-0 box-border" style={{ padding: 24 }}>
                    <p className="m-0 font-sans text-[20px] font-semibold leading-normal text-[var(--color-text-primary)] break-words">
                      {locale === 'ru'
                        ? typograph('Респонденты отметили новизну решения для рынка России')
                        : typograph("Respondents noted the solution's novelty for the Russian market")}
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-[#F5F5F5] min-w-0 box-border" style={{ padding: 24 }}>
                    <p className="m-0 font-sans text-[20px] font-semibold leading-normal text-[var(--color-text-primary)] break-words">
                      {locale === 'ru'
                        ? typograph('Функция воспринимается как конкурентное преимущество сервиса')
                        : typograph('The feature is seen as a competitive advantage')}
                    </p>
                  </div>

                  {/* Row 2 */}
                  <div className="rounded-[24px] bg-[#00ADFF] min-w-0 box-border" style={{ padding: 24 }}>
                    <p className="m-0 font-sans text-[20px] font-semibold leading-normal text-white break-words">
                      {locale === 'ru'
                        ? typograph('Респонденты готовы использовать функцию в реальных покупках')
                        : typograph('Respondents are ready to use the feature in real purchases')}
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-[#F5F5F5] min-w-0 box-border" style={{ padding: 24 }}>
                    <p className="m-0 font-sans text-[20px] font-semibold leading-normal text-[var(--color-text-primary)] break-words">
                      {locale === 'ru'
                        ? typograph('Решение показало высокий уровень пользовательского интереса')
                        : typograph('The solution showed high user interest')}
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-[#F5F5F5] min-w-0 box-border" style={{ padding: 24 }}>
                    <p className="m-0 font-sans text-[20px] font-semibold leading-normal text-[var(--color-text-primary)] break-words">
                      {locale === 'ru'
                        ? typograph('Гипотезы получили качественное и количественное подтверждение')
                        : typograph('Hypotheses received qualitative confirmation')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Рефлексия */}
            {caseStudy.id === 'yandex-lavka' && (
              <div id="section-reflection" className="flex flex-col gap-[8px]" style={{ marginTop: 84, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Рефлексия' : 'Reflection'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('После разработки решения следующим шагом стал\u00A0бы запуск MVP в\u00A0продакшн на\u00A0широкую аудиторию и\u00A0анализ ключевых метрик. На\u00A0основе полученных данных можно выявить сильные и\u00A0слабые стороны решения и\u00A0определить наиболее удачные предложения для пользователей. Далее макеты и\u00A0гипотезы корректируются, повторно тестируются, и\u00A0цикл улучшений запускается снова')
                    : typograph('After developing the solution, the next step would be to launch the MVP to a broad audience and analyze key metrics. The collected data helps identify the strengths and weaknesses of the solution and determine the most effective offerings for users. From there, designs and hypotheses are refined, retested, and the improvement cycle begins again.')}
                </p>
              </div>
            )}

          </section>
        </div>
      </div>
    </div>
    </>
  );
}
