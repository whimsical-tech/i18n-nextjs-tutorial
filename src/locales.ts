import type { Locale } from "./i18n-config";

const locales = {
  en: () => import("../locales/en.json").then((module) => module.default),
  ja: () => import("../locales/ja.json").then((module) => module.default),
};

export const getTranslation = async (locale: Locale) =>
  locales[locale]?.() ?? locales.ja();
