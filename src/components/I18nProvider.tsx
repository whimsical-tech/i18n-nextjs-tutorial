"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

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
