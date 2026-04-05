import { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cases } from '../data/cases';
import { ScrollToTop } from '../components/ScrollToTop';
import { useLocale } from '../context/LocaleContext';
import { typograph } from '../utils/typograph';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { CaseStudy } from '../types';
import LavkaCase from '../cases/lavka/LavkaCase';

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
    '/covers/okolo/1.png',
    '/covers/okolo/2.png',
    '/covers/okolo/3.png',
    '/covers/okolo/4.webp',
  ];

  const [activeSection, setActiveSection] = useState<string>(NAV_ITEMS[0].id);
  const [activePersona, setActivePersona] = useState<'families' | 'friends' | 'colleagues' | 'couples' | 'students' | 'rvp' | 'vnzh'>('families');
  const [activeTestChip, setActiveTestChip] = useState(0);
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
              <img src="/Icons/menu.svg" alt="" className="w-[18px] h-[18px] block shrink-0" width={18} height={18} />
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
            )}

          </section>
        </div>
      </div>
    </div>
    </>
  );
}
