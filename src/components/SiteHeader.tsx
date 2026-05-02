import Link from "next/link";
import styles from "./SiteHeader.module.css";

type NavKey = "home" | "about";

export function SiteHeader({ active }: { active: NavKey }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandName}>晴レ不動産</span>
          <span className={styles.tagline}>
            日本各地の売買・賃貸をワンストップでサポートします
          </span>
        </Link>
        <nav className={styles.nav} aria-label="主要ナビゲーション">
          <Link
            href="/"
            className={`${styles.navLink} ${
              active === "home" ? styles.navLinkActive : ""
            }`}
          >
            ホーム
          </Link>
          <Link
            href="/about"
            className={`${styles.navLink} ${
              active === "about" ? styles.navLinkActive : ""
            }`}
          >
            会社概要
          </Link>
        </nav>
      </div>
    </header>
  );
}
