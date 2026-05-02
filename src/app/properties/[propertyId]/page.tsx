import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { PropertyRecord } from "@/lib/properties";
import { PROPERTIES, getPropertyById } from "@/lib/properties";
import styles from "./propertyDetail.module.css";

type PageProps = {
  params: Promise<{ propertyId: string }>;
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
  const { propertyId } = await params;
  const property = getPropertyById(propertyId);
  if (!property) {
    return { title: "物件が見つかりません | 晴レ不動産" };
  }
  return {
    title: `${titleFor(property)} | 晴レ不動産`,
    description: `${cityJp(property.cityKey)}エリアの掲載物件ページ（学習用デモ）。`,
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { propertyId } = await params;
  const property = getPropertyById(propertyId);
  if (!property) {
    notFound();
  }

  const priceMain =
    property.listingKind === "sale" && property.salePriceYen
      ? `¥${formatYen(property.salePriceYen)}`
      : property.monthlyRentYen
        ? `月額 ¥${formatYen(property.monthlyRentYen)}`
        : "価格はお問い合わせください";

  return (
    <div className={styles.page}>
      <SiteHeader active="home" />
      <main className={styles.main}>
        <p className={styles.breadcrumb}>
          <Link href="/">ホーム</Link>
          {" ／ "}
          <span>物件詳細</span>
        </p>

        <header className={styles.hero}>
          <h1>{titleFor(property)}</h1>
          <figure>
            <Image
              src={`/images/${property.id}.jpg`}
              alt={`${titleFor(property)}の外観写真（イメージ）`}
              width={600}
              height={400}
            />
            <figcaption>
              <a
                href={property.photoCreditUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Photo by {property.photoCredit} (Unsplash)
              </a>
            </figcaption>
          </figure>

          <div className={styles.badges}>
            <span className={styles.badge}>
              {property.listingKind === "sale" ? "売買物件" : "賃貸物件"}
            </span>
            <span className={styles.badgeMuted}>物件コード：{property.id}</span>
            <span className={styles.badgeMuted}>
              エリア：{cityJp(property.cityKey)}
            </span>
            {property.isNew ? (
              <span className={styles.badgeNew} aria-label="新着物件">
                NEW
              </span>
            ) : null}
          </div>
          <div className={styles.priceRow}>
            <p className={styles.price}>{priceMain}</p>
            <p className={styles.priceNote}>
              表示価格はサンプルです。消費税・共益費・駐車場などは別途要確認です。
            </p>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="catch-heading">
          <h2 id="catch-heading">キャッチコピー（架空）</h2>
          <p>
            駅前の喧騒から一歩入ると静けさが広がる、そんなコントラストを楽しめる住環境を目指したプランニングです（デモ文）。
          </p>
          <ul className={styles.list}>
            <li>
              収納計画：可動棚を基本に、季節家電も床に置かずに済む動線を意識
            </li>
            <li>
              キッチン：対面型を想定し、家族の顔が見える配置を提案しています
            </li>
            <li>浴室：換気乾燥機付きの最新仕様を想定したダミー文言です</li>
          </ul>
        </section>

        <NarrativeBlock property={property} />
        <SpecTable property={property} />

        <section className={styles.section} aria-labelledby="location-heading">
          <h2 id="location-heading">周辺環境メモ（プレースホルダ）</h2>
          <p>
            コンビニまで徒歩分数、スーパーまで徒歩分数、公園まで徒歩分数…のような定型的な文章をここに置きます。
            実務では地図ソフトの測定値と現地確認結果を突合してください。
          </p>
          <p>
            学区表記は入れていません。必要な場合は教育委員会の公開情報を参照し、注意書きを添えてください。
          </p>
        </section>

        <section className={styles.section} aria-labelledby="legal-heading">
          <h2 id="legal-heading">注意事項（共通）</h2>
          <p>
            掲載写真はイメージです。家具・調度品は販売価格に含まれません。賃貸の場合は原状回復費用の目安も別紙でご確認ください。
          </p>
          <p>
            近隣の建替え・再開発計画がある場合は、買主様・借主様ご自身でもヒアリングをお願いします（テンプレ文言）。
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
