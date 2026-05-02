"use client";

import { useMemo, useState } from "react";
import type { CityKey, ListingKind, PropertyRecord } from "@/lib/properties";
import { PROPERTIES, sortPropertiesForDisplay } from "@/lib/properties";
import { PropertyCard } from "./PropertyCard";
import styles from "./PropertyCatalog.module.css";

type ListingFilter = "all" | ListingKind;
type CityFilter = "all" | CityKey;
type RoomsFilter = "all" | 1 | 2 | 3 | 4;

function cityLabel(key: CityKey) {
  if (key === "tokyo") return "東京都";
  if (key === "osaka") return "大阪府";
  return "神奈川県";
}

function PropertyTitle({ id }: { id: string }) {
  switch (id) {
    case "shinjuku-park-1203":
      return <>新宿御苑スカイレジデンス 12階角部屋</>;
    case "meguro-river-501":
      return <>目黒川テラスハウス 501号室</>;
    case "yokohama-minato-902":
      return <>横浜みなとみらいタワー 9階</>;
    case "kawasaki-station-305":
      return <>川崎駅前グランドレジデンス 305</>;
    case "umeda-sky-2101":
      return <>梅田スカイコート 21階南向き</>;
    case "namba-loft-808":
      return <>難波ロフトマンション 808号室</>;
    case "shibuya-cross-402":
      return <>渋谷クロスゲート 4階メゾネット</>;
    case "shinagawa-bay-1502":
      return <>品川ベイサイドタワー 15階</>;
    case "sakai-garden-101":
      return <>堺ガーデンヒルズ 1階庭付き</>;
    case "yokohama-hills-2205":
      return <>横浜ヒルズレジデンス 22階</>;
    case "ikebukuro-sunrise-0801":
      return <>池袋サンライズコート 8階南東向き</>;
    case "nakanoshima-river-1201":
      return <>中之島リバーフロント 12階</>;
    case "fujisawa-coast-0302":
      return <>藤沢コーストレジデンス 3階</>;
    case "taito-skytree-0909":
      return <>台東スカイツリービュー 9階角住戸</>;
    default:
      return <>掲載物件（名称準備中）</>;
  }
}

function propertyCopy(p: PropertyRecord) {
  const cityLabelJp = cityLabel(p.cityKey);
  const roomsLabelJp = `${p.rooms}LDK相当`;
  const areaLabelJp = `専有面積 ${p.areaSqm}㎡`;
  const yearLabelJp = `築年 ${p.builtYear}年`;
  const detailCta = "物件の詳細を見る";
  const thumbCaption = p.listingKind === "sale" ? "売買" : "賃貸";

  return {
    cityLabel: `所在地：${cityLabelJp}`,
    roomsLabel: `間取り：${roomsLabelJp}`,
    areaLabel: areaLabelJp,
    yearLabel: yearLabelJp,
    detailCta,
    thumbCaption,
  };
}

function StatsRibbon({
  totalListed,
  saleCount,
  rentCount,
  tokyoCount,
  osakaCount,
  kanagawaCount,
  matchedCount,
  listingFilter,
  cityFilter,
  roomsFilter,
}: {
  totalListed: number;
  saleCount: number;
  rentCount: number;
  tokyoCount: number;
  osakaCount: number;
  kanagawaCount: number;
  matchedCount: number;
  listingFilter: ListingFilter;
  cityFilter: CityFilter;
  roomsFilter: RoomsFilter;
}) {
  return (
    <section className={styles.stats} aria-label="掲載状況のサマリー">
      <p className={styles.statsTitle}>ライブラリ内の集計（デモ）</p>
      <div className={styles.statsGrid}>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>データベース登録件数</span>
          <span className={styles.statValue}>{totalListed}</span>
          <span className={styles.statHint}>全エリア合算の掲載ベース</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>売買物件の件数</span>
          <span className={styles.statValue}>{saleCount}</span>
          <span className={styles.statHint}>分譲・中古マンション等</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>賃貸物件の件数</span>
          <span className={styles.statValue}>{rentCount}</span>
          <span className={styles.statHint}>入居時期は物件により異なります</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>東京都エリア</span>
          <span className={styles.statValue}>{tokyoCount}</span>
          <span className={styles.statHint}>23区を中心としたラインナップ</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>大阪府エリア</span>
          <span className={styles.statValue}>{osakaCount}</span>
          <span className={styles.statHint}>都心〜ベイエリアまで幅広く</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>神奈川県エリア</span>
          <span className={styles.statValue}>{kanagawaCount}</span>
          <span className={styles.statHint}>横浜・川崎など人気駅近が充実</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>現在の絞り込み結果</span>
          <span className={styles.statValue}>{matchedCount}</span>
          <span className={styles.statHint}>
            取引区分：
            {listingFilter === "all"
              ? "すべて表示"
              : listingFilter === "sale"
                ? "売買のみ"
                : "賃貸のみ"}
            ／都市：
            {cityFilter === "all"
              ? "全域"
              : cityFilter === "tokyo"
                ? "東京都"
                : cityFilter === "osaka"
                  ? "大阪府"
                  : "神奈川県"}
            ／部屋数：
            {roomsFilter === "all" ? "指定なし" : `${roomsFilter}LDK系統`}
          </span>
        </div>
      </div>
    </section>
  );
}

export function PropertyCatalog() {
  const [listingFilter, setListingFilter] = useState<ListingFilter>("all");
  const [cityFilter, setCityFilter] = useState<CityFilter>("all");
  const [roomsFilter, setRoomsFilter] = useState<RoomsFilter>("all");

  const metrics = useMemo(() => {
    const totalListed = PROPERTIES.length;
    const saleCount = PROPERTIES.filter((p) => p.listingKind === "sale").length;
    const rentCount = PROPERTIES.filter((p) => p.listingKind === "rent").length;
    const tokyoCount = PROPERTIES.filter((p) => p.cityKey === "tokyo").length;
    const osakaCount = PROPERTIES.filter((p) => p.cityKey === "osaka").length;
    const kanagawaCount = PROPERTIES.filter((p) => p.cityKey === "kanagawa").length;

    const filtered = sortPropertiesForDisplay(
      PROPERTIES.filter((p) => {
        if (listingFilter !== "all" && p.listingKind !== listingFilter) {
          return false;
        }
        if (cityFilter !== "all" && p.cityKey !== cityFilter) {
          return false;
        }
        if (roomsFilter !== "all" && p.rooms !== roomsFilter) {
          return false;
        }
        return true;
      }),
    );

    return {
      totalListed,
      saleCount,
      rentCount,
      tokyoCount,
      osakaCount,
      kanagawaCount,
      filtered,
    };
  }, [listingFilter, cityFilter, roomsFilter]);

  const matchedCount = metrics.filtered.length;

  return (
    <div className={styles.wrap}>
      <StatsRibbon
        totalListed={metrics.totalListed}
        saleCount={metrics.saleCount}
        rentCount={metrics.rentCount}
        tokyoCount={metrics.tokyoCount}
        osakaCount={metrics.osakaCount}
        kanagawaCount={metrics.kanagawaCount}
        matchedCount={matchedCount}
        listingFilter={listingFilter}
        cityFilter={cityFilter}
        roomsFilter={roomsFilter}
      />

      <section className={styles.filters} aria-label="物件検索フィルター">
        <h2 className={styles.filtersTitle}>条件で絞り込む</h2>
        <p className={styles.filtersLead}>
          ボタンを押すたびに件数が更新されます。複数条件はANDで適用されます。
        </p>

        <div className={styles.group}>
          <p className={styles.groupLabel}>取引の種類</p>
          <div className={styles.row} role="group" aria-label="取引区分">
            <button
              type="button"
              className={`${styles.chip} ${
                listingFilter === "all" ? styles.chipActive : ""
              }`}
              onClick={() => setListingFilter("all")}
            >
              すべて
            </button>
            <button
              type="button"
              className={`${styles.chip} ${
                listingFilter === "sale" ? styles.chipActive : ""
              }`}
              onClick={() => setListingFilter("sale")}
            >
              売買のみ
            </button>
            <button
              type="button"
              className={`${styles.chip} ${
                listingFilter === "rent" ? styles.chipActive : ""
              }`}
              onClick={() => setListingFilter("rent")}
            >
              賃貸のみ
            </button>
          </div>
        </div>

        <div className={styles.group}>
          <p className={styles.groupLabel}>都市（都道府県）</p>
          <div className={styles.row} role="group" aria-label="都市フィルター">
            <button
              type="button"
              className={`${styles.chip} ${
                cityFilter === "all" ? styles.chipActive : ""
              }`}
              onClick={() => setCityFilter("all")}
            >
              指定なし
            </button>
            <button
              type="button"
              className={`${styles.chip} ${
                cityFilter === "tokyo" ? styles.chipActive : ""
              }`}
              onClick={() => setCityFilter("tokyo")}
            >
              東京都
            </button>
            <button
              type="button"
              className={`${styles.chip} ${
                cityFilter === "osaka" ? styles.chipActive : ""
              }`}
              onClick={() => setCityFilter("osaka")}
            >
              大阪府
            </button>
            <button
              type="button"
              className={`${styles.chip} ${
                cityFilter === "kanagawa" ? styles.chipActive : ""
              }`}
              onClick={() => setCityFilter("kanagawa")}
            >
              神奈川県
            </button>
          </div>
        </div>

        <div className={styles.group}>
          <p className={styles.groupLabel}>部屋数の目安（LDK）</p>
          <div className={styles.row} role="group" aria-label="間取りフィルター">
            <button
              type="button"
              className={`${styles.chip} ${
                roomsFilter === "all" ? styles.chipActive : ""
              }`}
              onClick={() => setRoomsFilter("all")}
            >
              こだわらない
            </button>
            <button
              type="button"
              className={`${styles.chip} ${
                roomsFilter === 1 ? styles.chipActive : ""
              }`}
              onClick={() => setRoomsFilter(1)}
            >
              1LDK
            </button>
            <button
              type="button"
              className={`${styles.chip} ${
                roomsFilter === 2 ? styles.chipActive : ""
              }`}
              onClick={() => setRoomsFilter(2)}
            >
              2LDK
            </button>
            <button
              type="button"
              className={`${styles.chip} ${
                roomsFilter === 3 ? styles.chipActive : ""
              }`}
              onClick={() => setRoomsFilter(3)}
            >
              3LDK
            </button>
            <button
              type="button"
              className={`${styles.chip} ${
                roomsFilter === 4 ? styles.chipActive : ""
              }`}
              onClick={() => setRoomsFilter(4)}
            >
              4LDK
            </button>
          </div>
        </div>

        <div className={styles.resetRow}>
          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              setListingFilter("all");
              setCityFilter("all");
              setRoomsFilter("all");
            }}
          >
            条件をすべてクリア
          </button>
          <span className={styles.resetNote}>
            クリア後は掲載ライブラリの全件が再表示されます
          </span>
        </div>
      </section>

      <div className={styles.resultBanner}>
        <p className={styles.resultMain}>
          該当物件は <strong>{matchedCount}</strong> 件です
        </p>
        <p className={styles.resultSub}>
          （ライブラリ全体 {metrics.totalListed} 件のうち、フィルター後の表示件数）
        </p>
      </div>

      {matchedCount === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>該当する物件が見つかりませんでした</p>
          <p>条件を緩めるか、「条件をすべてクリア」からやり直してください。</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {metrics.filtered.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              title={<PropertyTitle id={p.id} />}
              copy={propertyCopy(p)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
