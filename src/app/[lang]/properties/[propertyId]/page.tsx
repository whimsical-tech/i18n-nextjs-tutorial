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

function titleFor(p: PropertyRecord) {
  const map: Record<string, string> = {
    "shinjuku-park-1203": "新宿御苑スカイレジデンス 12階角部屋",
    "meguro-river-501": "目黒川テラスハウス 501号室",
    "yokohama-minato-902": "横浜みなとみらいタワー 9階",
    "kawasaki-station-305": "川崎駅前グランドレジデンス 305",
    "umeda-sky-2101": "梅田スカイコート 21階南向き",
    "namba-loft-808": "難波ロフトマンション 808号室",
    "shibuya-cross-402": "渋谷クロスゲート 4階メゾネット",
    "shinagawa-bay-1502": "品川ベイサイドタワー 15階",
    "sakai-garden-101": "堺ガーデンヒルズ 1階庭付き",
    "yokohama-hills-2205": "横浜ヒルズレジデンス",
    "ikebukuro-sunrise-0801": "池袋サンライズコート 8階南東向き",
    "nakanoshima-river-1201": "中之島リバーフロント 12階",
    "fujisawa-coast-0302": "藤沢コーストレジデンス 3階",
    "taito-skytree-0909": "台東スカイツリービュー 9階角住戸",
  };
  return map[p.id] ?? "掲載物件（タイトル準備中）";
}

function cityJp(key: PropertyRecord["cityKey"]) {
  if (key === "tokyo") return "東京都";
  if (key === "osaka") return "大阪府";
  return "神奈川県";
}

function NarrativeBlock({ property }: { property: PropertyRecord }) {
  const area = property.areaSqm;
  const rooms = property.rooms;
  const year = property.builtYear;

  return (
    <section className={styles.section} aria-labelledby="story-heading">
      <h2 id="story-heading">物件ストーリー（読み物）</h2>
      <p>
        このページは <strong>{titleFor(property)}</strong> のデモ紹介です。
        専有面積は <strong>{area}㎡</strong>、間取りは{" "}
        <strong>{rooms}LDK相当</strong>、 築年は <strong>{year}年</strong>{" "}
        としてサンプル登録しています。
      </p>
      <p>
        朝の採光や風の通り道は図面だけでは伝わりにくいため、内見時にはカーテンの開閉状態も含めて確認することをおすすめします（一般論）。
      </p>
      <p>
        ペット可否、楽器、事務所利用などの管理規約は管理会社の最新版をご確認ください。ここに書かれた内容はプレースホルダです。
      </p>
    </section>
  );
}

function SpecTable({ property }: { property: PropertyRecord }) {
  const kindLabel = property.listingKind === "sale" ? "売買" : "賃貸";
  const priceCell =
    property.listingKind === "sale" && property.salePriceYen
      ? `¥${formatYen(property.salePriceYen)}（税込想定・デモ）`
      : property.monthlyRentYen
        ? `月額 ¥${formatYen(property.monthlyRentYen)}（共益費別の例）`
        : "価格は担当までお問い合わせください";

  return (
    <section className={styles.section} aria-labelledby="spec-heading">
      <h2 id="spec-heading">主要スペック</h2>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th scope="row">取引区分</th>
            <td>{kindLabel}</td>
          </tr>
          <tr>
            <th scope="row">所在地（都道府県）</th>
            <td>{cityJp(property.cityKey)}（詳細住所はダミー）</td>
          </tr>
          <tr>
            <th scope="row">価格表示</th>
            <td>{priceCell}</td>
          </tr>
          <tr>
            <th scope="row">専有面積</th>
            <td>{property.areaSqm}㎡（壁芯／登記の別は未表記）</td>
          </tr>
          <tr>
            <th scope="row">間取り</th>
            <td>{property.rooms}LDK相当（家具は付きません）</td>
          </tr>
          <tr>
            <th scope="row">築年</th>
            <td>{property.builtYear}年（リノベ履歴は別紙想定）</td>
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
    return { title: `${t["propertyNotFound"]} | 晴レ不動産` };
  }
  return {
    title: `${titleFor(property)} | 晴レ不動産`,
    description: `${cityJp(property.cityKey)}${t["areaDescription"]}`,
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

  const priceMain =
    property.listingKind === "sale" && property.salePriceYen
      ? `¥${formatYen(property.salePriceYen)}`
      : property.monthlyRentYen
        ? `月額 ¥${formatYen(property.monthlyRentYen)}`
        : "価格はお問い合わせください";

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
          <h1>{titleFor(property)}</h1>
          <figure className={styles.figure}>
            <Image
              src={`/images/${propertyId}.webp`}
              alt={`${titleFor(property)}の外観写真（イメージ）`}
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
              {cityJp(property.cityKey)}
            </span>
            {property.isNew ? (
              <span className={styles.badgeNew} aria-label="新着物件">
                NEW
              </span>
            ) : null}
          </div>
          <div className={styles.priceRow}>
            <p className={styles.price}>{priceMain}</p>
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

        <NarrativeBlock property={property} />
        <SpecTable property={property} />

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
      <SiteFooter />
    </div>
  );
}
