import { useCallback, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Locale } from '../../types';
import { typograph } from '../../utils/typograph';
import { publicUrl } from '../../utils/publicUrl';

/** T-Bank testing block: prototype screens in filename order (same for RU/EN). */
const TBANK_TESTING_PROTOTYPE_IMAGES = [
  publicUrl('/covers/T-bank/1_1.webp'),
  publicUrl('/covers/T-bank/1_5.webp'),
  publicUrl('/covers/T-bank/1_2.webp'),
  publicUrl('/covers/T-bank/1_3.webp'),
  publicUrl('/covers/T-bank/1_4.webp'),
] as const;

const TBANK_TRANSLATION_VARIANTS = [
  { label: 'Kyrgyz', src: publicUrl('/covers/T-bank/Kyrgyzskyu.webp') },
  { label: 'Tajik', src: publicUrl('/covers/T-bank/Tadjitsky.webp') },
  { label: 'Uzbek', src: publicUrl('/covers/T-bank/Uzbekskyu.webp') },
] as const;

type PersonaId = 'families' | 'friends' | 'colleagues' | 'couples' | 'students' | 'rvp' | 'vnzh' | 'patterns';

type TBankCaseProps = {
  locale: Locale;
  activePersona: PersonaId;
  setActivePersona: Dispatch<SetStateAction<PersonaId>>;
  activeTbankTestChip: number;
  setActiveTbankTestChip: Dispatch<SetStateAction<number>>;
};

export default function TBankCase({
  locale,
  activePersona,
  setActivePersona,
  activeTbankTestChip,
  setActiveTbankTestChip,
}: TBankCaseProps) {
  const [translationVariantSlide, setTranslationVariantSlide] = useState(0);
  const translationVariantsScrollRef = useRef<HTMLDivElement>(null);
  const handleTranslationVariantsScroll = useCallback(() => {
    const el = translationVariantsScrollRef.current;
    if (!el) return;
    setTranslationVariantSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  return (
    <>
            {/* Текущие проблемы формы — T-Bank only */}
              <div id="section-analysis" className="flex flex-col" style={{ marginTop: 88, scrollMarginTop: 32 }}>
                <div className="flex flex-col gap-[8px]">
                  <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                    {locale === 'ru' ? 'Текущие проблемы формы' : 'Current Form Issues'}
                  </h2>
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] chip-image-gap"
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/1.webp')}
                    alt={locale === 'ru' ? 'Проблемы формы — часть 1' : 'Form issues — part 1'}
                    className="block w-full h-auto"
                  />
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)]"
                  style={{ marginTop: 24 }}
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/2.webp')}
                    alt={locale === 'ru' ? 'Проблемы формы — часть 2' : 'Form issues — part 2'}
                    className="block w-full h-auto"
                  />
                </div>
              </div>

            {/* Основные ограничения — T-Bank only */}
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 88, scrollMarginTop: 32 }}>
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
                      ? typograph('Иностранцам требуется несколько месяцев вести активный счет (оплачивать покупки, держать баланс), прежде чем к ним станет возможен минимальный уровень доверия для выдачи рассрочки. Сразу после получения кредитки таких возможностей нет')
                      : typograph('Foreign citizens need several months of active account usage (making purchases, maintaining balance) before a minimum level of trust for installment issuance becomes possible. Immediately after receiving a credit card, such options are not available')}
                  </p>
                </div>
              </div>

            {/* POS-система — T-Bank only */}
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

            {/* Что уже известно — T-Bank only */}
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 88, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Что уже известно' : 'What is already known'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('«Мне одобрили кредитную карту с\u00A0лимитом 60\u00A0000\u00A0рублей и\u00A0льготным периодом до\u00A055\u00A0дней. В\u00A0течение этого срока можно пользоваться деньгами без\u00A0процентов. Условия распространяются на\u00A0покупки по\u00A0карте. Важно вовремя погашать задолженность, чтобы не\u00A0начислялись проценты»')
                      : typograph('"I was approved for a credit card with a 60,000 ruble limit and an interest-free period of up to 55 days. During this period, you can use the funds without paying interest. The terms apply to card purchases. It is important to repay the debt on time to avoid interest charges."')}
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

            {/* Важность развития услуг иностранцам — T-Bank only */}
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 88 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Преимущество развития иностранных услуг кредитования для бизнеса' : 'Why developing services for foreigners matters for business'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('Сегмент иностранных граждан в\u00A0России остается недоохваченным в\u00A0цифровых банковских сценариях, несмотря на\u00A0его заметный размер и\u00A0платежеспособность. Для части пользователей с\u00A0легальным статусом пребывания банковские продукты уже доступны, но\u00A0часто не\u00A0адаптирован под особенности документов, языка и\u00A0требований к\u00A0данным')
                      : typograph('The segment of foreign nationals in Russia remains underserved in digital banking scenarios, despite its notable size and purchasing power. For users with legal residency status, banking products are already available, but are often not adapted to the specifics of their documents, language, and data requirements.')}
                  </p>
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('Адаптация сценария оформления под иностранных пользователей может дать бизнесу несколько эффектов:')
                      : typograph('Adapting the onboarding flow for foreign users can deliver several business outcomes:')}
                  </p>
                  <div className="flex flex-col gap-[4px]">
                    {(locale === 'ru' ? [
                      '— Снизить drop-off на\u00A0этапе заполнения заявки',
                      '— Сократить количество невалидных и\u00A0брошенных анкет',
                      '— Повысить заинтересованность в\u00A0развитии кредитной истории через кредитную карту для иностранцев',
                      '— Сделать маршрутизацию в\u00A0релевантный продукт более точной (только проверенные источники)',
                      '— Повысить конверсию в\u00A0доступные кредитные сценарии внутри экосистемы банка',
                      '— Увеличить доверие и\u00A0лояльность',
                    ] : [
                      '— Reduce drop-off at the application stage',
                      '— Decrease the number of invalid and abandoned applications',
                      '— Increase interest in building credit history through a credit card for foreigners',
                      '— Make routing to the relevant product more precise (verified sources only)',
                      "— Improve conversion into available credit scenarios within the bank's ecosystem",
                      '— Build trust and loyalty',
                    ]).map((item, i) => (
                      <p key={i} className="m-0">{typograph(item)}</p>
                    ))}
                  </div>
                </div>
              </div>

            {/* Custdev и анализ персон — T-Bank only */}
            <div className="flex flex-col gap-[16px] md:gap-[24px]" style={{ marginTop: 84 }}>
              <div className="flex flex-col gap-[8px]">
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Custdev и анализ персон среди 20 респондентов' : 'Custdev and Persona Analysis'}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]">
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
                  {/* Общие паттерны — third interactive card */}
                  <button
                    type="button"
                    onClick={(e) => { setActivePersona('patterns'); if (window.innerWidth < 768) {
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
                      backgroundColor: activePersona === 'patterns' ? '#000000' : '#F8F8F8',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <h3
                      className="font-sans text-[14px] font-semibold leading-none md:text-[20px] md:leading-normal"
                      style={{ color: activePersona === 'patterns' ? '#ffffff' : 'var(--color-text-primary)' }}
                    >
                      {locale === 'ru' ? 'Общие паттерны' : 'Common Patterns'}
                    </h3>
                  </button>
                </div>

                {/* Right column — single insight card, content switches */}
                <div className="bg-[#F5F5F5] rounded-[24px] h-full" style={{ padding: 24 }}>
                  <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                    {activePersona === 'patterns'
                      ? (locale === 'ru' ? 'Выводы паттернов сегментов' : 'Segment Pattern Conclusions')
                      : (locale === 'ru' ? 'О ядре категории пользователей' : 'Category Core Insights')}
                  </h3>
                  <div className="flex flex-col gap-[8px]" style={{ marginTop: 8 }}>
                    <p className="text-[15px] font-medium text-[var(--color-text-secondary)] md:hidden" style={{ marginBottom: 4 }}>
                      {({
                        rvp: locale === 'ru' ? typograph('Находятся в переходном статусе: уже работают, но ограничены в доступе к кредитным продуктам из-за временного характера разрешения') : typograph('In a transitional status: already employed, but limited in access to credit products due to the temporary nature of their permit'),
                        vnzh: locale === 'ru' ? typograph('Наиболее интегрированный сегмент: имеют стабильный доход, пользуются банковскими продуктами, но сталкиваются с отказами и ограничениями') : typograph('The most integrated segment: have stable income, use banking products, but face rejections and restrictions atypical for citizens'),
                        patterns: locale === 'ru' ? typograph('Общие выводы по всем сегментам') : typograph('Common conclusions across all segments'),
                      } as Record<string, string>)[activePersona] ?? ''}
                    </p>
                    {activePersona === 'rvp' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Статус РВП создает неопределенность, пользователь уже зарабатывает и тратит, но не может получить рассрочку на стандартных условиях') : typograph('TRP status creates uncertainty: the user already earns and spends locally but cannot get a loan, mortgage, or installment plan on standard terms')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Паттерн переводов двунаправленный — часть дохода отправляется семье, часть остается на локальные нужды — продукт должен поддерживать оба сценария') : typograph('Transfer pattern is bidirectional: part of income is sent to family, part stays for local needs — the product must support both scenarios')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Языковой барьер в интерфейсах и документах остается критичным для мигрантов с слабым уровнем русского языка') : typograph('Language barrier in interfaces and documents remains critical for migrants with a low level of Russian')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Ожидают от продукта прозрачных условий, предсказуемые комиссии и понятный статус заявки') : typograph('Expect transparent terms, predictable fees, and clear application status from the product')}
                        </p>
                      </>
                    )}
                    {activePersona === 'vnzh' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Несмотря на стабильный статус, ВНЖ не приравнивается к гражданству в скоринговых моделях банков, что является ключевой friction point при попытке получить кредитные продукты') : typograph('Despite stable status, residence permit is not equated to citizenship in bank scoring models — this is the key friction point when trying to obtain credit products')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Долгосрочное планирование возможно, но ограничено, пользователи готовы к ипотеке и инвестициям, однако не все банки предлагают адаптированных продуктов под этот сегмент') : typograph('Long-term planning is possible but limited: users are ready for mortgages and investments, yet not all banks offer adapted products for this segment')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Переводы за рубеж сохраняются, но их доля в бюджете снижается — растет потребность в локальных финансовых инструментах') : typograph('International transfers persist but their share of the budget decreases — demand grows for local financial instruments: savings accounts, insurance, subscriptions')}
                        </p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
                          — {locale === 'ru' ? typograph('Сегмент наиболее чувствителен к качеству сервиса, негативный опыт (отказ без объяснения, повторный запрос документов) приводит к оттоку в банки с более лояльной политикой к нерезидентам') : typograph('This segment is most sensitive to service quality: negative experience (rejection without explanation, repeated document requests) leads to churn toward banks with more loyal policies for non-residents')}
                        </p>
                      </>
                    )}
                    {activePersona === 'patterns' && (
                      <>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">— {locale === 'ru' ? typograph('Ключевой барьер — неопределенность и отсутствие адаптивности') : typograph('The key barrier is uncertainty and lack of adaptability')}</p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">— {locale === 'ru' ? typograph('Пользователи хотят понимать причины отказа и свои шансы') : typograph('Users want to understand rejection reasons and their chances')}</p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">— {locale === 'ru' ? typograph('Важна прозрачность условий до начала сценария') : typograph('Transparency of conditions before starting the flow is important')}</p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">— {locale === 'ru' ? typograph('Страх потратить время впустую на оформление заявки') : typograph('Fear of wasting time on the application process')}</p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">— {locale === 'ru' ? typograph('Необходимость в расширении банковских услуг с иностранными данными') : typograph('Need for expanding banking services with foreign data')}</p>
                        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">— {locale === 'ru' ? typograph('Большое количество требований по документам') : typograph('Large number of document requirements')}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Результаты Drop-off из Custdev интервью — T-Bank only */}
              <div className="flex flex-col" style={{ marginTop: 48 }}>
                <div className="flex flex-col gap-[8px]">
                  <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                    {locale === 'ru' ? 'Результаты Drop-off из\u00A0Custdev интервью' : 'Drop-off Results from Custdev Interviews'}
                  </h2>
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden chip-image-gap"
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/4.webp')}
                    alt={locale === 'ru' ? 'Результаты Drop-off — часть 1' : 'Drop-off results — part 1'}
                    className="block w-full h-auto origin-center scale-[1.007]"
                  />
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)]"
                  style={{ marginTop: 24 }}
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/3.webp')}
                    alt={locale === 'ru' ? 'Результаты Drop-off — часть 2' : 'Drop-off results — part 2'}
                    className="block w-full h-auto origin-center scale-[1.007]"
                  />
                </div>
              </div>

            {/* Слабые точки пути пользователей — T-Bank only */}
              <div className="bg-[#F5F5F5] rounded-[24px] flex flex-col gap-[8px]" style={{ padding: 24, marginTop: 32 }}>
                <h2 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Слабые точки пути пользователей пришлись на' : 'User journey weak points were:'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <p className="m-0">1. {locale === 'ru' ? typograph('«Как оформить» предоставляет информацию только для граждан РФ') : typograph('"How to apply" provides information only for Russian citizens')}</p>
                  <p className="m-0">2. {locale === 'ru' ? typograph('Форма поддерживает только два языка') : typograph('The form supports only two languages')}</p>
                  <p className="m-0">3. {locale === 'ru' ? typograph('Форма поддерживает только заполнение под паспорт РФ, из-за чего drop-off составил 100%') : typograph('The form only supports Russian passport data entry, resulting in a 100% drop-off rate')}</p>
                </div>
              </div>

            {/* JTBD — T-Bank only */}
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 48 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  JTBD
                </h2>
                {(() => {
                  const items = locale === 'ru'
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
                      ];

                  const groups = [items.slice(0,3), items.slice(3,6), items.slice(6,9), items.slice(9,12)];

                  return (
                    <>
                      {/* Mobile: each JTBD triplet as one grouped card */}
                      <div className="flex flex-col gap-[12px] md:hidden" style={{ marginTop: 16 }}>
                        {groups.map((group, gi) => (
                          <div key={gi} className="bg-[#F4F4F4] rounded-[16px] box-border" style={{ padding: 16 }}>
                            {group.map((item, idx) => (
                              <div key={idx}>
                                {idx > 0 && <div className="h-px bg-black/[0.06]" style={{ marginTop: 10, marginBottom: 10 }} />}
                                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.45]">
                                  <span className="font-semibold text-[var(--color-text-primary)]">{typograph(item.prefix)}</span>{' '}
                                  {typograph(item.text)}
                                </p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* Desktop: original 3-column grid */}
                      <div className="hidden md:grid grid-cols-3 gap-[16px] items-stretch" style={{ marginTop: 16 }}>
                        {items.map((item, index) => (
                          <div
                            key={index}
                            className="bg-[#F4F4F4] rounded-[20px] h-auto text-left box-border"
                            style={{ padding: '16px 20px' }}
                          >
                            <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.45]">
                              <span className="font-semibold text-[var(--color-text-primary)]">{typograph(item.prefix)}</span>{' '}
                              {typograph(item.text)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>

            {/* Архитектура — T-Bank only */}
              <div className="flex flex-col" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Архитектура' : 'Architecture'}
                </h2>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] chip-image-gap"
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/5.webp')}
                    alt={locale === 'ru' ? 'Архитектура' : 'Architecture'}
                    className="block w-full h-auto"
                  />
                </div>
              </div>

            {/* Экраны — T-Bank only */}
              <div className="flex flex-col" style={{ marginTop: 40 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Экраны' : 'Screens'}
                </h2>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden"
                  style={{ marginTop: 20, padding: 0, height: 'auto', lineHeight: 0 }}
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/6.webp')}
                    alt={locale === 'ru' ? 'Экраны' : 'Screens'}
                    className="block w-full h-auto origin-center scale-[1.007]"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>

            {/* Локализация — T-Bank only */}
              <div id="section-solutions" className="flex flex-col gap-[8px]" style={{ marginTop: 48, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Локализация' : 'Localization'}
                </h2>
                <div className="flex flex-col gap-[8px]">
                  <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                    {locale === 'ru'
                      ? typograph('Если анкета и коммуникация с банком доступны только на русском языке, часть иностранных пользователей может испытывать сложности при заполнении формы. Это приводит к увеличению числа отказов от дальнейшего заполнения заявки. В\u00A0своем решении я\u00A0расширила локализацию для сегмента, уязвимого к\u00A0слабому пониманию русского языка')
                      : typograph('If the application form and bank communications are only available in Russian, some foreign users may struggle to complete the form. This leads to an increased drop-off rate. In my solution, I expanded localization for the segment vulnerable to limited Russian language comprehension')}
                  </p>
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden"
                  style={{ marginTop: 16 }}
                >
                  <div className="relative w-full overflow-hidden leading-none">
                    <img loading="lazy"
                      src={publicUrl('/covers/T-bank/7.webp')}
                      alt={locale === 'ru' ? 'Локализация' : 'Localization'}
                      className="block w-full h-auto max-w-none origin-center scale-[1.055]"
                      style={{ marginTop: 8 }}
                    />
                  </div>
                </div>
              </div>

            {/* Варианты перевода — T-Bank only */}
              <div className="flex flex-col" style={{ marginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Варианты перевода' : 'Translation Variants'}
                </h2>
                {/* Mobile: horizontal carousel */}
                <div className="chip-image-gap md:hidden">
                  <div
                    ref={translationVariantsScrollRef}
                    onScroll={handleTranslationVariantsScroll}
                    className="no-scrollbar flex flex-row flex-nowrap overflow-x-auto snap-x snap-mandatory gap-[12px]"
                    style={{ padding: '0 16px', WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                  >
                    {TBANK_TRANSLATION_VARIANTS.map(({ label, src }) => (
                      <div key={label} className="snap-center shrink-0" style={{ width: 'calc(100vw - 64px)' }}>
                        <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[#F5F5F5] h-[210px] flex items-center justify-center">
                          <img loading="lazy"
                            src={src}
                            alt={label}
                            draggable={false}
                            className="block object-contain"
                            style={{ maxWidth: '90%', maxHeight: '100%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-[6px]" style={{ marginTop: 12 }}>
                    {TBANK_TRANSLATION_VARIANTS.map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#1a1a1a',
                          opacity: translationVariantSlide === idx ? 1 : 0.2,
                          transition: 'opacity 200ms ease',
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Desktop/tablet: original static non-carousel layout */}
                <div className="hidden md:flex md:flex-col md:gap-[24px] chip-image-gap">
                  {TBANK_TRANSLATION_VARIANTS.map(({ label, src }) => (
                    <div key={label} className="w-full rounded-[var(--radius-media)] overflow-hidden">
                      <div className="relative w-full overflow-hidden leading-none">
                        <img loading="lazy"
                          src={src}
                          alt={label}
                          className="block w-full h-auto max-w-none origin-center scale-[1.02]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            {/* Внести ясность получения рассрочки — T-Bank only */}
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
                    <img loading="lazy"
                      src={publicUrl('/covers/T-bank/8.webp')}
                      alt={locale === 'ru' ? 'Внести ясность получения рассрочки' : 'Clarifying Installment Approval'}
                      className="block w-full h-auto max-w-none origin-center scale-[1.055]"
                    />
                  </div>
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden"
                  style={{ marginTop: 16 }}
                >
                  <div className="relative w-full overflow-hidden leading-none">
                    <img loading="lazy"
                      src={publicUrl('/covers/T-bank/19.webp')}
                      alt={locale === 'ru' ? 'Внести ясность получения рассрочки' : 'Clarifying Installment Approval'}
                      className="block w-full h-auto max-w-none origin-center scale-[1.055]"
                    />
                  </div>
                </div>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]" style={{ marginTop: 24 }}>
                  {locale === 'ru'
                    ? typograph('При переходе в условиях «Подробнее про получение кредита (заема) или рассрочки» пользователь продолжает путь с\u00A0веб-страницы, где получает информацию о\u00A0кредитных продуктах. В\u00A0рамках решения кейса я\u00A0расширила языковую поддержку веб-страницы, синхронизировав ее с\u00A0формой оформления')
                    : typograph('When navigating to the conditions for "Foreigners", the user continues their journey from a\u00A0web page where they receive information about credit products. As part of the case solution, I\u00A0expanded the language support of the web page, synchronizing it with the application form')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)]"
                  style={{ marginTop: 16 }}
                >
                  <div className="relative w-full overflow-hidden leading-none">
                    <img loading="lazy"
                      src={publicUrl('/covers/T-bank/13.webp')}
                      alt={locale === 'ru' ? 'Расширение языковой поддержки веб-страницы' : 'Web page language support expansion'}
                      className="block w-full h-auto max-w-none origin-center scale-[1.055]"
                      style={{ marginTop: 5 }}
                    />
                  </div>
                </div>
              </div>

            {/* Пошаговый индикатор оформления заявки — T-Bank only */}
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Пошаговый индикатор оформления заявки' : 'Step-by-Step Application Progress Indicator'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('Пользователи с\u00A0иностранными документами сталкиваются с\u00A0увеличенным количеством полей ввода, что усложняет навигацию по\u00A0форме и\u00A0повышает вероятность ошибок')
                      : typograph('Users with foreign documents face an increased number of input fields, which complicates form navigation and raises the likelihood of errors')}
                  </p>
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('Если разделить процесс сбора данных на\u00A04 логических этапа, это поможет снизить когнитивную нагрузку и\u00A0повысить завершение заявки')
                      : typograph('Splitting the data collection process into 4 logical stages will help reduce cognitive load and increase application completion')}
                  </p>
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] leading-none"
                  style={{ marginTop: 16 }}
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/15.webp')}
                    alt={locale === 'ru' ? 'Пошаговый индикатор оформления заявки' : 'Step-by-Step Application Progress Indicator'}
                    className="block w-full h-auto"
                  />
                </div>
              </div>

            {/* Расширение типов документов в анкете — T-Bank only */}
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
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/9.webp')}
                    alt={locale === 'ru' ? 'Расширение типов документов в анкете' : 'Expanding Document Types'}
                    className="block w-full h-auto"
                  />
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] leading-none"
                  style={{ marginTop: 24 }}
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/10.webp')}
                    alt={locale === 'ru' ? 'Расширение типов документов' : 'Expanding Document Types'}
                    className="block w-full h-auto"
                  />
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden leading-none"
                  style={{ marginTop: 24 }}
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/21.webp')}
                    alt={locale === 'ru' ? 'Расширение типов документов' : 'Expanding Document Types'}
                    className="block w-full h-auto"
                  />
                </div>
              </div>

            {/* Статус проживания — T-Bank only */}
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Статус проживания' : 'Residence Status'}
                </h2>
                <div className="flex flex-col gap-[8px] text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <p className="m-0">
                    {locale === 'ru'
                      ? typograph('Иностранные пользователи чаще получают отказы из-за недостатка данных для оценки их легального статуса и\u00A0стабильности проживания. Добавление документа о\u00A0статусе долгосрочного проживания может снизить неопределенность в\u00A0скоринге, повысить вероятность одобрения заявки и\u00A0снизить риски для банка за\u00A0счет подтверждения долгосрочного статуса клиента')
                      : typograph('Foreign users are more likely to receive rejections due to insufficient data for assessing their legal status and residency stability. Adding a long-term residency status document can reduce uncertainty in scoring, increase the likelihood of application approval, and lower bank risks by confirming the client\u2019s long-term status')}
                  </p>
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] leading-none"
                  style={{ marginTop: 16 }}
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/16.webp')}
                    alt={locale === 'ru' ? 'Статус проживания' : 'Residence Status'}
                    className="block w-full h-auto"
                  />
                </div>
              </div>

            {/* Предварительная оценка шанса одобрения — T-Bank only */}
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
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/11.webp')}
                    alt={locale === 'ru' ? 'Предварительная оценка шанса одобрения' : 'Preliminary Approval Chance Assessment'}
                    className="block w-full h-auto origin-center scale-[0.992]"
                  />
                </div>
              </div>

            {/* Кредитная карта для иностранцев — T-Bank only */}
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
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/12.webp')}
                    alt={locale === 'ru' ? 'Предварительная оценка шанса одобрения' : 'Preliminary Approval Chance Assessment'}
                    className="block w-full h-auto origin-center scale-[0.992]"
                  />
                </div>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] leading-none"
                  style={{ marginTop: 16 }}
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/20.webp')}
                    alt={locale === 'ru' ? 'Кредитная карта для иностранцев' : 'Credit Card for Foreigners'}
                    className="block w-full h-auto origin-center"
                  />
                </div>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]" style={{ marginTop: 24 }}>
                  {locale === 'ru'
                    ? typograph('Переход по\u00A0кнопке «оформить кредитную карту для иностранцев» открывает веб-страницу существующего раздела оформления кредитной карты для иностранцев')
                    : typograph('Clicking the "apply for a credit card for foreigners" button opens a\u00A0web page of the existing credit card application section for foreigners')}
                </p>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] leading-none"
                  style={{ marginTop: 16 }}
                >
                  <img loading="lazy"
                    src={publicUrl('/covers/T-bank/14.webp')}
                    alt={locale === 'ru' ? 'Кредитная карта для иностранцев — переход на оформление' : 'Credit Card for Foreigners — application link'}
                    className="block w-full h-auto origin-center scale-[1.002]"
                  />
                </div>
              </div>

            {/* Тестирование — T-Bank only */}
              <div className="flex flex-col gap-[8px]" style={{ marginTop: 84, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Тестирование' : 'Testing'}
                </h2>
                <div className="flex flex-col gap-[8px]">
                  <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                    {locale === 'ru'
                      ? typograph('Провела качественное тестирование макетов обновленной формы с иностранными пользователями с РВП и ВНЖ. Проверяла, какие решения снижают неопределенность, делают сценарий понятнее и помогают в процессе завершения заявки')
                      : typograph('To validate hypotheses, an interactive prototype of the updated installment application form was developed. The scenario included filling out the form, selecting document type, receiving a preliminary approval estimate, and applying for a credit card. The prototype was tested on respondents from the TRP and RP segments.')}
                  </p>
                </div>

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
                    { ru: 'Пошаговый индикатор', en: 'Step indicator' },
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
                <div className="rounded-[var(--radius-media)] bg-[#F5F5F5] overflow-hidden chip-image-gap">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
                    {/* Left — text column (below image on mobile, left on desktop) */}
                    <div className="order-2 md:order-1 flex flex-col gap-[8px]" style={{ padding: '24px' }}>
                      <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                        {locale === 'ru' ? 'Контекст' : 'Context'}
                      </h3>
                      <p className="text-[16px] font-medium text-[var(--color-text-secondary)]" style={{ margin: 0 }}>
                        {activeTbankTestChip === 1
                          ? (locale === 'ru'
                            ? typograph('Проверяла, помогает\u00A0ли пошаговый индикатор прогресса снизить тревожность пользователя в\u00A0процессе заполнения формы и\u00A0повысить уверенность в\u00A0завершении заявки')
                            : typograph('Tested whether a step-by-step progress indicator reduces user anxiety during form completion and increases confidence in finishing the application.'))
                          : activeTbankTestChip === 2
                          ? (locale === 'ru'
                            ? typograph('Проверяла, снижает\u00A0ли расширение списка принимаемых документов количество отказов на\u00A0этапе верификации и как меняется конверсия на\u00A0завершение заявки')
                            : typograph('Tested whether expanding the list of accepted documents reduces rejections at verification and increases application completion rate.'))
                          : activeTbankTestChip === 3
                          ? (locale === 'ru'
                            ? typograph('Проверяла, повышает\u00A0ли динамическое отображение вероятности одобрения готовность пользователя продолжить оформление и\u00A0снижает\u00A0ли ощущение неопределённости')
                            : typograph('Tested whether dynamically displaying approval probability increases user willingness to continue and reduces uncertainty.'))
                          : activeTbankTestChip === 4
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
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Индикатор этапов снизил ощущение неизвестности и\u00A0помог пользователям понять, сколько шагов осталось до\u00A0завершения') : typograph('— The step indicator reduced uncertainty and helped users understand how many steps remained')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Респонденты реже прерывали заполнение формы на\u00A0промежуточных этапах при наличии видимого прогресса') : typograph('— Respondents were less likely to abandon the form mid-way when visible progress was shown')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Наличие индикатора воспринималось как признак продуманного интерфейса и\u00A0повышало доверие к\u00A0сервису') : typograph('— The presence of the indicator was perceived as a sign of a well-designed interface and increased trust in the service')}</p>
                          </>
                        ) : activeTbankTestChip === 2 ? (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Пользователи с\u00A0нестандартными документами проходили верификацию без ручного обращения в\u00A0поддержку или отказа от заполнения формы') : typograph('— Users with non-standard documents passed verification without manual support requests')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Конверсия в\u00A0завершение заявки выросла за\u00A0счёт устранения тупикового сценария на\u00A0этапе выбора документа') : typograph('— Application completion rate increased by eliminating the dead-end scenario at the document selection step')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Респонденты отметили, что наличие знакомого типа документа в\u00A0списке повысило доверие к\u00A0сервису') : typograph('— Respondents noted that seeing a familiar document type in the list increased trust in the service')}</p>
                          </>
                        ) : activeTbankTestChip === 3 ? (
                          <>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Индикатор вероятности одобрения снизил тревожность и\u00A0повысил готовность продолжить оформление') : typograph('— The approval probability indicator reduced anxiety and increased willingness to continue')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Пользователи воспринимали шкалу как прозрачную обратную связь, а\u00A0не как маркетинговый элемент') : typograph('— Users perceived the scale as transparent feedback, not a marketing element')}</p>
                            <p style={{ margin: 0 }}>{locale === 'ru' ? typograph('— Динамическое обновление оценки при изменении данных мотивировало заполнять форму полностью') : typograph('— Dynamic estimate updates when changing data motivated users to complete the form fully')}</p>
                          </>
                        ) : activeTbankTestChip === 4 ? (
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

                    {/* Right — image column: on top on mobile (order-1), right on desktop */}
                    <div className="order-1 md:order-2 h-[220px] md:h-auto flex items-start justify-end overflow-visible">
                      {TBANK_TESTING_PROTOTYPE_IMAGES.map((src, idx) => (
                        <div
                          key={src}
                          className={`h-full${idx === 0 ? ' rounded-[var(--radius-media)] shadow-[0_0_6px_rgba(0,0,0,0.11)] overflow-hidden' : ' overflow-hidden'}`}
                          style={{ display: activeTbankTestChip === idx ? 'block' : 'none' }}
                        >
                          <img
                            src={src}
                            alt={locale === 'ru' ? 'Экраны прототипа' : 'Prototype screens'}
                            className="h-full w-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            {/* Насколько реалистичный прогноз? — T-Bank only */}
              <div id="section-testing" className="flex flex-col gap-[8px]" style={{ marginTop: 84, scrollMarginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Насколько реалистичный прогноз?' : 'How Realistic Is This Forecast?'}
                </h2>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {locale === 'ru'
                    ? typograph('Решение не\u00A0снимает базовые ограничения кредитования иностранных граждан. Тем не\u00A0менее прогноз остается реалистичным на\u00A0уровне пользовательского пути. Даже без изменений в\u00A0кредитной политике можно сократить нерелевантный drop-off, уменьшить количество ошибок при заполнении анкеты и\u00A0сделать сценарий более понятным для пользователей с\u00A0иностранными документами. Ожидаемый эффект решения\u00A0— сделать форму продукта более доступной, чтобы убрать искусственные барьеры в\u00A0интерфейсе и\u00A0помочь релевантным пользователям дойти до отправки заявки на\u00A0рассмотрение банком')
                    : typograph('The solution does not remove the underlying restrictions on lending to foreign citizens. Nevertheless, the forecast remains realistic at the level of the user journey. Even without changes to credit policy, it is possible to reduce irrelevant drop-off, decrease the number of errors when filling out the form, and make the scenario more understandable for users with foreign documents. The expected effect of the solution is to make the product form more accessible — to remove artificial barriers in the interface and help relevant users reach the point of submitting their application for bank review')}
                </p>
              </div>
    </>
  );
}
