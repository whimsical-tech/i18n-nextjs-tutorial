import styles from "./CatalogHeroAside.module.css";

export function CatalogHeroAside() {
  return (
    <section
      className={styles.root}
      aria-labelledby="catalog-hero-title"
    >
      <div className={styles.inner}>
        <p className={styles.kicker}>Hare Real Estate / Tokyo-Osaka-Kanagawa</p>
        <h2 id="catalog-hero-title" className={styles.title}>
          晴れた日のように、住まい選びを軽やかに。
        </h2>
        <p className={styles.lead}>
          当サイトはNext.js App Routerの学習用デモです。掲載金額・写真・周辺環境は架空の例であり、
          実際の取引を保証するものではありません。最新情報は必ず現地確認をお願いいたします。
        </p>
        <div className={styles.pillRow}>
          <span className={styles.pill}>売買サポート</span>
          <span className={styles.pill}>賃貸仲介</span>
          <span className={styles.pill}>法人契約</span>
          <span className={styles.pill}>リノベ相談</span>
        </div>

        <div className={styles.strengths} aria-label="サービス概要メモ">
          <p className={styles.strengthsTitle}>晴レ不動産の強み</p>
          <ul className={styles.strengthsList}>
            <li>駅徒歩分数と実走時間の両方をメモ化してご案内します</li>
            <li>投資用・自住用のポートフォリオ整理もお任せください</li>
            <li>提携ローン窓口との同日相談が可能です（エリアにより異なります）</li>
            <li>外国籍のお客様向けに英語資料の同梱も対応可能です</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
