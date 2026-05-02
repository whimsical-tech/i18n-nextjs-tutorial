import { LastVisitNotice } from "@/components/LastVisitNotice";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PropertyCatalog } from "@/components/PropertyCatalog";
import styles from "./page.module.css";

function HeroAside() {
  return (
    <aside className={styles.sideCard} aria-label="サービス概要メモ">
      <p className={styles.sideTitle}>晴レ不動産の強み</p>
      <ul className={styles.sideList}>
        <li>駅徒歩分数と実走時間の両方をメモ化してご案内します</li>
        <li>投資用・自住用のポートフォリオ整理もお任せください</li>
        <li>提携ローン窓口との同日相談が可能です（エリアにより異なります）</li>
        <li>外国籍のお客様向けに英語資料の同梱も対応可能です</li>
      </ul>
    </aside>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <SiteHeader active="home" />
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="home-hero-title">
          <div>
            <p className={styles.sectionKicker}>Hare Real Estate / Tokyo-Osaka-Kanagawa</p>
            <h1 id="home-hero-title" className={styles.heroTitle}>
              晴れた日のように、住まい選びを軽やかに。
            </h1>
            <p className={styles.heroLead}>
              当サイトはNext.js App Routerの学習用デモです。掲載金額・写真・周辺環境は架空の例であり、
              実際の取引を保証するものではありません。最新情報は必ず現地確認をお願いいたします。
            </p>
            <div className={styles.pillRow}>
              <span className={styles.pill}>売買サポート</span>
              <span className={styles.pill}>賃貸仲介</span>
              <span className={styles.pill}>法人契約</span>
              <span className={styles.pill}>リノベ相談</span>
            </div>
          </div>
          <HeroAside />
        </section>

        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>Property Library</span>
          <h2 className={styles.sectionTitle}>掲載物件ライブラリ</h2>
          <p className={styles.sectionNote}>
            下のパネルでは、取引区分・都市・部屋数の3軸で件数がリアルタイムに変わります。
            数字はすべてクライアント側のフィルター結果です。
          </p>
          <p className={styles.disclaimer}>
            図面・専有面積・築年数は登記簿謄本と重要事項説明書をご確認ください（デモ文言）。
          </p>
        </header>

        <LastVisitNotice />

        <PropertyCatalog />
      </main>
      <SiteFooter />
    </div>
  );
}
