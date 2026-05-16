import styles from "./SiteFooter.module.css";
import { getTranslation } from "@/locales";
import { Locale } from "@/i18n-config";

export async function SiteFooter({
  t,
}: {
  t: Awaited<ReturnType<typeof getTranslation>>;
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.columnTitle}>Office</p>
          <ul className={styles.list}>
            <li>{t["office"].mainAddress}</li>
            <li>{t["office"].businessHours}</li>
            <li>{t["office"].closedOn}</li>
            <li>{t["office"].telNumber}</li>
          </ul>
          <p className={styles.note}>{t["scheduleViewing"]}</p>
        </div>
        <div>
          <p className={styles.columnTitle}>Compliance</p>
          <ul className={styles.list}>
            <li></li>
            <li>{t["complianceBroker"]}</li>
            <li>{t["complianceGuarantee"]}</li>
            <li>{t["complianceHandling"]}</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        © {new Date().getFullYear()}{" "}
        このプロジェクトは、付随するブログ投稿のために{" "}
        <a
          href="https://whimsical-tech.github.io/en"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.credit}
        >
          ☀️ Whimsical Tech
        </a>{" "}
        によって構築されました。
      </div>
    </footer>
  );
}
