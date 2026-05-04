"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Locale } from "@/i18n-config";

const locales: Record<Locale, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇬🇧" },
  ja: { name: "日本語", flag: "🇯🇵" },
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentLocale: Locale = pathname.startsWith("/ja") ? "ja" : "en";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale;

    startTransition(() => {
      const segments = pathname.split("/").filter(Boolean);

      if (currentLocale === newLocale) return;
      if (segments[0] === currentLocale) segments[0] = newLocale;

      const newPath = `${segments.join("/")}`;

      router.replace(newPath);
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
      {isPending && <span>Switching...</span>}
    </div>
  );
}
