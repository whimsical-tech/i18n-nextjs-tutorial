"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Locale } from "@/i18n-config";
import { useTranslation } from "react-i18next";

const locales: Record<Locale, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇬🇧" },
  ja: { name: "日本語", flag: "🇯🇵" },
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();
  const [isPending, startTransition] = useTransition();

  const currentLocale = i18n.language;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale;

    startTransition(async () => {
      await i18n.changeLanguage(newLocale);

      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPath);
    });
  };

  return (
    <div
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
    >
      <select
        id="language-select"
        value={currentLocale}
        onChange={handleChange}
        disabled={isPending}
      >
        {Object.entries(locales).map(([code, { name, flag }]) => (
          <option key={code} value={code}>
            {flag} {name}
          </option>
        ))}
      </select>
      <span
        style={{
          display: "inline-block",
          width: "16px",
          height: "16px",
          visibility: isPending ? "visible" : "hidden",
        }}
        aria-hidden={!isPending}
      >
        {isPending && <div className="spinner" />}
      </span>
    </div>
  );
}
