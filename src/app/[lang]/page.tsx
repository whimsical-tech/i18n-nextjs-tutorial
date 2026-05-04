import { CatalogHeroAside } from "@/components/CatalogHeroAside";
import { LastVisitNotice } from "@/components/LastVisitNotice";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PropertyCatalog } from "@/components/PropertyCatalog";
import styles from "./page.module.css";
import { Locale } from "@/i18n-config";

export default function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  return (
    <div className={styles.page}>
      <SiteHeader params={params} active="home" />
      <main className={styles.main}>
        <header className={styles.sectionHead}>
          <div className={styles.sectionHeadTop}>
            <div className={styles.sectionPropertyLibrary}>
              <span className={styles.sectionKicker}>Property Library</span>
              <h1 className={styles.sectionTitle}>掲載物件ライブラリ</h1>
              <p className={styles.sectionNote}>
                下のパネルでは、取引区分・都市・部屋数の3軸で件数がリアルタイムに変わります。
                数字はすべてクライアント側のフィルター結果です。
              </p>
              <p className={styles.disclaimer}>
                図面・専有面積・築年数は登記簿謄本と重要事項説明書をご確認ください（デモ文言）。
              </p>

              <LastVisitNotice />
            </div>
            <div className={styles.sectionHeadHero}>
              <CatalogHeroAside />
            </div>
          </div>
        </header>

        <PropertyCatalog />
      </main>
      <SiteFooter />
    </div>
  );
}
