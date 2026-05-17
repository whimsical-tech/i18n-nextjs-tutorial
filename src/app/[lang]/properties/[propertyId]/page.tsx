import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { PropertyRecord } from "@/lib/properties";
import { PROPERTIES, getPropertyById } from "@/lib/properties";
import styles from "./propertyDetail.module.css";
import { Locale } from "@/i18n-config";
import { getTranslation } from "@/locales";

type PageProps = {
  params: Promise<{ propertyId: string; lang: Locale }>;
};

function formatYen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

export const getDictValue = (obj: any, key: string, fallback = "") => {
  return obj[key as keyof typeof obj] ?? fallback;
};

function SpecTable({
  property,
  t,
}: {
  property: PropertyRecord;
  t: { [key: string]: string };
}) {
  const kindLabel =
    property.listingKind === "sale"
      ? t["saleProperties"]
      : t["rentalProperties"];
  const priceCell =
    property.listingKind === "sale" && property.salePriceYen
      ? `¥${formatYen(property.salePriceYen)} ${t["includingTax"]}`
      : property.monthlyRentYen
        ? `${t["monthly"]} ¥${formatYen(property.monthlyRentYen)} ${t["excludingFees"]}`
        : t["priceOnContact"];

  return (
    <section className={styles.section} aria-labelledby="spec-heading">
      <h2 id="spec-heading">{t["specifications"]}</h2>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th scope="row">{t["type"]}</th>
            <td>{kindLabel}</td>
          </tr>
          <tr>
            <th scope="row">{t["location"]}</th>
            <td>{t[property.cityKey]}</td>
          </tr>
          <tr>
            <th scope="row">{t["price"]}</th>
            <td>{priceCell}</td>
          </tr>
          <tr>
            <th scope="row">{t["livingArea"]}</th>
            <td>{property.areaSqm}㎡</td>
          </tr>
          <tr>
            <th scope="row">{t["floorPlan"]}</th>
            <td>
              {property.rooms}
              {t["LDK"]}
            </td>
          </tr>
          <tr>
            <th scope="row">{t["constructionYear"]}</th>
            <td>
              {property.builtYear}
              {t["renovationNotice"]}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export async function generateStaticParams() {
  return PROPERTIES.map((p) => ({ propertyId: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { propertyId, lang } = await params;

  const dictionary = await getTranslation(lang);
  const t = dictionary.propertyId;

  const property = getPropertyById(propertyId);
  if (!property) {
    return { title: `${t["propertyNotFound"]} | ${dictionary.companyName}` };
  }

  const dict = dictionary as NonNullable<typeof dictionary>;

  return {
    title: `${getDictValue(dict.propertyTitle, propertyId)} | ${dictionary.companyName}`,
    description: `${getDictValue(dict, property.cityKey)}${t["areaDescription"]}`,
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { propertyId, lang } = await params;
  const property = getPropertyById(propertyId);
  if (!property) {
    notFound();
  }

  const dictionary = await getTranslation(lang);
  const t = dictionary.propertyId;

  const dict = dictionary as NonNullable<typeof dictionary>;
  const title = getDictValue(dict.propertyTitle, propertyId);
  const area = dictionary["propertyId"][property.cityKey];

  const priceText =
    property.listingKind === "sale" && property.salePriceYen
      ? `¥${formatYen(property.salePriceYen)}`
      : property.monthlyRentYen
        ? `${t["monthly"]} ¥${formatYen(property.monthlyRentYen)}`
        : t["priceOnContact"];

  return (
    <div className={styles.page}>
      <SiteHeader active="home" params={params} />
      <main className={styles.main}>
        <p className={styles.breadcrumb}>
          <Link href={`/${lang}`}>{dictionary["breadcrumb"].home}</Link>
          {" ／ "}
          <span>{dictionary["breadcrumb"].propertyDetails}</span>
        </p>

        <header className={styles.hero}>
          <h1>{title}</h1>
          <figure className={styles.figure}>
            <Image
              src={`/images/${propertyId}.webp`}
              alt={`${title}の外観写真（イメージ）`}
              width={600}
              height={400}
              loading="eager"
            />
            <figcaption className={styles.figcaption}>
              <a
                href={property.photoCreditUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dictionary["photoCredit"]} {property.photoCredit} (Unsplash)
              </a>
            </figcaption>
          </figure>

          <div className={styles.badges}>
            <span className={styles.badge}>
              {property.listingKind === "sale"
                ? t["saleProperties"]
                : t["rentalProperties"]}
            </span>
            <span className={styles.badgeMuted}>
              {t["propertyCode"]}
              {property.id}
            </span>
            <span className={styles.badgeMuted}>
              {t["area"]}
              {area}
            </span>
            {property.isNew ? (
              <span className={styles.badgeNew} aria-label="新着物件">
                NEW
              </span>
            ) : null}
          </div>
          <div className={styles.priceRow}>
            <p className={styles.price}>{priceText}</p>
            <p className={styles.priceNote}>{t["priceNotice"]}</p>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="catch-heading">
          <h2 id="catch-heading">{t["catchphrase"]}</h2>
          <p>{t["demoText"]}</p>
          <ul className={styles.list}>
            <li>{t["storagePlan"]}</li>
            <li>{t["kitchen"]}</li>
            <li>{t["bathroom"]}</li>
          </ul>
        </section>

        <SpecTable property={property} t={t} />

        <section className={styles.section} aria-labelledby="location-heading">
          <h2 id="location-heading">{t["surroundings"]}</h2>
          <p>{t["conveniences"]}</p>
          <p>{t["schoolInfo"]}</p>
        </section>

        <section className={styles.section} aria-labelledby="legal-heading">
          <h2 id="legal-heading">{t["precautions"]}</h2>
          <p>{t["photoNotice"]}</p>
          <p>{t["redevelopment"]}</p>
        </section>
      </main>
      <SiteFooter t={dictionary} />
    </div>
  );
}
