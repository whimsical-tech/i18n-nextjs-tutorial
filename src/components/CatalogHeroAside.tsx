import styles from "./CatalogHeroAside.module.css";

export function CatalogHeroAside(t: Record<string, string>) {
  return (
    <section className={styles.root} aria-labelledby="catalog-hero-title">
      <div className={styles.inner}>
        <p className={styles.kicker}>Hare Real Estate / Tokyo-Osaka-Kanagawa</p>
        <h2 id="catalog-hero-title" className={styles.title}>
          {t["intro"]}
        </h2>
        <p className={styles.lead}>{t["explanation"]}</p>
        <div className={styles.pillRow}>
          <span className={styles.pill}>{t["service1"]}</span>
          <span className={styles.pill}>{t["service2"]}</span>
          <span className={styles.pill}>{t["service3"]}</span>
          <span className={styles.pill}>{t["service4"]}</span>
        </div>

        <div className={styles.strengths}>
          <p className={styles.strengthsTitle}>{t["strenghts"]}</p>
          <ul className={styles.strengthsList}>
            <li>{t["distanceInfo"]}</li>
            <li>{t["portfolioSupport"]}</li>
            <li>{t["sameDayConsultations"]}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
