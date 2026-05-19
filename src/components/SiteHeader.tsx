import Link from "next/link";
import styles from "./SiteHeader.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { getTranslation } from "@/locales";
import { Locale } from "@/i18n-config";

type NavKey = "home" | "about";

export async function SiteHeader({
  active,
  lang,
  t,
}: {
  active: NavKey;
  lang: Locale;
  t: Awaited<ReturnType<typeof getTranslation>>;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={`/${lang}/`} className={styles.brand}>
          <span className={styles.brandName}>{t["companyName"]}</span>
          <span className={styles.tagline}>{t["slogan"]}</span>
        </Link>
        <nav className={styles.nav} aria-label={t["siteHeader"].mainNavigation}>
          <Link
            href={`/${lang}/`}
            className={`${styles.navLink} ${
              active === "home" ? styles.navLinkActive : ""
            }`}
          >
            {t["siteHeader"].home}
          </Link>
          <Link
            href={`/${lang}/about`}
            className={`${styles.navLink} ${
              active === "about" ? styles.navLinkActive : ""
            }`}
          >
            {t["siteHeader"].about}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
