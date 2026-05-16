import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.columnTitle}>Office</p>
          <ul className={styles.list}>
            <li>本社：東京都港区芝公園4-2-8</li>
            <li>営業時間：平日 9:30〜18:30</li>
            <li>定休日：土曜・日曜・祝日</li>
            <li>代表電話：03-0000-0000（ダイヤル例）</li>
          </ul>
          <p className={styles.note}>
            資料請求や内見のご予約は、各物件ページのボタンからお申し込みください（デモ表示）。
          </p>
        </div>
        <div>
          <p className={styles.columnTitle}>Compliance</p>
          <ul className={styles.list}>
            <li>宅地建物取引業者：東京都知事（1）第000000号</li>
            <li>所属団体：（公社）首都圏不動産公正取引協議会</li>
            <li>保証協会：全国宅地建物取引業保証協会</li>
            <li>苦情処理：お客様相談室までご連絡ください</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        © {new Date().getFullYear()}{" "}
        このプロジェクトは、付随するブログ投稿のために{" "}
        <a
          href="https://whimsical-tech.vercel.app/"
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
