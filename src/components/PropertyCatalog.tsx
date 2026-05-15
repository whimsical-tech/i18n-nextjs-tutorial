"use client";

import { useMemo, useState } from "react";
import type { CityKey, ListingKind } from "@/lib/properties";
import { PROPERTIES, sortPropertiesForDisplay } from "@/lib/properties";
import { PropertyCard } from "./PropertyCard";
import styles from "./PropertyCatalog.module.css";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <section className={styles.stats} aria-label={t("propertyCatalog.summary")}>
      <div className={styles.statsGrid}>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>
            {t("propertyCatalog.currentlyFiltered")}
          </span>
          <span className={styles.statValue}>{matchedCount}</span>
          <span className={styles.statHint}>
            {t("propertyCatalog.type")}
            {": "}
            {listingFilter === "all"
              ? t("propertyCatalog.showEverything")
              : listingFilter === "sale"
                ? t("propertyCatalog.buyAndSell")
                : t("propertyCatalog.rent")}
            {t("propertyCatalog.city")}
            {cityFilter === "all"
              ? t("propertyCatalog.wholeArea")
              : cityFilter === "tokyo"
                ? t("propertyId.tokyo")
                : cityFilter === "osaka"
                  ? t("propertyId.osaka")
                  : t("propertyId.kanagawa")}
            {t("propertyCatalog.floorPlan")}
            {roomsFilter === "all"
              ? t("propertyCatalog.noSpecification")
              : `${roomsFilter}${t("propertyCatalog.LDKsystem")}`}
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
  const { t } = useTranslation();

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
              <h2 className={styles.filtersTitle}>
                {t("propertyCatalog.filterByConditions")}
              </h2>
              <div className={styles.group}>
                <p className={styles.groupLabel}>
                  {t("propertyCatalog.transactionType")}
                </p>
                <div
                  className={styles.row}
                  role="group"
                  aria-label={t("propertyCatalog.type")}
                >
                  <button
                    type="button"
                    className={`${styles.chip} ${
                      listingFilter === "all" ? styles.chipActive : ""
                    }`}
                    onClick={() => setListingFilter("all")}
                  >
                    {t("propertyCatalog.all")}
                  </button>
                  <button
                    type="button"
                    className={`${styles.chip} ${
                      listingFilter === "sale" ? styles.chipActive : ""
                    }`}
                    onClick={() => setListingFilter("sale")}
                  >
                    {t("propertyCatalog.buyAndSell")}
                  </button>
                  <button
                    type="button"
                    className={`${styles.chip} ${
                      listingFilter === "rent" ? styles.chipActive : ""
                    }`}
                    onClick={() => setListingFilter("rent")}
                  >
                    {t("propertyCatalog.rent")}
                  </button>
                </div>
              </div>

              <div className={styles.group}>
                <p className={styles.groupLabel}>
                  {t("propertyCatalog.prefectures")}
                </p>
                <div
                  className={styles.row}
                  role="group"
                  aria-label={t("propertyCatalog.cityFilter")}
                >
                  <button
                    type="button"
                    className={`${styles.chip} ${
                      cityFilter === "all" ? styles.chipActive : ""
                    }`}
                    onClick={() => setCityFilter("all")}
                  >
                    {t("propertyCatalog.noSpecification")}
                  </button>
                  <button
                    type="button"
                    className={`${styles.chip} ${
                      cityFilter === "tokyo" ? styles.chipActive : ""
                    }`}
                    onClick={() => setCityFilter("tokyo")}
                  >
                    {t("propertyId.tokyo")}
                  </button>
                  <button
                    type="button"
                    className={`${styles.chip} ${
                      cityFilter === "osaka" ? styles.chipActive : ""
                    }`}
                    onClick={() => setCityFilter("osaka")}
                  >
                    {t("propertyId.osaka")}
                  </button>
                  <button
                    type="button"
                    className={`${styles.chip} ${
                      cityFilter === "kanagawa" ? styles.chipActive : ""
                    }`}
                    onClick={() => setCityFilter("kanagawa")}
                  >
                    {t("propertyId.kanagawa")}
                  </button>
                </div>
              </div>

              <div className={styles.group}>
                <p className={styles.groupLabel}>
                  {t("propertyCatalog.numberOfRooms")}
                </p>
                <div
                  className={styles.row}
                  role="group"
                  aria-label={t("propertyCatalog.floorPlanFilter")}
                >
                  <button
                    type="button"
                    className={`${styles.chip} ${
                      roomsFilter === "all" ? styles.chipActive : ""
                    }`}
                    onClick={() => setRoomsFilter("all")}
                  >
                    {t("any")}
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
                    {t("propertyCatalog.reset")}
                  </button>
                  <span className={styles.resetNote}>
                    {t("propertyCatalog.resetNotice")}
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
                {t("propertyCatalog.noResults")}
              </p>
              <p>{t("propertyCatalog.changeCriteria")}</p>
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
