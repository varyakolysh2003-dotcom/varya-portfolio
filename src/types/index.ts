export type Locale = 'ru' | 'en';

export type CaseTag = 'concept' | 'startup' | 'production';

export interface CaseStudy {
  id: string;
  tag: CaseTag;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  industry: string;
  year: string;
  platforms: Record<Locale, string>;
  role: Record<Locale, string>;
  tools: Record<Locale, string>;
  logo: string;
  cover: string;
  coverVideo?: string;
  accentColor: string;
}

export interface SiteContent {
  name: Record<Locale, string>;
  role: Record<Locale, string>;
  tagline: Record<Locale, string>;
  resumeLabel: Record<Locale, string>;
  resumeSubtitle: Record<Locale, string>;
  resumeUrl: string;
  contactLabel: Record<Locale, string>;
  contactUrl: string;
}

export const TAG_LABELS: Record<CaseTag, Record<Locale, string>> = {
  concept: { ru: 'Концепт', en: 'Concept' },
  startup: { ru: 'Стартап', en: 'Startup' },
  production: { ru: 'Продакшн', en: 'Production' },
};
