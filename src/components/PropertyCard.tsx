import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PropertyRecord } from "@/lib/properties";
import styles from "./PropertyCard.module.css";
import { useTranslation } from "react-i18next";

function formatYen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

export function PropertyCard({ property }: { property: PropertyRecord }) {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;

  const priceText =
    property.listingKind === "sale" && property.salePriceYen
      ? `¥${formatYen(property.salePriceYen)}`
      : property.monthlyRentYen
        ? `${t("propertyId.monthly")} ¥${formatYen(property.monthlyRentYen)}`
        : t("propertyId.priceOnContact");

  const title = t(`propertyTitle.${property.id}`);

  return (
    <article className={styles.card}>
      <Link
        href={`/${currentLocale}/properties/${property.id}`}
        className={styles.cardLink}
        aria-label={`${title} ${t("viewDetails")}`}
      >
        <div className={styles.thumbContainer}>
          <Image
            src={`/images/${property.id}.webp`}
            priority={true}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.thumbImage}
          />

          <div className={styles.thumbBadges}>
            <span className={styles.pill}>
              {" "}
              {property.listingKind === "sale"
                ? t("propertyId.saleProperties")
                : t("propertyId.rentalProperties")}
            </span>
            {property.isNew && (
              <span className={styles.newBadge} aria-label={t("newListings")}>
                NEW
              </span>
            )}
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.id}>ID: {property.id}</span>
          </div>
          <div className={styles.meta}>
            <span>{t(`propertyId.${property.cityKey}`)}</span>
            <span>
              {`${t("propertyId.floorPlan")}: ${property.rooms}
              ${t("propertyId.LDK")}`}
            </span>
            <span>{`${t("propertyId.livingArea")} ${property.areaSqm} ㎡`}</span>
            <span>
              {`${t("propertyId.constructionYear")}
              ${property.builtYear}
              ${t("propertyId.year")} `}
            </span>
          </div>
          <p className={styles.price}>{priceText}</p>
        </div>
      </Link>
    </article>
  );
}
