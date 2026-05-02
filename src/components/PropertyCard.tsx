import type { ReactNode } from "react";
import Link from "next/link";
import type { PropertyRecord } from "@/lib/properties";
import styles from "./PropertyCard.module.css";

function formatYen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

type Copy = {
  cityLabel: string;
  roomsLabel: string;
  areaLabel: string;
  yearLabel: string;
  detailCta: string;
  thumbCaption: string;
};

export function PropertyCard({
  property,
  title,
  copy,
}: {
  property: PropertyRecord;
  title: ReactNode;
  copy: Copy;
}) {
  const priceText =
    property.listingKind === "sale" && property.salePriceYen
      ? `¥${formatYen(property.salePriceYen)}`
      : property.monthlyRentYen
        ? `月額 ¥${formatYen(property.monthlyRentYen)}`
        : "価格はお問い合わせください";

  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        <div className={styles.thumbBadges}>
          <span className={styles.pill}>{copy.thumbCaption}</span>
          {property.isNew ? (
            <span className={styles.newBadge} aria-label="新着物件">
              NEW
            </span>
          ) : null}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.id}>ID: {property.id}</span>
        </div>
        <div className={styles.meta}>
          <span>{copy.cityLabel}</span>
          <span>{copy.roomsLabel}</span>
          <span>{copy.areaLabel}</span>
          <span>{copy.yearLabel}</span>
        </div>
        <p className={styles.price}>{priceText}</p>
        <Link className={styles.link} href={`/properties/${property.id}`}>
          {copy.detailCta}
        </Link>
      </div>
    </article>
  );
}
