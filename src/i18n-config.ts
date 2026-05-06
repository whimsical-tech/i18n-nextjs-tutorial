export const i18n = {
  defaultLocale: "ja",
  locales: ["en", "ja"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const hasLocale = (locale: Locale) => locale in i18n.locales;
