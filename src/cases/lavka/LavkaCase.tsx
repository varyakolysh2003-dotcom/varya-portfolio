import { useState, useRef, useCallback } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { Locale } from '../../types';
import { typograph } from '../../utils/typograph';

export type LavkaPersonaId = 'families' | 'friends' | 'colleagues' | 'couples' | 'students' | 'rvp' | 'vnzh';

export function LavkaTaskContextBody({ locale }: { locale: Locale }) {
  return (
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
  );
}

export type LavkaCaseProps = {
  locale: Locale;
  benchmarkingLogos: string[];
  activePersona: LavkaPersonaId;
  setActivePersona: Dispatch<SetStateAction<LavkaPersonaId>>;
  mobileOnboardingSlide: number;
  onboardingScrollRef: RefObject<HTMLDivElement | null>;
  handleOnboardingScroll: () => void;
  activeTestChip: number;
  setActiveTestChip: Dispatch<SetStateAction<number>>;
};

export default function LavkaCase({
  locale,
  benchmarkingLogos,
  activePersona,
  setActivePersona,
  mobileOnboardingSlide,
  onboardingScrollRef,
  handleOnboardingScroll,
  activeTestChip,
  setActiveTestChip,
}: LavkaCaseProps) {
  const [mobileEntrySlide, setMobileEntrySlide] = useState(0);
  const entryScrollRef = useRef<HTMLDivElement>(null);
  const handleEntryScroll = useCallback(() => {
    const el = entryScrollRef.current;
    if (!el) return;
    setMobileEntrySlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  return (
    <>
            {/* Бенчмаркинг — 112px from previous block (88px margin + 24px parent gap = 112px) */}
            <div id="section-analysis" className="flex flex-col gap-[16px] md:gap-[24px]" style={{ marginTop: 88, scrollMarginTop: 32 }}>
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

            {/* Cust-dev и анализ персон — 112px from previous block (88px margin + 24px parent gap = 112px) */}
            <div className="flex flex-col gap-[16px] md:gap-[24px]" style={{ marginTop: 88, scrollMarginTop: 32 }}>
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

              <div className="contents md:grid md:grid-cols-2 md:gap-[24px]">
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

            {/* Онбординг обновления — 112px from previous block (88px margin + 24px parent gap = 112px) */}
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
                <div className="case-section-content md:hidden">
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
                  className="case-section-content hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Onboarding.png"
                    alt="Onboarding"
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Точка входа в сценарий */}
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 48 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Точка входа в сценарий' : 'Scenario Entry Point'}
                </h2>

                {/* Mobile: one shared background container, one image visible at a time */}
                <div className="case-section-content md:hidden">
                  <div
                    className="w-full bg-[#F5F5F5] overflow-hidden"
                    style={{ height: '297px', borderRadius: 'var(--radius-media)' }}
                  >
                    <div
                      ref={entryScrollRef}
                      onScroll={handleEntryScroll}
                      className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
                    >
                      {[4, 5, 6].map((n) => (
                        <div
                          key={n}
                          className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center"
                        >
                          <img
                            src={`/covers/YandexLavka materials/Mobile/${n}.webp`}
                            alt={`${locale === 'ru' ? 'Точка входа в сценарий' : 'Scenario Entry Point'} ${n - 3}`}
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
                          opacity: mobileEntrySlide === i ? 1 : 0.2,
                          transition: 'opacity 200ms ease',
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Desktop/tablet: full-width banner */}
                <div
                  className="case-section-content hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Scenario start.png"
                    alt={locale === 'ru' ? 'Точка входа в сценарий' : 'Scenario Entry Point'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Приглашение присоединиться к сбору корзины */}
              <div className="flex flex-col" style={{ marginTop: 48 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Приглашение присоединиться к сбору корзины' : 'Invitation to Join Cart'}
                </h2>
                <div
                  className="chip-image-gap w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Invite.png"
                    alt={locale === 'ru' ? 'Приглашение присоединиться к сбору корзины' : 'Invitation to Join Cart'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Выбор способа оплаты */}
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
                  className="case-section-content w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Pay method.png"
                    alt={locale === 'ru' ? 'Выбор способа оплаты' : 'Payment Method Selection'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Состояния экранов при единой оплате у приглашенного пользователя */}
              <div className="flex flex-col" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Состояния экранов при единой оплате у приглашенного пользователя' : 'Screen States for Invited User with Joint Payment'}
                </h2>
                <div
                  className="chip-image-gap w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Common user screen.png"
                    alt={locale === 'ru' ? 'Состояния экранов при единой оплате у приглашенного пользователя' : 'Screen States for Invited User with Joint Payment'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Проверка адреса перед оплатой */}
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
                  className="case-section-content w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Adress.png"
                    alt={locale === 'ru' ? 'Проверка адреса перед оплатой' : 'Address Verification Before Payment'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Подтверждение заказа после полной оплаты участников */}
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
                  className="case-section-content w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Delivery.png"
                    alt={locale === 'ru' ? 'Подтверждение заказа после полной оплаты участников' : 'Order Confirmation After Full Payment'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Пуш-напоминание при задержке оплаты или сбора */}
              <div className="flex flex-col" style={{ marginTop: 64 }}>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? (<>Как только пользователь задерживает сбор или оплату заказа, ему приходит пуш-напоминание.<br />Если он остается последним без оплаты, дается 20 минут на завершение перед отменой позиций</>)
                    : typograph('When a user delays collection or payment, they receive a push reminder. If they\'re the last one unpaid, they get 20 minutes to complete before items are cancelled')}
                </p>
                <div
                  className="case-section-content w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Notification.png"
                    alt={locale === 'ru' ? 'Пуш-напоминание при задержке оплаты или сбора' : 'Push Reminder on Payment Delay'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Возобновление совместного заказа */}
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
                  className="case-section-content w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Try again.png"
                    alt={locale === 'ru' ? 'Возобновление совместного заказа' : 'Resuming Shared Order'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Продвижение спецпредложений в группе */}
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Продвижение спецпредложений в группе' : 'Promoting Special Offers in Group'}
                </h2>
                <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Персональные предложения для разных типов групп стимулируют повторное использование совместной корзины и увеличивают средний чек')
                    : typograph('Personalized offers for different group types encourage repeat shared cart usage and increase average order value')}
                </p>
                <div className="case-section-content flex flex-col gap-[24px]">
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

            {/* Создание постоянных групп */}
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
                  className="case-section-content w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Group.png"
                    alt={locale === 'ru' ? 'Создание постоянных групп' : 'Creating Permanent Groups'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Автосоздание групповой корзины */}
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
                  className="case-section-content w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Suggestion.png"
                    alt={locale === 'ru' ? 'Автосоздание групповой корзины' : 'Auto-creation of Group Cart'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Раздел заданий для совместных групп в Лавке */}
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
                  className="case-section-content w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Challenges.png"
                    alt={locale === 'ru' ? 'Раздел заданий для совместных групп в Лавке' : 'Tasks Section for Shared Groups'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Статусы заданий */}
              <div className="flex flex-col" style={{ marginTop: 64 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Статусы заданий' : 'Task Statuses'}
                </h2>
                <div
                  className="case-section-content w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5]"
                >
                  <img
                    src="/covers/YandexLavka materials/Card.png"
                    alt={locale === 'ru' ? 'Статусы заданий' : 'Task Statuses'}
                    className="w-full object-cover"
                  />
                </div>
              </div>

            {/* Тестирование */}
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
                  className="case-section-content font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]"
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
                  className="case-section-content rounded-[var(--radius-media)] bg-[#F5F5F5] overflow-hidden"
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

            {/* Результаты тестирования */}
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Ключевые тезисы от Discovery до тестирования' : 'Testing Results'}
                </h2>
                <div
                  className="case-section-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[24px]"
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

            {/* Рефлексия */}
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
    </>
  );
}
