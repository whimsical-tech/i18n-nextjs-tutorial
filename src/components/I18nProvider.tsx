"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import en from "../../locales/en.json";
import ja from "../../locales/ja.json";

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources: {
      en: { locale: en },
      ja: { locale: ja },
    },
    fallbackLng: "ja",
    ns: ["locale"],
    defaultNS: "locale",
    interpolation: {
      escapeValue: false,
    },
  });
}

export function I18nProvider({
  children,
  lang,
}: {
  children: ReactNode;
  lang: string;
}) {
  useEffect(() => {
    if (!i18next.isInitialized || i18next.language !== lang) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
