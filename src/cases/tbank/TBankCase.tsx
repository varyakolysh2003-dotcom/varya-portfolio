import { useCallback, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Locale } from '../../types';
import { typograph } from '../../utils/typograph';

/** T-Bank testing block: prototype screens in filename order (same for RU/EN). */
const TBANK_TESTING_PROTOTYPE_IMAGES = [
  '/covers/T-bank/1_1.webp',
  '/covers/T-bank/1_2.webp',
  '/covers/T-bank/1_3.webp',
  '/covers/T-bank/1_4.webp',
] as const;

const TBANK_TRANSLATION_VARIANTS = [
  { label: 'Kazakh', src: '/covers/T-bank/Kazakhskyu.webp' },
  { label: 'Kyrgyz', src: '/covers/T-bank/Kyrgyzskyu.webp' },
  { label: 'Tajik', src: '/covers/T-bank/Tadjitsky.webp' },
  { label: 'Uzbek', src: '/covers/T-bank/Uzbekskyu.webp' },
  { label: 'Belarusian', src: '/covers/T-bank/Belorussky.webp' },
] as const;

type PersonaId = 'families' | 'friends' | 'colleagues' | 'couples' | 'students' | 'rvp' | 'vnzh';

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

            {/* Пути решения — T-Bank only */}
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

            {/* Основные ограничения — T-Bank only */}
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

            {/* Custdev и анализ персон — T-Bank only */}
            <div className="flex flex-col gap-[16px] md:gap-[24px]" style={{ marginTop: 84 }}>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px] md:items-start">
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

            {/* Слабые точки пути пользователей — T-Bank only */}
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

            {/* JTBD — T-Bank only */}
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

            {/* Архитектура — T-Bank only */}
              <div className="flex flex-col" style={{ marginTop: 84 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Архитектура' : 'Architecture'}
                </h2>
                <div
                  className="w-full rounded-[var(--radius-media)] overflow-hidden shadow-[0_0_6px_rgba(0,0,0,0.11)] chip-image-gap"
                >
                  <img
                    src="/covers/T-bank/5.webp"
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
                  <img
                    src="/covers/T-bank/6.webp"
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

            {/* Варианты перевода — T-Bank only */}
              <div className="flex flex-col" style={{ marginTop: 32 }}>
                <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
                  {locale === 'ru' ? 'Варианты перевода' : 'Translation Variants'}
                </h2>
                <div className="chip-image-gap">
                  {/* Mobile: horizontal carousel */}
                  <div className="md:hidden">
                    <div
                      ref={translationVariantsScrollRef}
                      onScroll={handleTranslationVariantsScroll}
                      className="no-scrollbar flex flex-row flex-nowrap overflow-x-auto snap-x snap-mandatory"
                      style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                    >
                      {TBANK_TRANSLATION_VARIANTS.map(({ label, src }) => (
                        <div key={label} className="snap-center shrink-0 min-w-full">
                          <div className="w-full rounded-[var(--radius-media)] overflow-hidden">
                            <div className="relative w-full overflow-hidden leading-none bg-[#F5F5F5]">
                              <img
                                src={src}
                                alt={label}
                                draggable={false}
                                className="block w-full h-auto max-w-none origin-center scale-[1.02]"
                              />
                            </div>
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

                  {/* Desktop/tablet: static non-carousel layout */}
                  <div className="hidden md:flex md:flex-col md:gap-[24px]">
                    {TBANK_TRANSLATION_VARIANTS.map(({ label, src }) => (
                      <div key={label} className="w-full rounded-[var(--radius-media)] overflow-hidden">
                        <div className="relative w-full overflow-hidden leading-none bg-[#F5F5F5]">
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
                    <img
                      src="/covers/T-bank/8.webp"
                      alt={locale === 'ru' ? 'Внести ясность получения рассрочки' : 'Clarifying Installment Approval'}
                      className="block w-full h-auto max-w-none origin-center scale-[1.055]"
                    />
                  </div>
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
                  <img
                    src="/covers/T-bank/9.webp"
                    alt={locale === 'ru' ? 'Расширение типов документов в анкете' : 'Expanding Document Types'}
                    className="block w-full h-auto"
                  />
                </div>
              </div>

            {/* Экран 10 — T-Bank only */}
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
                  <img
                    src="/covers/T-bank/11.webp"
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
                  <img
                    src="/covers/T-bank/12.webp"
                    alt={locale === 'ru' ? 'Предварительная оценка шанса одобрения' : 'Preliminary Approval Chance Assessment'}
                    className="block w-full h-auto origin-center scale-[0.992]"
                  />
                </div>
              </div>

            {/* Тестирование — T-Bank only */}
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
                  className="rounded-[var(--radius-media)] bg-[#F5F5F5] overflow-hidden chip-image-gap"
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

            {/* Насколько реалистичный прогноз? — T-Bank only */}
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
    </>
  );
}
