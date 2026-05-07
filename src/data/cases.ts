import type { CaseStudy, SiteContent } from '../types';
import { publicUrl } from '../utils/publicUrl';

export const siteContent: SiteContent = {
  name: {
    ru: 'Колыш Варвара',
    en: 'Varvara Kolysh',
  },
  role: {
    ru: 'Продуктовый дизайнер',
    en: 'Product Designer',
  },
  tagline: {
    ru: 'Проектирую end-to-end продуктовые сценарии для финтеха и фудтеха',
    en: 'I design end-to-end product experiences for fintech and foodtech',
  },
  resumeLabel: {
    ru: 'Скачать pdf',
    en: 'Download pdf',
  },
  resumeSubtitle: {
    ru: 'Образование, опыт, навыки, достижения',
    en: 'Education, experience, skills, achievements',
  },
  resumeUrl: {
    ru: publicUrl('/Resume/%D0%9A%D0%BE%D0%BB%D1%8B%D1%88%20%D0%92%D0%B0%D1%80%D0%B2%D0%B0%D1%80%D0%B0%20%D0%A0%D0%B5%D0%B7%D1%8E%D0%BC%D0%B5_ru.pdf'),
    en: publicUrl('/Resume/Kolysh%20Varvara%20Resume_eng.pdf'),
  },
  contactLabel: {
    ru: 'Написать мне',
    en: 'Contact me',
  },
  contactUrl: 'https://t.me/username',
};

// Order: 1. Yandex Lavka, 2. T-Bank, 3. okolo (covers overlap stack)
export const cases: CaseStudy[] = [
  {
    id: 'yandex-lavka',
    tag: 'concept',
    title: {
      ru: 'Совместная корзина в «Яндекс Лавка»',
      en: 'Shared Cart in Yandex Lavka',
    },
    description: {
      ru: 'Очень частый сценарий, когда заказ делают несколько человек: семья, пара, друзья. Подумай, как мог бы выглядеть сценарий совместного заказа в Яндекс Лавке. Спроектируй такое решение!',
      en: 'A common scenario where multiple people place an order together: family, couple, friends. Designing a shared cart experience for Yandex Lavka grocery delivery.',
    },
    industry: 'Foodtech',
    year: '2026',
    platforms: { ru: 'iOS', en: 'iOS' },
    role: {
      ru: 'Полный цикл Discovery и проведение Custdev-интервью. Проектирование логики формирования совместных заказов',
      en: 'Full Discovery cycle and Custdev interviews. Designing shared order logic',
    },
    tools: { ru: 'Figma, Higgsfield, After Effects', en: 'Figma, Higgsfield, After Effects' },
    logo: publicUrl('/logos/YandexLavka.svg'),
    cover: publicUrl('/covers/YandexLavka.webp'),
    coverVideo: publicUrl('/covers/YandexLavka materials/YandexLavka video.mp4'),
    accentColor: '#00B4E6',
  },
  {
    id: 't-bank',
    tag: 'concept',
    title: {
      ru: 'Онлайн форма рассрочки для иностранцев в\u00A0Т-банк',
      en: 'Online Installment Form for Foreigners at T-Bank',
    },
    description: {
      ru: 'Проработка логики сценария раздела оформления онлайн-рассрочки на покупку в магазине для иностранного гражданина, проживающего на территории Российской Федерации',
      en: 'Designing the online installment application flow for foreign nationals residing in Russia',
    },
    industry: 'Fintech',
    year: '2025',
    platforms: { ru: 'Веб', en: 'Web' },
    role: {
      ru: 'Discovery и UX-адаптация формы рассрочки для иностранцев',
      en: 'Desk research on credit terms for foreigners and Custdev with Drop-off analysis',
    },
    tools: { ru: 'Figma', en: 'Figma' },
    logo: publicUrl('/logos/Tbank.svg'),
    cover: publicUrl('/covers/Tbank.webp'),
    accentColor: '#FFDD2D',
  },
  {
    id: 't-bank-travel',
    tag: 'concept',
    title: {
      ru: 'Групповые путешествия в Т-банк',
      en: 'Group Travel at T-Bank',
    },
    description: {
      ru: 'Спроектируйте функционал внутри приложения Т-Банка, который поможет пользователю организовать совместную поездку с другими людьми и оптимизировать фиксацию трат и сбор денег до, во время и после поездки',
      en: 'Design functionality within the T-Bank app that helps users organize group trips and optimize expense tracking and money collection before, during, and after the trip',
    },
    industry: 'Fintech',
    year: '2026',
    platforms: { ru: 'iOS', en: 'iOS' },
    role: {
      ru: 'Разработка Super App раздела групповых путешествий, полный анализ от Discovery до финальных макетов',
      en: 'Super App group travel section design, full analysis from Discovery to final mockups',
    },
    tools: { ru: 'Figma', en: 'Figma' },
    logo: publicUrl('/logos/Tbank.svg'),
    cover: publicUrl('/covers/Т-путешествия — создание новой поездки.webp'),
    accentColor: '#FFDD2D',
  },
  {
    id: 'okolo',
    tag: 'startup',
    title: {
      ru: 'okolo – сервис подбора маршрута локальных мест',
      en: 'okolo — local places route planner',
    },
    description: {
      ru: 'Веб-сервис, который не предлагает бесконечный список мест, а формирует ограниченное количество готовых маршрутов по городу с логикой передвижения.',
      en: 'A web service that does not offer an endless list of places, but instead creates a limited number of ready-made city routes with built-in movement logic.',
    },
    industry: 'Traveltech',
    year: 'coming soon',
    platforms: { ru: 'Веб, Мобильное приложение', en: 'Web, Mobile' },
    role: {
      ru: 'Полный цикл Discovery и проведение Custdev-интервью. Проектирование пользовательских сценариев и дизайн системы, участие в анализе бизнес-модели',
      en: 'Full-cycle Discovery and conducting Custdev interviews. Designing user scenarios and system design, participation in business model analysis',
    },
    tools: { ru: 'Figma', en: 'Figma' },
    logo: publicUrl('/logos/okolo.svg'),
    cover: publicUrl('/covers/okolo.webp'),
    accentColor: '#7CB9E8',
  },
];
