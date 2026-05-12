"use client";

import { useMemo, useState } from "react";
import type { CityKey, ListingKind, PropertyRecord } from "@/lib/properties";
import { PROPERTIES, sortPropertiesForDisplay } from "@/lib/properties";
import { PropertyCard } from "./PropertyCard";
import styles from "./PropertyCatalog.module.css";

type ListingFilter = "all" | ListingKind;
type CityFilter = "all" | CityKey;
type RoomsFilter = "all" | 1 | 2 | 3 | 4;

function StatsRibbon({
  matchedCount,
  listingFilter,
  cityFilter,
  roomsFilter,
}: {
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
    const kanagawaCount = PROPERTIES.filter(
      (p) => p.cityKey === "kanagawa",
    ).length;

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
      <div className={styles.catalogRow}>
        <aside className={styles.stickyAside} aria-label="検索条件・集計">
          <div className={styles.filterStack}>
            <section className={styles.filters} aria-label="物件検索フィルター">
              <h2 className={styles.filtersTitle}>条件で絞り込む</h2>
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
                <div
                  className={styles.row}
                  role="group"
                  aria-label="都市フィルター"
                >
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
                <div
                  className={styles.row}
                  role="group"
                  aria-label="間取りフィルター"
                >
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

              {matchedCount !== metrics.totalListed && (
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
              )}
            </section>

            <StatsRibbon
              matchedCount={matchedCount}
              listingFilter={listingFilter}
              cityFilter={cityFilter}
              roomsFilter={roomsFilter}
            />
          </div>
        </aside>

        <div className={styles.mainColumn}>
          {matchedCount === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>
                該当する物件が見つかりませんでした
              </p>
              <p>
                条件を緩めるか、「条件をすべてクリア」からやり直してください。
              </p>
            </div>
          ) : (
            <div className={styles.grid}>
              {metrics.filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
