"use client";

import { useEffect, useState } from "react";
import { NEW_LISTING_COUNT } from "@/lib/properties";
import styles from "./LastVisitNotice.module.css";

import { Trans, useTranslation } from "react-i18next";

type VisitState = "loading" | "visited";

export function LastVisitNotice() {
  const [visit, setVisit] = useState<VisitState>("loading");

  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  function formatVisitDate(locale: string) {
    const d = new Date();
    if (Number.isNaN(d.getTime())) return t("unknownDate");
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    }).format(d);
  }

  useEffect(() => {
    setVisit("visited");
  }, []);

  return (
    <aside className={styles.banner} role="status" aria-live="polite">
      {visit !== "loading" ? (
        <div className={styles.skeleton}>
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonMuted} />
        </div>
      ) : (
        <div className={styles.content}>
          <Trans
            i18nKey="lastVisit.mainText"
            values={{
              date: formatVisitDate(locale),
              count: NEW_LISTING_COUNT,
            }}
          >
            <strong>date</strong>
            <strong>count</strong>
            <strong>NEW</strong>
          </Trans>

          <span className={styles.muted}>{t("lastVisit.dateWarning")}</span>
        </div>
      )}
    </aside>
  );
}
