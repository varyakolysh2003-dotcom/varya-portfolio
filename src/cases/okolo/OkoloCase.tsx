import type { Dispatch, SetStateAction } from 'react';
import type { Locale } from '../../types';
import { typograph } from '../../utils/typograph';

type PersonaId = 'families' | 'friends' | 'colleagues' | 'couples' | 'students' | 'rvp' | 'vnzh';

type OkoloCaseProps = {
  locale: Locale;
  activePersona: PersonaId;
  setActivePersona: Dispatch<SetStateAction<PersonaId>>;
};

const okoloBenchmarkingLogos: string[] = [
  '/covers/okolo/1.png',
  '/covers/okolo/2.png',
  '/covers/okolo/3.png',
  '/covers/okolo/4.webp',
];

export default function OkoloCase({ locale, activePersona, setActivePersona }: OkoloCaseProps) {
  return (
    <>
      {/* Бенчмаркинг — Okolo */}
      <div className="flex flex-col gap-[16px] md:gap-[24px]" style={{ marginTop: 88, scrollMarginTop: 32 }}>
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

      {/* Custdev и анализ персон — Okolo */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]">
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
    </>
  );
}
