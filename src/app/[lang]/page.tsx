import { CatalogHeroAside } from "@/components/CatalogHeroAside";
import { LastVisitNotice } from "@/components/LastVisitNotice";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PropertyCatalog } from "@/components/PropertyCatalog";
import styles from "./page.module.css";
import { Locale } from "@/i18n-config";
import { getTranslation } from "@/locales";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getTranslation(lang);
  const t = dictionary.mainPage;

  return (
    <div className={styles.page}>
      <SiteHeader t={dictionary} lang={lang} active="home" />
      <main className={styles.main}>
        <header className={styles.sectionHead}>
          <div className={styles.sectionHeadTop}>
            <div className={styles.sectionPropertyLibrary}>
              <span className={styles.sectionKicker}>Property Library</span>
              <h1 className={styles.sectionTitle}>{t["listedProperties"]}</h1>
              <p className={styles.sectionNote}>{t["filterNotice"]}</p>
              <p className={styles.disclaimer}> {t["disclaimer"]}</p>

              <LastVisitNotice />
            </div>
            <div className={styles.sectionHeadHero}>
              <CatalogHeroAside {...dictionary["aside"]} />
            </div>
          </div>
        </header>

        <PropertyCatalog />
      </main>
      <SiteFooter t={dictionary} />
    </div>
  );
}
