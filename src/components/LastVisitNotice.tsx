"use client";

import { useEffect, useState } from "react";
import { NEW_LISTING_COUNT } from "@/lib/properties";
import styles from "./LastVisitNotice.module.css";

function formatVisitDate() {
  const d = new Date();
  if (Number.isNaN(d.getTime())) return "不明な日時";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(d);
}

type VisitState = "loading" | "visited";

export function LastVisitNotice() {
  const [visit, setVisit] = useState<VisitState>("loading");

  useEffect(() => {
    setVisit("visited");
  }, []);

  return (
    <aside className={styles.banner} role="status" aria-live="polite">
      {visit === "loading" ? (
        <div className={styles.skeleton}>
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonMuted} />
        </div>
      ) : (
        <div className={styles.content}>
          <p>
            前回のご訪問は <strong>{formatVisitDate()}</strong>{" "}
            でした。その後、新着物件が <strong>{NEW_LISTING_COUNT} 件</strong>
            加わっています。一覧では <strong>NEW</strong>{" "}
            の付いた物件を先頭に並べています。
          </p>

          <span className={styles.muted}>
            ※日付はこのブラウザに保存した前回アクセス時刻です（デモ用のローカル表示）。
          </span>
        </div>
      )}
    </aside>
  );
}
