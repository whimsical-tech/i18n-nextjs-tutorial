"use client";

import { useEffect, useState } from "react";
import { NEW_LISTING_COUNT } from "@/lib/properties";
import styles from "./LastVisitNotice.module.css";

const STORAGE_KEY = "hare-realestate-last-visit-at";

function formatVisitDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(d);
}

type VisitState =
  | { kind: "idle" }
  | { kind: "first" }
  | { kind: "return"; previousVisitLabel: string };

export function LastVisitNotice() {
  const [visit, setVisit] = useState<VisitState>({ kind: "idle" });

  useEffect(() => {
    const previous = localStorage.getItem(STORAGE_KEY);
    const nowIso = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, nowIso);

    if (previous) {
      setVisit({
        kind: "return",
        previousVisitLabel: formatVisitDate(previous),
      });
    } else {
      setVisit({ kind: "first" });
    }
  }, []);

  if (visit.kind === "idle") {
    return (
      <div className={`${styles.banner} ${styles.hidden}`} aria-hidden>
        &nbsp;
      </div>
    );
  }

  return (
    <aside className={styles.banner} role="status" aria-live="polite">
      {visit.kind === "return" ? (
        <p>
          前回のご訪問は <strong>{visit.previousVisitLabel}</strong>{" "}
          でした。その後、新着物件が{" "}
          <strong>{NEW_LISTING_COUNT} 件</strong>
          加わっています。一覧では <strong>NEW</strong>{" "}
          の付いた物件を先頭に並べています。
        </p>
      ) : (
        <p>
          現在、新着物件が <strong>{NEW_LISTING_COUNT} 件</strong>{" "}
          あります。次回以降は、前回アクセス日を基準に同じ内容をお知らせします。一覧では{" "}
          <strong>NEW</strong> の付いた物件を先頭に表示しています。
        </p>
      )}
      <span className={styles.muted}>
        ※日付はこのブラウザに保存した前回アクセス時刻です（デモ用のローカル表示）。
      </span>
    </aside>
  );
}
