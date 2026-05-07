import { useState, useRef, useCallback } from 'react';
import type { Locale } from '../../types';
import { typograph } from '../../utils/typograph';
import { publicUrl } from '../../utils/publicUrl';
import CarouselDots from '../../components/CarouselDots';

type TBankTravelCaseProps = {
  locale: Locale;
};

export default function TBankTravelCase({ locale }: TBankTravelCaseProps) {
  const [mobileUpdateSlide, setMobileUpdateSlide] = useState(0);
  const updateScrollRef = useRef<HTMLDivElement>(null);
  const handleUpdateScroll = useCallback(() => {
    const el = updateScrollRef.current;
    if (!el) return;
    setMobileUpdateSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const [mobileUnifiedSlide, setMobileUnifiedSlide] = useState(0);
  const unifiedScrollRef = useRef<HTMLDivElement>(null);
  const handleUnifiedScroll = useCallback(() => {
    const el = unifiedScrollRef.current;
    if (!el) return;
    setMobileUnifiedSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const [mobilePushSlide, setMobilePushSlide] = useState(0);
  const pushScrollRef = useRef<HTMLDivElement>(null);
  const handlePushScroll = useCallback(() => {
    const el = pushScrollRef.current;
    if (!el) return;
    setMobilePushSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const [mobileBookingSlide, setMobileBookingSlide] = useState(0);
  const bookingScrollRef = useRef<HTMLDivElement>(null);
  const handleBookingScroll = useCallback(() => {
    const el = bookingScrollRef.current;
    if (!el) return;
    setMobileBookingSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const [mobileChatSlide, setMobileChatSlide] = useState(0);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const handleChatScroll = useCallback(() => {
    const el = chatScrollRef.current;
    if (!el) return;
    setMobileChatSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const [mobilePermissionsSlide, setMobilePermissionsSlide] = useState(0);
  const permissionsScrollRef = useRef<HTMLDivElement>(null);
  const handlePermissionsScroll = useCallback(() => {
    const el = permissionsScrollRef.current;
    if (!el) return;
    setMobilePermissionsSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const [mobilePaymentSlide, setMobilePaymentSlide] = useState(0);
  const paymentScrollRef = useRef<HTMLDivElement>(null);
  const handlePaymentScroll = useCallback(() => {
    const el = paymentScrollRef.current;
    if (!el) return;
    setMobilePaymentSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const [mobileSmallExpensesSlide, setMobileSmallExpensesSlide] = useState(0);
  const smallExpensesScrollRef = useRef<HTMLDivElement>(null);
  const handleSmallExpensesScroll = useCallback(() => {
    const el = smallExpensesScrollRef.current;
    if (!el) return;
    setMobileSmallExpensesSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  // Section 9 — unified payment regulation carousel
  const [payRegSlide, setPayRegSlide] = useState(0);
  const payRegScrollRef = useRef<HTMLDivElement>(null);
  const handlePayRegScroll = useCallback(() => {
    const el = payRegScrollRef.current;
    if (!el) return;
    setPayRegSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  // Section — Получить перевод
  const [getTransferSlide, setGetTransferSlide] = useState(0);
  const getTransferScrollRef = useRef<HTMLDivElement>(null);
  const handleGetTransferScroll = useCallback(() => {
    const el = getTransferScrollRef.current;
    if (!el) return;
    setGetTransferSlide(Math.round(el.scrollLeft / el.clientWidth));
  }, []);


  return (
    <>
      {/* ── Выделение ключевых поинтов ─── section-analysis anchor ── */}
      <div
        id="section-analysis"
        className="flex flex-col gap-[24px] scroll-mt-[72px] min-[1500px]:scroll-mt-[32px]"
        style={{ marginTop: 88 }}
      >
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'Выделение ключевых поинтов' : 'Identifying Key Points'}
          </h2>
          <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
            {locale === 'ru'
              ? typograph('Перед началом анализа я выделила самые главные ключевые поинты из данных, предоставленных в ТЗ')
              : typograph('Before starting the analysis, I identified the most important key points from the data provided in the brief')}
          </p>
        </div>
        <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/13.webp')}
            alt={locale === 'ru' ? 'Выделение ключевых поинтов' : 'Identifying key points'}
            className="block w-full object-cover"
          />
        </div>
      </div>

      {/* ── Research Question ────────────────────────────── */}
      <div
        className="flex flex-col gap-[16px]"
        style={{ marginTop: 88 }}
      >
        {/* Main research question — primary body text for visual accent */}
        <div className="bg-[var(--color-surface-muted)] rounded-[24px]" style={{ padding: 24 }}>
          <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'Основной исследовательский вопрос' : 'Core Research Question'}
          </h3>
          <p className="text-[16px] font-medium leading-[1.55] text-[var(--color-text-secondary)]" style={{ marginTop: 8 }}>
            {locale === 'ru'
              ? typograph('Как встроить в приложение Т-Банка сценарий совместной поездки так, чтобы пользователь мог координировать поездку, собирать деньги и фиксировать общие расходы в одном месте?')
              : typograph('How can a group trip scenario be built into the T-Bank app so that a user can coordinate the trip, collect money, and track shared expenses in one place?')}
          </p>
        </div>

        {/* Sub-questions — secondary body text, dash-bullet list */}
        <div className="bg-[var(--color-surface-muted)] rounded-[24px]" style={{ padding: 24 }}>
          <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'Подвопросы для изучения' : 'Sub-questions to Explore'}
          </h3>
          <div className="flex flex-col gap-[8px]" style={{ marginTop: 8 }}>
            <p className="text-[16px] font-medium text-[var(--color-text-secondary)] m-0">
              — {locale === 'ru'
                ? typograph('Где у пользователей самые болезненные точки до, во время и после поездки?')
                : typograph('Where are users\' most painful touchpoints before, during, and after the trip?')}
            </p>
            <p className="text-[16px] font-medium text-[var(--color-text-secondary)] m-0">
              — {locale === 'ru'
                ? typograph('Какие конкуренты частично или полностью закрывают этот сценарий?')
                : typograph('Which competitors partially or fully address this scenario?')}
            </p>
          </div>
        </div>
      </div>

      {/* ── Entities ─────────────────────────────────────── */}
      <div
        className="flex flex-col gap-[24px]"
        style={{ marginTop: 88 }}
      >
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'Сущности' : 'Entities'}
          </h2>
          <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
            {locale === 'ru'
              ? typograph('Объекты, участники и процессы, составляющие сценарий совместного путешествия')
              : typograph('Objects, participants, and processes that make up the group travel scenario')}
          </p>
        </div>

        <div className="bg-[var(--color-surface-muted)] rounded-[24px] overflow-hidden">
          {([
            {
              label: locale === 'ru' ? 'Ситуация' : 'Situation',
              text: locale === 'ru'
                ? typograph('Совместное планирование до начала поездки')
                : typograph('Collaborative planning before the trip'),
            },
            {
              label: locale === 'ru' ? 'Процесс координации' : 'Coordination',
              tags: locale === 'ru'
                ? ['Мессенджеры', 'Заметки', 'Ссылки', 'Переводы', 'Обсуждения']
                : ['Messengers', 'Notes', 'Links', 'Transfers', 'Discussions'],
            },
            {
              label: locale === 'ru' ? 'Роли пользователей' : 'User Roles',
              tags: locale === 'ru'
                ? ['Инициатор поездки', 'Бронирует жилье', 'Покупает билеты', 'Следит за бюджетом', 'Пассивные участники']
                : ['Trip initiator', 'Books accommodation', 'Buys tickets', 'Tracks the budget', 'Passive participants'],
            },
            {
              label: locale === 'ru' ? 'Задачи пользователей' : 'User Tasks',
              tags: locale === 'ru'
                ? ['Регулировать финансы', 'Бронировать жилье', 'Бронировать билеты', 'Собрать участников']
                : ['Manage finances', 'Book accommodation', 'Book tickets', 'Gather participants'],
            },
            {
              label: locale === 'ru' ? 'Место' : 'Location',
              tags: locale === 'ru'
                ? ['Другая страна', 'Внутри страны']
                : ['Another country', 'Within the country'],
            },
          ] as { label: string; text?: string; tags?: string[] }[]).map((row, i, arr) => (
            <div key={i}>
              <div
                className="flex flex-col sm:flex-row sm:items-start gap-[8px] sm:gap-[24px]"
                style={{ padding: '14px 24px' }}
              >
                <span className="text-[16px] font-medium leading-[1.4] text-[var(--color-text-primary)] sm:w-[180px] sm:shrink-0 sm:pt-[3px]">
                  {row.label}
                </span>
                {row.text
                  ? <p className="text-[16px] font-medium leading-[1.5] text-[var(--color-text-primary)] m-0">{row.text}</p>
                  : <div className="flex flex-wrap gap-[6px]">
                      {row.tags!.map((tag) => (
                        <span
                          key={tag}
                          className="skill-pill rounded-[24px] inline-flex items-center"
                          style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', padding: '6px 14px' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                }
              </div>
              {i < arr.length - 1 && (
                <div style={{ height: 1, background: 'var(--color-border)', margin: '0 24px' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Planning Process Details ─────────────────────── */}
      <div
        className="flex flex-col gap-[24px]"
        style={{ marginTop: 88 }}
      >
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'Детали процесса планирования' : 'Planning Process Details'}
          </h2>
          <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
            {locale === 'ru'
              ? typograph('Для анализа я детально разобрала процесс планирования совместных поездок в группе пользователей. Определение процесса точек в организации поездки далее позволит определить, какие группы пользователей станут респондентами для изучения болей и работы над продуктовыми решениями')
              : typograph('As part of the analysis, I mapped out the group trip planning process to identify at which stages the main difficulties arise, disagreements between participants occur, and where opportunities for product decisions emerge')}
          </p>
        </div>

        <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/1.webp')}
            alt={locale === 'ru' ? 'Детали процесса планирования' : 'Planning Process Details'}
            className="block w-full h-auto"
          />
        </div>
      </div>

      {/* ── User Pains ──────────────────────────────────── */}
      <div
        className="flex flex-col gap-[24px]"
        style={{ marginTop: 88 }}
      >
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'Боли пользователей' : 'User Pain Points'}
          </h2>
          <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
            {locale === 'ru'
              ? typograph('Страхи и болевые точки, которые возникают у пользователей на трёх ключевых этапах совместного путешествия')
              : typograph('Fears and pain points that users encounter across three key stages of a group trip')}
          </p>
          <a
            href="https://docs.google.com/spreadsheets/d/1aqgaRVC_Qp0JlpiOxEdD8pI8QDAi5kiTian4ZoVIWYI/edit?gid=1191799932#gid=1191799932"
            target="_blank"
            rel="noreferrer"
            className="case-link"
          >
            {locale === 'ru' ? 'Ссылка на таблицу болей пользователей' : 'User pain points table'}
          </a>
        </div>

        <div className="bg-[var(--color-surface-muted)] rounded-[24px] overflow-hidden">

          {/* До поездки */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-[12px] sm:gap-[24px]" style={{ padding: '14px 24px' }}>
            <span className="text-[16px] font-medium leading-[1.4] text-[var(--color-text-primary)] sm:w-[180px] sm:shrink-0 sm:pt-[3px]">
              До поездки
            </span>
            <div className="flex flex-col gap-[10px]">
              <p className="text-[16px] font-medium leading-[1.5] text-[var(--color-text-secondary)] m-0">
                — {typograph('Пользователь боится, что все долго обсуждают, но в итоге никто не может подтвердить даты, состав участников всё время меняется, бюджет не согласован, решения постоянно пересматриваются. Это страх неорганизованности и потери контроля')}
              </p>
              <p className="text-[16px] font-medium leading-[1.5] text-[var(--color-text-secondary)] m-0">
                — {typograph('Боязнь заплатить за всех и потом бегать за деньгами. Многие пользователи ссылались на страх уйти в минус, если они заплатят за кого-то при планировании, чтобы поездка не сорвалась')}
              </p>
              <p className="text-[16px] font-medium leading-[1.5] text-[var(--color-text-secondary)] m-0">
                — {typograph('Страх, что поездка окажется дороже, чем казалось вначале. Пользователи могут не понимать полного объёма трат на поездку, пока не столкнутся с подробными деталями при планировании или непосредственно во время поездки')}
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--color-border)', margin: '0 24px' }} />

          {/* Во время */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-[12px] sm:gap-[24px]" style={{ padding: '14px 24px' }}>
            <span className="text-[16px] font-medium leading-[1.4] text-[var(--color-text-primary)] sm:w-[180px] sm:shrink-0 sm:pt-[3px]">
              Во время
            </span>
            <div className="flex flex-col gap-[10px]">
              <p className="text-[16px] font-medium leading-[1.5] text-[var(--color-text-secondary)] m-0">
                — {typograph('Страх потерять контроль над расходами продолжает логику страха во время планирования, однако пользователь уже находится в уязвимом положении во время поездки с другими людьми')}
              </p>
              <p className="text-[16px] font-medium leading-[1.5] text-[var(--color-text-secondary)] m-0">
                — {typograph('Страх несправедливости распределения финансов между людьми. Во время поездки быстро всплывают сложные случаи, например: кто-то не поехал на экскурсию, кто-то не пил алкоголь, кто-то не жил в том же месте, часть расходов относится только к подгруппе. В итоге пользователь платит за то, на что фактически не скидывался')}
              </p>
              <p className="text-[16px] font-medium leading-[1.5] text-[var(--color-text-secondary)] m-0">
                — {typograph('Страх мониторинга финансов и коммуникации, когда вместо отдыха надо мониторить баланс и расходы, координировать других людей из группы и поддерживать внеплановые идеи')}
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--color-border)', margin: '0 24px' }} />

          {/* После поездки */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-[12px] sm:gap-[24px]" style={{ padding: '14px 24px' }}>
            <span className="text-[16px] font-medium leading-[1.4] text-[var(--color-text-primary)] sm:w-[180px] sm:shrink-0 sm:pt-[3px]">
              После поездки
            </span>
            <div className="flex flex-col gap-[10px]">
              <p className="text-[16px] font-medium leading-[1.5] text-[var(--color-text-secondary)] m-0">
                — {typograph('Напоминать друзьям о долгах. Один из самых сильных post-trip страхов, так как пользователь боится выглядеть мелочным, портить отношения, ставить другого в неловкое положение. Из-за этого даже очевидные суммы могут зависать очень надолго, а отношения портиться соответственно')}
              </p>
              <p className="text-[16px] font-medium leading-[1.5] text-[var(--color-text-secondary)] m-0">
                — {typograph('Страх остаться в минусе после поездки. Часто возникает, если бюджет или обязанности были спланированы недостаточно хорошо, или если кто-то вышел за рамки личного/общего бюджета')}
              </p>
              <p className="text-[16px] font-medium leading-[1.5] text-[var(--color-text-secondary)] m-0">
                — {typograph('Страх повторения этого хаоса в следующей поездке. На психологическом уровне негативный опыт закрепляется сильнее положительного, и пользователи закрепляют модель, где они уже не хотят отвечать за что-то одно или платить за кого-то')}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Insights ────────────────────────────────────── */}
      <div
        className="flex flex-col gap-[24px]"
        style={{ marginTop: 88 }}
      >
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'Инсайты, выведенные из болей' : 'Insights Derived from Pain Points'}
          </h2>
          <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
            {locale === 'ru'
              ? typograph('После опроса групп пользователей разной категории я выделила следующие инсайты')
              : typograph('Key findings that informed the product decisions.')}
          </p>
        </div>

        <div className="flex flex-col gap-[12px]">
          {([
            {
              label: locale === 'ru' ? 'До поездки' : 'Before the trip',
              items: [
                {
                  title: locale === 'ru' ? 'Боль начинается до поездки' : 'Pain starts before the trip',
                  body: locale === 'ru' ? 'Рынок фокусируется на итоговом отчёте, но главная боль возникает ещё на этапе планирования' : 'The market focuses on post-trip reports, but the real pain emerges during planning',
                },
                {
                  title: locale === 'ru' ? 'Решение распределено по источникам' : 'Decision-making is fragmented',
                  body: locale === 'ru' ? 'Пользователи обходят несколько источников, скрининг распределяется между участниками — координация распадается' : 'Users scan multiple sources before deciding; that screening is distributed among members and coordination breaks down',
                },
              ],
            },
            {
              label: locale === 'ru' ? 'Во время поездки' : 'During the trip',
              items: [
                {
                  title: locale === 'ru' ? 'Скорость фиксации важнее глубины функций' : 'Speed of capture beats feature depth',
                  body: locale === 'ru' ? 'Траты редко вносят в моменте — чаще в конце дня или по возвращении домой' : 'Expenses are rarely logged on the spot — usually at day\'s end or after returning home',
                },
                {
                  title: locale === 'ru' ? 'Мелкие траты дают наибольшее расхождение' : 'Small expenses create the biggest gaps',
                  body: locale === 'ru' ? 'Незафиксированные мелочи чаще всего ломают итоговый баланс — объяснить суммы уже невозможно' : 'Unlogged small purchases cause most discrepancies when settling up — the amounts can no longer be explained',
                },
              ],
            },
            {
              label: locale === 'ru' ? 'После поездки' : 'After the trip',
              items: [
                {
                  title: locale === 'ru' ? 'Нужен персональный итог' : 'Users need a personal summary',
                  body: locale === 'ru' ? 'Непрозрачность вкладов — особенно при оплате за других — создаёт конфликты и остаётся ключевой болью' : 'Unclear who paid what — especially when someone covered others — drives conflict and remains a core pain',
                },
                {
                  title: locale === 'ru' ? 'Нагрузка распределена неравномерно' : 'Burden falls unevenly',
                  body: locale === 'ru' ? 'Острее всего боль ощущают координаторы: те, кто взял на себя бронь, покупки и сбор денег' : 'Those who handle bookings, purchases and money collection carry a disproportionate load',
                },
                {
                  title: locale === 'ru' ? 'Конфиденциальность бюджета' : 'Budget privacy matters',
                  body: locale === 'ru' ? 'Не все готовы раскрывать точные суммы — это создаёт напряжение, если данные могут быть использованы в конфликте' : 'Not everyone will disclose exact amounts — this creates tension when that data could be used against them',
                },
              ],
            },
          ] as { label: string; items: { title: string; body: string }[] }[]).map(({ label, items }, gi) => (
            <div key={gi} className="bg-[var(--color-surface-muted)] rounded-[20px] overflow-hidden">
              {/* group label header */}
              <div style={{ padding: '16px 20px 12px' }}>
                <span className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
                  {label}
                </span>
              </div>
              <div style={{ height: 1, background: 'var(--color-border-subtle, rgba(0,0,0,0.07))', margin: '0 20px' }} />

              {/* insight items */}
              {items.map(({ title, body }, ii) => (
                <div key={ii}>
                  <div style={{ padding: '14px 20px', paddingBottom: ii === items.length - 1 ? 18 : 14 }}>
                    <p className="text-[16px] font-semibold leading-[1.4] text-[var(--color-text-primary)] m-0">
                      {typograph(title)}
                    </p>
                    <p className="text-[16px] font-medium leading-[1.55] text-[var(--color-text-secondary)] m-0" style={{ marginTop: 4 }}>
                      {typograph(body)}
                    </p>
                  </div>
                  {ii < items.length - 1 && (
                    <div style={{ height: 1, background: 'var(--color-border-subtle, rgba(0,0,0,0.07))', margin: '0 20px' }} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Бенчмаркинг ─────────────────────────────── */}
      <div
        className="flex flex-col gap-[24px]"
        style={{ marginTop: 88 }}
      >
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'Бенчмаркинг' : 'Benchmarking'}
          </h2>
          <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
            {locale === 'ru'
              ? typograph('Изучив боли и проблемы пользователей я приступила к анализу рынка, чтобы посмотреть, какие конкуренты имеют фичи и продуктовые решения, способные закрыть боли пользователей на старте. Собрав список с описаниями по каждому продукту я выделила 3-х главных в направлении регулирования финансов и путешествий')
              : typograph('Having studied user pains and problems, I began analysing the market to see which competitors have features and product decisions capable of addressing user pain points at launch. After compiling a list with descriptions for each product, I identified 3 key players in the areas of financial management and travel')}
          </p>
        </div>

        <div className="flex flex-col gap-[24px]">
          <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
            <img
              loading="lazy"
              src={publicUrl('/covers/T-bank 2/14.webp')}
              alt={locale === 'ru' ? 'Бенчмаркинг — обзор конкурентов' : 'Benchmarking — competitor overview'}
              className="block w-full object-cover"
            />
          </div>
          <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
            <img
              loading="lazy"
              src={publicUrl('/covers/T-bank 2/15.webp')}
              alt={locale === 'ru' ? 'Бенчмаркинг — сравнительный анализ' : 'Benchmarking — comparative analysis'}
              className="block w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── Зона возможностей и ограничений ─────────── */}
      <div
        className="flex flex-col gap-[24px]"
        style={{ marginTop: 88 }}
      >
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? typograph('Зона возможностей и ограничений') : 'Zone of Opportunities and Constraints'}
          </h2>
        </div>

        <div className="flex flex-col gap-[16px]">
          {/* Тёмный блок — конкуренты */}
          <div className="bg-[var(--color-surface-muted)] rounded-[24px]" style={{ padding: 24 }}>
            <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
              {locale === 'ru'
                ? typograph('Что стоит рассмотреть у этих продуктов в пользу Т-банка')
                : typograph('What to take from these products for T-Bank')}
            </h3>
            <div className="flex flex-col gap-[8px]" style={{ marginTop: 12 }}>
              <p className="text-[16px] font-medium leading-[1.55] text-[var(--color-text-secondary)] m-0">
                {locale === 'ru'
                  ? typograph('Wanderlog: экосистему планирования поездки')
                  : typograph('Wanderlog: the trip planning ecosystem')}
              </p>
              <p className="text-[16px] font-medium leading-[1.55] text-[var(--color-text-secondary)] m-0">
                {locale === 'ru'
                  ? typograph('Revolut: Идею bank-native group money, где есть групповой бюджет, счета, участие внешних людей')
                  : typograph('Revolut: the bank-native group money idea — shared budget, accounts, and external participant support')}
              </p>
              <p className="text-[16px] font-medium leading-[1.55] text-[var(--color-text-secondary)] m-0">
                {locale === 'ru'
                  ? typograph('Tricount: Идею мультивалютности внутри группового счета')
                  : typograph('Tricount: multi-currency support within a group account')}
              </p>
            </div>
          </div>

          {/* Жёлтый блок — зона возможностей */}
          <div className="rounded-[24px] bg-[var(--accent-tbank)]" style={{ padding: 24 }}>
            <h3 className="font-sans text-[20px] font-semibold leading-[1.3] text-[#1a1a1a]">
              {locale === 'ru' ? '!Зона возможностей Т-банка!' : '!T-Bank\'s Zone of Opportunity!'}
            </h3>
            <div className="flex flex-col gap-[8px]" style={{ marginTop: 12 }}>
              <p className="text-[16px] font-medium leading-[1.55] text-[#1a1a1a] m-0">
                {locale === 'ru'
                  ? typograph('Объединить экосистему планирования + sharing bill ecosystem через Т-путешествия')
                  : typograph('Combine the planning ecosystem + sharing bill ecosystem through T-Travel')}
              </p>
              <p className="text-[16px] font-medium leading-[1.55] text-[#1a1a1a] m-0">
                {locale === 'ru'
                  ? typograph('Оплата в странах с отсутствием поддержки Master Card и МИР в настоящий момент недоступна, так что мультивалютность нужно поддерживать в странах, где на момент 2026 года оплата будет доступна (пример: Абхазия, Азербайджан, Армения, Беларусь, Венесуэла, Вьетнам, Иран, Казахстан, на Кубе, в Лаосе, Мьянме, Никарагуа, Таджикистане и Южной Осетии)')
                  : typograph('Payment in countries where Master Card and MIR are not supported is currently unavailable, so multi-currency support should cover countries where payment will be accessible as of 2026 (e.g. Abkhazia, Azerbaijan, Armenia, Belarus, Venezuela, Vietnam, Iran, Kazakhstan, Cuba, Laos, Myanmar, Nicaragua, Tajikistan, and South Ossetia)')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── User Flow ────────────────────────────────── */}
      <div
        className="flex flex-col gap-[24px]"
        style={{ marginTop: 88 }}
      >
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'User Flow' : 'User Flow'}
          </h2>
          <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
            {locale === 'ru'
              ? typograph('Я собрала процесс организации поездки пользователей из опроса вне экосистемы Т-Банка и на его основе проработала User Flow процесс планирования внутри приложения в разделе групповых путешествий')
              : typograph('I mapped the trip organisation process from user surveys outside the T-Bank ecosystem and used it as the basis for a User Flow of the planning process inside the app\'s group travel section')}
          </p>
        </div>

        <div className="flex flex-col gap-[24px]">
          <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
            <img
              loading="lazy"
              src={publicUrl('/covers/T-bank 2/11.webp')}
              alt={locale === 'ru' ? 'User Flow — процесс организации поездки вне экосистемы' : 'User Flow — trip organisation outside the ecosystem'}
              className="block w-full object-cover"
            />
          </div>
          <div className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
            <img
              loading="lazy"
              src={publicUrl('/covers/T-bank 2/12.webp')}
              alt={locale === 'ru' ? 'User Flow — процесс планирования внутри приложения' : 'User Flow — planning process inside the app'}
              className="block w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* 1 — Обновление раздела «Путешествия» */}
      <div id="section-solutions" className="flex flex-col gap-[8px] scroll-mt-[72px] min-[1500px]:scroll-mt-[32px]" style={{ marginTop: 88 }}>
        <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
          {locale === 'ru' ? 'Обновление раздела «Путешествия»' : 'Travel Section Update'}
        </h2>

        {/* Mobile carousel — hidden on md+ */}
        <div className="case-section-content md:hidden">
          <div
            className="w-full bg-[var(--color-surface-muted)] overflow-hidden flex flex-col"
            style={{ borderRadius: 'var(--radius-media)' }}
          >
            <div
              ref={updateScrollRef}
              onScroll={handleUpdateScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              style={{ height: '500px' }}
            >
              {(['1_0', '1_1', '1_2'] as const).map((n) => (
                <div key={n} className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={publicUrl(`/covers/T-bank 2/mobile/${n}.webp`)}
                    alt={locale === 'ru' ? `Обновление раздела «Путешествия» — ${n}` : `Travel Section Update — ${n}`}
                    style={{ height: '460px', width: 'auto', borderRadius: '24px', display: 'block', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                  />
                </div>
              ))}
            </div>
            <CarouselDots count={3} active={mobileUpdateSlide} className="pt-[12px] pb-[16px]" />
          </div>
        </div>

        {/* Desktop image — hidden on mobile */}
        <div className="case-section-content hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/1_1.webp')}
            alt={locale === 'ru' ? 'Обновление раздела «Путешествия»' : 'Travel Section Update'}
            className="block w-full object-cover"
          />
        </div>
      </div>

      {/* 2 — Единое пространство поездки */}
      <div className="flex flex-col gap-[8px] mt-[48px]">
        <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
          {locale === 'ru' ? 'Единое пространство поездки' : 'Unified trip space'}
        </h2>
        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
          {locale === 'ru'
            ? typograph('Пользователи испытывают основные трудности не из-за самого факта оплаты, а из-за того, что поездка распадается между мессенджерами, ссылками, заметками, бронированиями и переводами. Ценность решения будет в сущности «Совместная поездка» как едином объекте внутри приложения, чтобы минимизировать обращения к внешним ресурсам')
            : typograph('Users\' main difficulty is not the payment itself, but the fact that the trip falls apart across messengers, links, notes, bookings, and transfers. The value lies in treating the joint trip as a single object inside the app — minimizing any reliance on external resources')}
        </p>
        {/* Mobile carousel — hidden on md+ */}
        <div className="case-section-content md:hidden">
          <div
            className="w-full bg-[var(--color-surface-muted)] overflow-hidden flex flex-col"
            style={{ borderRadius: 'var(--radius-media)' }}
          >
            <div
              ref={unifiedScrollRef}
              onScroll={handleUnifiedScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              style={{ height: '500px' }}
            >
              {(['1_3', '2_1', '2_2'] as const).map((n) => (
                <div key={n} className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={publicUrl(`/covers/T-bank 2/mobile/${n}.webp`)}
                    alt={locale === 'ru' ? `Единое пространство поездки — ${n}` : `Unified trip space — ${n}`}
                    style={{ height: '460px', width: 'auto', borderRadius: '24px', display: 'block', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                  />
                </div>
              ))}
            </div>
            <CarouselDots count={3} active={mobileUnifiedSlide} className="pt-[12px] pb-[16px]" />
          </div>
        </div>

        {/* Desktop image — hidden on mobile */}
        <div className="case-section-content hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/2.webp')}
            alt={locale === 'ru' ? 'Единое пространство поездки' : 'Unified trip space'}
            className="block w-full object-cover"
          />
        </div>
      </div>

      {/* 3 — Пуш приглашение пользователей */}
      <div className="flex flex-col gap-[8px] mt-[48px]">
        <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
          {locale === 'ru' ? 'Пуш приглашение пользователей' : 'Push invitation for participants'}
        </h2>
        {/* Mobile carousel — hidden on md+ */}
        <div className="case-section-content md:hidden">
          <div
            className="w-full bg-[var(--color-surface-muted)] overflow-hidden flex flex-col"
            style={{ borderRadius: 'var(--radius-media)' }}
          >
            <div
              ref={pushScrollRef}
              onScroll={handlePushScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              style={{ height: '500px' }}
            >
              {(['2_3', '3_2'] as const).map((n) => (
                <div key={n} className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={publicUrl(`/covers/T-bank 2/mobile/${n}.webp`)}
                    alt={locale === 'ru' ? `Пуш приглашение пользователей — ${n}` : `Push invitation for participants — ${n}`}
                    style={{ height: '460px', width: 'auto', borderRadius: '24px', display: 'block', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                  />
                </div>
              ))}
            </div>
            <CarouselDots count={2} active={mobilePushSlide} className="pt-[12px] pb-[16px]" />
          </div>
        </div>

        {/* Desktop image — hidden on mobile */}
        <div className="case-section-content hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/3.webp')}
            alt={locale === 'ru' ? 'Пуш приглашение пользователей' : 'Push invitation for participants'}
            className="block w-full object-cover"
          />
        </div>
      </div>

      {/* 4 — Бронирование и автозаполнение */}
      <div className="flex flex-col gap-[8px] mt-[48px]">
        <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
          {locale === 'ru' ? typograph('Бронирование и автозаполнение формы под группу пользователей') : typograph('Booking and auto-fill for group members')}
        </h2>
        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
          {locale === 'ru'
            ? typograph('Пользователи могут выбрать заполнение формы данных для бронирование на всю группу. Позже выведенные в список предложения (билетов, отелей, активностей) можно направить ссылкой в мессенджер или чат группы')
            : typograph('Users can choose to fill in booking forms for the entire group. The resulting list of suggestions (tickets, hotels, activities) can then be shared as a link to a messenger or group chat')}
        </p>
        {/* Mobile carousel — hidden on md+ */}
        <div className="case-section-content md:hidden">
          <div
            className="w-full bg-[var(--color-surface-muted)] overflow-hidden flex flex-col"
            style={{ borderRadius: 'var(--radius-media)' }}
          >
            <div
              ref={bookingScrollRef}
              onScroll={handleBookingScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              style={{ height: '500px' }}
            >
              {(['4_1', '4_2', '4_3', '4_4'] as const).map((n) => (
                <div key={n} className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={publicUrl(`/covers/T-bank 2/mobile/${n}.webp`)}
                    alt={locale === 'ru' ? `Бронирование и автозаполнение — ${n}` : `Booking and auto-fill — ${n}`}
                    style={{ height: '460px', width: 'auto', borderRadius: '24px', display: 'block', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                  />
                </div>
              ))}
            </div>
            <CarouselDots count={4} active={mobileBookingSlide} className="pt-[12px] pb-[16px]" />
          </div>
        </div>

        {/* Desktop image — hidden on mobile */}
        <div className="case-section-content hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/4.webp')}
            alt={locale === 'ru' ? 'Бронирование и автозаполнение' : 'Booking and auto-fill'}
            className="block w-full object-cover"
          />
        </div>
      </div>

      {/* 5 — Чат и коммуникация */}
      <div className="flex flex-col gap-[8px] mt-[48px]">
        <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
          {locale === 'ru' ? typograph('Чат и коммуникация') : typograph('Chat and communication')}
        </h2>
        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
          {locale === 'ru'
            ? typograph('В чат можно направлять ссылки на варианты отелей/билетов/мест для бронирования, прикреплять файлы')
            : typograph('In the chat you can share links to hotels/tickets/places for booking and attach files')}
        </p>
        {/* Mobile carousel — hidden on md+ */}
        <div className="case-section-content md:hidden">
          <div
            className="w-full bg-[var(--color-surface-muted)] overflow-hidden flex flex-col"
            style={{ borderRadius: 'var(--radius-media)' }}
          >
            <div
              ref={chatScrollRef}
              onScroll={handleChatScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              style={{ height: '500px' }}
            >
              {(['5_1', '5_2'] as const).map((n) => (
                <div key={n} className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={publicUrl(`/covers/T-bank 2/mobile/${n}.webp`)}
                    alt={locale === 'ru' ? `Чат и коммуникация — ${n}` : `Chat and communication — ${n}`}
                    style={{ height: '460px', width: 'auto', borderRadius: '24px', display: 'block', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                  />
                </div>
              ))}
            </div>
            <CarouselDots count={2} active={mobileChatSlide} className="pt-[12px] pb-[16px]" />
          </div>
        </div>

        {/* Desktop image — hidden on mobile */}
        <div className="case-section-content hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/5.webp')}
            alt={locale === 'ru' ? 'Чат и коммуникация' : 'Chat and communication'}
            className="block w-full object-cover"
          />
        </div>
      </div>

      {/* 6 — Права пользователей */}
      <div className="flex flex-col gap-[8px] mt-[48px]">
        <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
          {locale === 'ru' ? 'Права пользователей' : 'User permissions'}
        </h2>
        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
          {locale === 'ru'
            ? typograph('В большинстве поездок один человек фактически берет на себя функции координатора, даже если формально организатора нет. Если снять нагрузку с этого пользователя, сценарий будет восприниматься как более ценный для всей группы. Поэтому в своем решении все участники равноправно могут регулировать учет финансов')
            : typograph('In most trips, one person effectively takes on the coordinator role even when there is no designated organizer. Relieving this user reduces friction for the whole group. In this solution, all participants can manage finances on equal terms')}
        </p>
        {/* Mobile carousel — hidden on md+ */}
        <div className="case-section-content md:hidden">
          <div
            className="w-full bg-[var(--color-surface-muted)] overflow-hidden flex flex-col"
            style={{ borderRadius: 'var(--radius-media)' }}
          >
            <div
              ref={permissionsScrollRef}
              onScroll={handlePermissionsScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              style={{ height: '500px' }}
            >
              {(['6_1', '6_2', '6_3', '6_4'] as const).map((n) => (
                <div key={n} className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={publicUrl(`/covers/T-bank 2/mobile/${n}.webp`)}
                    alt={locale === 'ru' ? `Права пользователей — ${n}` : `User permissions — ${n}`}
                    style={{ height: '460px', width: 'auto', borderRadius: '24px', display: 'block', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                  />
                </div>
              ))}
            </div>
            <CarouselDots count={4} active={mobilePermissionsSlide} className="pt-[12px] pb-[16px]" />
          </div>
        </div>

        {/* Desktop image — hidden on mobile */}
        <div className="case-section-content hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/6.webp')}
            alt={locale === 'ru' ? 'Права пользователей' : 'User permissions'}
            className="block w-full object-cover"
          />
        </div>
      </div>

      {/* 7 — Оплата расходов / долгов */}
      <div className="flex flex-col gap-[8px] mt-[48px]">
        <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
          {locale === 'ru' ? 'Оплата расходов / долгов' : 'Paying expenses and debts'}
        </h2>
        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
          {locale === 'ru'
            ? typograph('Когда дедлайн оплаты подходит к концу или проходит — расход переходит в состояние долга')
            : typograph('When a payment deadline is approaching or has passed, the expense transitions into a debt state')}
        </p>
        {/* Mobile carousel — hidden on md+ */}
        <div className="case-section-content md:hidden">
          <div
            className="w-full bg-[var(--color-surface-muted)] overflow-hidden flex flex-col"
            style={{ borderRadius: 'var(--radius-media)' }}
          >
            <div
              ref={paymentScrollRef}
              onScroll={handlePaymentScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              style={{ height: '500px' }}
            >
              {(['7_1', '7_2', '7_3', '7_4'] as const).map((n) => (
                <div key={n} className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={publicUrl(`/covers/T-bank 2/mobile/${n}.webp`)}
                    alt={locale === 'ru' ? `Оплата расходов и долгов — ${n}` : `Paying expenses and debts — ${n}`}
                    style={{ height: '460px', width: 'auto', borderRadius: '24px', display: 'block', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                  />
                </div>
              ))}
            </div>
            <CarouselDots count={4} active={mobilePaymentSlide} className="pt-[12px] pb-[16px]" />
          </div>
        </div>

        {/* Desktop image — hidden on mobile */}
        <div className="case-section-content hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/7.webp')}
            alt={locale === 'ru' ? 'Оплата расходов и долгов' : 'Paying expenses and debts'}
            className="block w-full object-cover"
          />
        </div>
      </div>

      {/* 8 — Организация мелких трат */}
      <div className="flex flex-col gap-[8px] mt-[48px]">
        <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
          {locale === 'ru' ? 'Организация мелких трат' : 'Managing small expenses'}
        </h2>
        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
          {locale === 'ru'
            ? typograph('Основной хаос в поездке создают частые мелкие расходы, которые неудобно фиксировать в моменте. Фиксация расходов должна быть автоматизированной, быстрой и простой (если оплата идет наличкой), иначе пользователи откладывают это на потом и данные теряются')
            : typograph('Most in-trip chaos comes from frequent small expenses that are inconvenient to log on the spot. Expense tracking must be automated, fast and simple (if payment is in cash) — otherwise users defer it and data is lost')}
        </p>
        {/* Mobile carousel — hidden on md+ */}
        <div className="case-section-content md:hidden">
          <div
            className="w-full bg-[var(--color-surface-muted)] overflow-hidden flex flex-col"
            style={{ borderRadius: 'var(--radius-media)' }}
          >
            <div
              ref={smallExpensesScrollRef}
              onScroll={handleSmallExpensesScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              style={{ height: '500px' }}
            >
              {(['8_1', '8_2', '8_3', '8_4'] as const).map((n) => (
                <div key={n} className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={publicUrl(`/covers/T-bank 2/mobile/${n}.webp`)}
                    alt={locale === 'ru' ? `Организация мелких трат — ${n}` : `Managing small expenses — ${n}`}
                    style={{ height: '460px', width: 'auto', borderRadius: '24px', display: 'block', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                  />
                </div>
              ))}
            </div>
            <CarouselDots count={4} active={mobileSmallExpensesSlide} className="pt-[12px] pb-[16px]" />
          </div>
        </div>

        {/* Desktop image — hidden on mobile */}
        <div className="case-section-content hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/8.webp')}
            alt={locale === 'ru' ? 'Организация мелких трат' : 'Managing small expenses'}
            className="block w-full object-cover"
          />
        </div>
      </div>

      {/* 9 — Все виды регулирования оплаты */}
      <div className="flex flex-col gap-[8px] mt-[48px]">
        <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
          {locale === 'ru' ? 'Все виды регулирования оплаты' : 'All payment management types'}
        </h2>
        {/* Mobile: single unified carousel — hidden on md+ */}
        <div className="case-section-content md:hidden">
          <div
            className="w-full bg-[var(--color-surface-muted)] overflow-hidden flex flex-col"
            style={{ borderRadius: 'var(--radius-media)' }}
          >
            <div
              ref={payRegScrollRef}
              onScroll={handlePayRegScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              style={{ height: '500px' }}
            >
              {(['9', '9_1', '9_2', '9_3', '9_4', '9_5', '9_6', '9_7', '9_8', '9_9'] as const).map((n, i) => (
                <div key={`payReg-${i}`} className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={publicUrl(`/covers/T-bank 2/mobile/${n}.webp`)}
                    alt={locale === 'ru' ? `Регулирование оплаты — ${n}` : `Payment management — ${n}`}
                    style={{
                      height: '460px',
                      width: 'auto',
                      borderRadius: (n === '9_1' || n === '9_3' || n === '9_7' || n === '9_9') ? '20px' : '24px',
                      display: 'block',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                    }}
                  />
                </div>
              ))}
            </div>
            <CarouselDots count={10} active={payRegSlide} className="pt-[12px] pb-[8px]" />
            <p
              className="text-center font-medium"
              style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--color-text-tertiary)', minHeight: '20px' }}
            >
              {locale === 'ru'
                ? (['Траты / поровну', 'Траты / поровну', 'Получение / частями', 'Получение / частями', 'Получение / суммой', 'Получение / суммой', 'Перевод', 'Перевод', 'Получение / суммой', 'Получение / суммой'] as const)[payRegSlide]
                : (['Expenses / split equally', 'Expenses / split equally', 'Receiving / in parts', 'Receiving / in parts', 'Receiving / lump sum', 'Receiving / lump sum', 'Transfer', 'Transfer', 'Receiving / lump sum', 'Receiving / lump sum'] as const)[payRegSlide]
              }
            </p>
          </div>
        </div>

        {/* Desktop: unchanged — hidden on mobile */}
        <div className="case-section-content hidden md:flex flex-col gap-[24px]">
          {(['9', '9_1', '9_2', '9_3'] as const).map((n) => (
            <div key={n} className="w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
              <img
                loading="lazy"
                src={publicUrl(`/covers/T-bank 2/${n}.webp`)}
                alt={locale === 'ru' ? `Регулирование оплаты — ${n}` : `Payment management — ${n}`}
                className="block w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 10 — Получить перевод */}
      <div className="flex flex-col gap-[8px] mt-[48px]">
        <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
          {locale === 'ru' ? 'Получить перевод' : 'Receive a transfer'}
        </h2>
        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
          {locale === 'ru'
            ? typograph('Если пользователю должна прийти оплата от другого участника, он может задать расход на главной группы через «Получить перевод»')
            : typograph('If a user is expecting a payment from another participant, they can set the expense on the group home screen via "Receive a transfer"')}
        </p>

        {/* Mobile carousel — hidden on md+ */}
        <div className="case-section-content md:hidden">
          <div
            className="w-full bg-[var(--color-surface-muted)] overflow-hidden flex flex-col"
            style={{ borderRadius: 'var(--radius-media)' }}
          >
            <div
              ref={getTransferScrollRef}
              onScroll={handleGetTransferScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              style={{ height: '500px' }}
            >
              {(['9_10', '9_11', '9_12'] as const).map((n) => (
                <div key={n} className="snap-center flex-shrink-0 w-full h-full flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={publicUrl(`/covers/T-bank 2/mobile/${n}.webp`)}
                    alt={locale === 'ru' ? `Получить перевод — ${n}` : `Receive a transfer — ${n}`}
                    style={{ height: '460px', width: 'auto', borderRadius: '24px', display: 'block', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                  />
                </div>
              ))}
            </div>
            <CarouselDots count={3} active={getTransferSlide} className="pt-[12px] pb-[16px]" />
          </div>
        </div>

        {/* Desktop image — hidden on mobile */}
        <div className="case-section-content hidden md:block w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/9_13.webp')}
            alt={locale === 'ru' ? 'Получить перевод' : 'Receive a transfer'}
            className="block w-full object-cover"
          />
        </div>
      </div>

      {/* 11 — Отчеты и оплата */}
      <div className="flex flex-col gap-[8px] mt-[48px]">
        <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
          {locale === 'ru' ? 'Отчеты и оплата' : 'Reports and payment'}
        </h2>
        <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
          {locale === 'ru'
            ? typograph('Пользователям нужна финансовая картина расходов о поездке. Важно показывать не только долги, но и текущий статус поездки: бюджет, взносы, общие расходы, остатки')
            : typograph('Users need a financial overview of trip expenses. It is important to show not only debts, but also the current trip status: budget, contributions, total expenses, and remaining balances')}
        </p>

        {/* Single image — used on both mobile and desktop */}
        <div className="case-section-content w-full rounded-[var(--radius-media)] overflow-hidden bg-[var(--color-surface-muted)]">
          <img
            loading="lazy"
            src={publicUrl('/covers/T-bank 2/mobile/10.webp')}
            alt={locale === 'ru' ? 'Отчеты и оплата' : 'Reports and payment'}
            className="block w-full object-cover"
          />
        </div>
      </div>

      {/* ── Conclusions (Выводы) ─────────────────────────── */}
      <div
        className="flex flex-col gap-[24px]"
        style={{ marginTop: 88 }}
      >

        {/* ── Польза для бизнеса ──────────────────────────── */}
        <div id="section-testing" className="flex flex-col gap-[8px] scroll-mt-[72px] min-[1500px]:scroll-mt-[32px]">
          <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'Польза для бизнеса' : 'Business Value'}
          </h2>
          <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
            {locale === 'ru'
              ? typograph('На что бы я опиралась для оценки критериев успеха решения:')
              : typograph('What I would rely on to assess the success criteria of the solution:')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]" style={{ marginTop: 8 }}>
            {([
              {
                title: locale === 'ru' ? 'Количество оформлений бронирования через Т-Банк' : 'Number of bookings via T-Bank',
                body: locale === 'ru'
                  ? 'Рост доли партнерства и бронирований среди нескольких пользователей через предложения в Т-Банке'
                  : 'Growth in partner bookings among multiple users via T-Bank offers',
              },
              {
                title: locale === 'ru' ? 'Рост доли формирования групп внутри Т-Банка' : 'Group formation rate within T-Bank',
                body: locale === 'ru'
                  ? 'Смотрим на заинтересованность и поведение пользователей после введения решения и наблюдаем за процентом формирования групп'
                  : 'We observe user interest and behaviour after introducing the solution and track the group formation rate',
              },
              {
                title: locale === 'ru' ? 'Рост числа пользователей внутри Т-Банка' : 'Growth in T-Bank user base',
                body: locale === 'ru'
                  ? 'Анализируем рост людей, готовых перейти в Т-Банк ради упрощенной среды организации между пользователями'
                  : 'We analyse growth in users willing to switch to T-Bank for a simplified group coordination environment',
              },
              {
                title: locale === 'ru' ? 'Процент завершенных поездок' : 'Trip completion rate',
                body: locale === 'ru'
                  ? 'Оцениваем, какой средний процент завершенных поездок'
                  : 'We estimate the average percentage of completed trips',
              },
              {
                title: locale === 'ru' ? 'Средний чек' : 'Average receipt',
                body: locale === 'ru'
                  ? 'Сколько примерно уходит денег на разное количество пользователей'
                  : 'How much money is spent on average across different group sizes',
              },
              {
                title: locale === 'ru' ? 'Процент выбранных категорий' : 'Selected expense categories',
                body: locale === 'ru'
                  ? 'Какие категории трат выбирают пользователи в процессе формирования поездки'
                  : 'Which expense categories users select while planning a trip',
              },
            ] as { title: string; body: string }[]).map(({ title, body }, i) => (
              <div key={i} className="bg-[var(--color-surface-muted)] rounded-[24px] flex flex-col gap-[10px]" style={{ padding: 24 }}>
                <h3 className="font-sans text-[17px] font-semibold leading-[1.3] text-[var(--color-text-primary)]" style={{ margin: 0 }}>
                  {typograph(title)}
                </h3>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {typograph(body)}
                </p>
              </div>
            ))}
          </div>

          {/* ── Оцениваем динамику ──────────────────────────── */}
          <div className="bg-[var(--color-surface-muted)] rounded-[24px]" style={{ padding: 24, marginTop: 16 }}>
            <h3 className="font-sans text-[17px] font-semibold leading-[1.3] text-[var(--color-text-primary)]">
              {locale === 'ru'
                ? typograph('Оцениваем динамику и добавляем следующие разделы')
                : typograph('Assess dynamics and introduce next sections')}
            </h3>
            <div className="flex flex-col gap-[8px]" style={{ marginTop: 12 }}>
              <p className="text-[16px] font-medium leading-[1.55] text-[var(--color-text-secondary)] m-0">
                {locale === 'ru'
                  ? typograph('Если динамика ранее приведенных критериев будет показывать положительный рост, следующим шагом стало бы постепенное введение регулирования страхования, виз и интернета, чтобы:')
                  : typograph('If the dynamics of the above criteria show positive growth, the next step would be a gradual introduction of insurance, visa, and internet regulation, in order to:')}
              </p>
              <p className="text-[16px] font-medium leading-[1.55] text-[var(--color-text-secondary)] m-0">
                — {locale === 'ru'
                  ? typograph('снизить нагрузку на разработку в пользу приоритетных продуктовых решений на старте запуска')
                  : typograph('reduce the development load in favour of priority product decisions at launch')}
              </p>
              <p className="text-[16px] font-medium leading-[1.55] text-[var(--color-text-secondary)] m-0">
                — {locale === 'ru'
                  ? typograph('более глубинно изучить боли пользователей и на их основе грамотно разработать решения по каждому разделу: визы, страховки и интернета')
                  : typograph('conduct deeper research into user pain points and use those findings to thoughtfully develop solutions for each section: visas, insurance, and internet')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Тестирование и заключение ───────────────────── */}
        <div className="flex flex-col gap-[8px]" style={{ marginTop: 40 }}>
          <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'Тестирование и заключение' : 'Testing & Conclusion'}
          </h2>
          <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
            {locale === 'ru'
              ? typograph("Следующим шагом стало бы проведение A/B тестирования на интерактивном прототипе, чтобы понаблюдать за поведением пользователей внутри экосистемы super app'а групповых путешествий. Главными метриками в проведении тестирования я бы использовала:")
              : typograph("The next step would be A/B testing on an interactive prototype to observe user behaviour within the group travel super app ecosystem. The key metrics I would use in testing:")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]" style={{ marginTop: 8 }}>
            {([
              {
                title: 'Drop-off',
                body: locale === 'ru'
                  ? 'Наблюдаю, в каких местах у пользователей возникают проблемы и где flow требует доработки'
                  : 'I observe where users encounter problems and where the flow needs refinement',
              },
              {
                title: locale === 'ru' ? 'CSAT и скорость выполнения задач' : 'CSAT and task completion speed',
                body: locale === 'ru'
                  ? 'Степень удовлетворенности продуктовыми решениями и скорость на их выполнение'
                  : 'Degree of satisfaction with the product decisions and the speed of completing them',
              },
            ] as { title: string; body: string }[]).map(({ title, body }, i) => (
              <div key={i} className="bg-[var(--color-surface-muted)] rounded-[24px] flex flex-col gap-[10px]" style={{ padding: 24 }}>
                <h3 className="font-sans text-[17px] font-semibold leading-[1.3] text-[var(--color-text-primary)]" style={{ margin: 0 }}>
                  {typograph(title)}
                </h3>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  {typograph(body)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Сложность разработки ────────────────────────── */}
        <div className="flex flex-col gap-[8px]" style={{ marginTop: 40 }}>
          <h2 className="font-sans text-[24px] font-bold leading-[1.3] text-[var(--color-text-primary)]">
            {locale === 'ru' ? 'Итоговая сложность разработки' : 'Overall Development Complexity'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]" style={{ marginTop: 16 }}>

            {/* 01 — Суперапп групповых поездок */}
            <div className="bg-[var(--color-surface-muted)] rounded-[24px] flex flex-col gap-[12px]" style={{ padding: 24 }}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium" style={{ color: 'rgba(0,0,0,0.35)' }}>01</span>
                <span className="rounded-full text-[12px] font-semibold leading-none" style={{ padding: '5px 12px', backgroundColor: '#FFD6DA', color: '#B71C1C' }}>
                  L
                </span>
              </div>
              <h3 className="font-sans text-[17px] font-semibold leading-[1.3] text-[var(--color-text-primary)]" style={{ margin: 0 }}>
                {locale === 'ru' ? 'Суперапп групповых поездок' : 'Group Travel Super App'}
              </h3>
              <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                {typograph(locale === 'ru'
                  ? 'Главная выгода: развивает социальное взаимодействие и регулирование трат внутри приложения Т-Банка. Если такой сценарий заработает, он может хорошо связать имеющиеся travel-разделы и переводы, так как решение является новым продуктовым слоем внутри существующей экосистемы банка'
                  : "Main benefit: builds social interaction and expense management within the T-Bank app. If this scenario takes off, it can effectively connect existing travel sections and transfers as a new product layer within the bank's ecosystem")}
              </p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 12, marginTop: 'auto' }}>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {locale === 'ru' ? 'Дороговизна разработки:' : 'Development cost:'}
                  </span>{' '}
                  {typograph(locale === 'ru'
                    ? 'Высокая, так как это новая сущность внутри приложения, для которой существуют свои разделы, логика трат и бронирования, что затрагивает frontend и backend'
                    : 'High — this is a new entity inside the app with its own sections, expense and booking logic, touching both frontend and backend')}
                </p>
              </div>
            </div>

            {/* 02 — Роли и права пользователей */}
            <div className="bg-[var(--color-surface-muted)] rounded-[24px] flex flex-col gap-[12px]" style={{ padding: 24 }}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium" style={{ color: 'rgba(0,0,0,0.35)' }}>02</span>
                <span className="rounded-full text-[12px] font-semibold leading-none" style={{ padding: '5px 12px', backgroundColor: '#FFE7C2', color: '#BF3F08' }}>
                  M
                </span>
              </div>
              <h3 className="font-sans text-[17px] font-semibold leading-[1.3] text-[var(--color-text-primary)]" style={{ margin: 0 }}>
                {locale === 'ru' ? 'Роли и права пользователей' : 'User Roles & Permissions'}
              </h3>
              <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                {typograph(locale === 'ru'
                  ? 'На старте и по инсайтам с ТЗ не выглядит как standalone win, поэтому дорого развивать слишком сложную систему ролей на старте невыгодно'
                  : "At launch and per brief insights, this doesn't look like a standalone win — building an overly complex role system from the start isn't cost-effective")}
              </p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 12, marginTop: 'auto' }}>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {locale === 'ru' ? 'Дороговизна разработки:' : 'Development cost:'}
                  </span>{' '}
                  {typograph(locale === 'ru'
                    ? 'Усложняется backend-логика различия в правах участников'
                    : 'Backend logic for participant permission differentiation becomes more complex')}
                </p>
              </div>
            </div>

            {/* 03 — Деньги до / во время / после */}
            <div className="bg-[var(--color-surface-muted)] rounded-[24px] flex flex-col gap-[12px]" style={{ padding: 24 }}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium" style={{ color: 'rgba(0,0,0,0.35)' }}>03</span>
                <span className="rounded-full text-[12px] font-semibold leading-none" style={{ padding: '5px 12px', backgroundColor: '#FFD6DA', color: '#B71C1C' }}>
                  L
                </span>
              </div>
              <h3 className="font-sans text-[17px] font-semibold leading-[1.3] text-[var(--color-text-primary)]" style={{ margin: 0 }}>
                {locale === 'ru' ? 'Деньги до / во время / после' : 'Money Before / During / After'}
              </h3>
              <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                {typograph(locale === 'ru'
                  ? 'На старте и по инсайтам один из основных standalone win, но дорого развивать, нужна сильная поддержка регулирования отчета финансов'
                  : 'At launch and per insights this is one of the main standalone wins, but costly to develop — it needs strong support for finance reporting and regulation')}
              </p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 12, marginTop: 'auto' }}>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {locale === 'ru' ? 'Дороговизна разработки:' : 'Development cost:'}
                  </span>{' '}
                  {typograph(locale === 'ru'
                    ? 'Нужно сделать связку между поездкой, участниками и статусами платежей. Основная работа уйдёт в статусы, напоминания и возвраты, логику split, пересчёт балансов, работу с разными типами распределения и историей изменений. Это один из самых тяжёлых блоков не только по backend, но и по поддержке, потому что любая ошибка в расчётах будет восприниматься пользователями как критическая'
                    : 'Requires linking the trip, participants, and payment statuses. Main effort: statuses, reminders, refunds, split logic, balance recalculation, distribution types, and change history. One of the heaviest blocks — any calculation error will be perceived as critical by users')}
                </p>
              </div>
            </div>

            {/* 04 — Отчёт и статистика по поездке */}
            <div className="bg-[var(--color-surface-muted)] rounded-[24px] flex flex-col gap-[12px]" style={{ padding: 24 }}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium" style={{ color: 'rgba(0,0,0,0.35)' }}>04</span>
                <span className="rounded-full text-[12px] font-semibold leading-none" style={{ padding: '5px 12px', backgroundColor: '#FFE7C2', color: '#BF3F08' }}>
                  M
                </span>
              </div>
              <h3 className="font-sans text-[17px] font-semibold leading-[1.3] text-[var(--color-text-primary)]" style={{ margin: 0 }}>
                {locale === 'ru' ? 'Отчёт и статистика по поездке' : 'Trip Report & Statistics'}
              </h3>
              <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                {typograph(locale === 'ru'
                  ? 'Входная точка, потому что она закрепляет за банком ownership над сценарием поездки и группировкой между пользователями'
                  : "Entry point — it establishes the bank's ownership over the trip scenario and grouping between users")}
              </p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 12, marginTop: 'auto' }}>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {locale === 'ru' ? 'Дороговизна разработки:' : 'Development cost:'}
                  </span>{' '}
                  {typograph(locale === 'ru'
                    ? 'Нужен входной экран входа в сценарий, формы заполнения, приглашений пользователей'
                    : 'Requires an entry screen for the scenario, fill-in forms, and user invitation flows')}
                </p>
              </div>
            </div>

            {/* 05 — Инвайты пользователей */}
            <div className="bg-[var(--color-surface-muted)] rounded-[24px] flex flex-col gap-[12px]" style={{ padding: 24 }}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium" style={{ color: 'rgba(0,0,0,0.35)' }}>05</span>
                <span className="rounded-full text-[12px] font-semibold leading-none" style={{ padding: '5px 12px', backgroundColor: '#D4EBD5', color: '#2E7D32' }}>
                  S
                </span>
              </div>
              <h3 className="font-sans text-[17px] font-semibold leading-[1.3] text-[var(--color-text-primary)]" style={{ margin: 0 }}>
                {locale === 'ru' ? 'Инвайты пользователей' : 'User Invites'}
              </h3>
              <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                {typograph(locale === 'ru'
                  ? 'Важная часть закрытия потребности внутри приложения в начале старта сценария'
                  : 'A key part of addressing the in-app need at the start of the scenario')}
              </p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 12, marginTop: 'auto' }}>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {locale === 'ru' ? 'Дороговизна разработки:' : 'Development cost:'}
                  </span>{' '}
                  {typograph(locale === 'ru'
                    ? 'Каждая поездка естественным образом может приводить в сценарий новых людей. Если учитывать, что фокус идёт на клиентов Т-Банка, стоимость решения становится низкой'
                    : "Every trip can naturally onboard new people into the scenario. With T-Bank customers as the focus, the cost of this solution becomes low")}
                </p>
              </div>
            </div>

            {/* 06 — Чат группы внутри Т-Банка */}
            <div className="bg-[var(--color-surface-muted)] rounded-[24px] flex flex-col gap-[12px]" style={{ padding: 24 }}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium" style={{ color: 'rgba(0,0,0,0.35)' }}>06</span>
                <span className="rounded-full text-[12px] font-semibold leading-none" style={{ padding: '5px 12px', backgroundColor: '#FFD6DA', color: '#B71C1C' }}>
                  L
                </span>
              </div>
              <h3 className="font-sans text-[17px] font-semibold leading-[1.3] text-[var(--color-text-primary)]" style={{ margin: 0 }}>
                {locale === 'ru' ? 'Чат группы внутри Т-Банка' : 'Group Chat in T-Bank'}
              </h3>
              <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                {typograph(locale === 'ru'
                  ? 'Логичное решение с точки зрения координации пользователей, но может смещать направление решения в сторону полноценного мессенджера, что может быть сомнительно, так как основную коммуникацию пользователи ведут отдельно вне банка'
                  : "Logical from a user coordination standpoint, but risks shifting the solution toward a full messenger — questionable since users conduct primary communication outside the bank")}
              </p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 12, marginTop: 'auto' }}>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {locale === 'ru' ? 'Дороговизна разработки:' : 'Development cost:'}
                  </span>{' '}
                  {typograph(locale === 'ru'
                    ? 'Нагрузка очень высокая: сообщения, доставка, статусы чтения, уведомления'
                    : 'Load is very high: messages, delivery, read statuses, notifications')}
                </p>
              </div>
            </div>

            {/* 07 — Организация оплаты / добавление расходов */}
            <div className="bg-[var(--color-surface-muted)] rounded-[24px] flex flex-col gap-[12px] md:col-span-2" style={{ padding: 24 }}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium" style={{ color: 'rgba(0,0,0,0.35)' }}>07</span>
                <span className="rounded-full text-[12px] font-semibold leading-none" style={{ padding: '5px 12px', backgroundColor: '#FFD6DA', color: '#B71C1C' }}>
                  L
                </span>
              </div>
              <h3 className="font-sans text-[17px] font-semibold leading-[1.3] text-[var(--color-text-primary)]" style={{ margin: 0 }}>
                {locale === 'ru' ? 'Организация оплаты / добавление расходов' : 'Payment Organisation / Expense Tracking'}
              </h3>
              <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                {typograph(locale === 'ru'
                  ? 'Самый выгодный блок, потому что он напрямую усиливает банковский продукт в рамках ТЗ: платежи, переводы и удержание пользователей в рамках поездки'
                  : "The most valuable block — directly strengthens the bank's product within the brief: payments, transfers, and user retention within the trip")}
              </p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 12, marginTop: 'auto' }}>
                <p className="m-0 text-[16px] font-medium text-[var(--color-text-secondary)]">
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {locale === 'ru' ? 'Дороговизна разработки:' : 'Development cost:'}
                  </span>{' '}
                  {typograph(locale === 'ru'
                    ? 'Нагрузка высокая: добавляются новые формы заполнения и сохранения информации о платежных транзакциях, обработка и хранение данных о переводах, долгах и пополнениях. Без хорошей обработки данных есть риск ошибок и, как следствие, потери лояльности клиентов'
                    : 'Load is high: new forms for capturing and storing payment transaction info, processing and storing transfer, debt, and top-up data. Poor data handling risks errors and, consequently, customer loyalty loss')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
