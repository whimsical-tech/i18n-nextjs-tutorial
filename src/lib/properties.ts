export type ListingKind = "sale" | "rent";

export type CityKey = "tokyo" | "osaka" | "kanagawa";

export type PropertyRecord = {
  id: string;
  listingKind: ListingKind;
  cityKey: CityKey;
  rooms: 1 | 2 | 3 | 4;
  areaSqm: number;
  builtYear: number;
  monthlyRentYen?: number;
  salePriceYen?: number;
  /** 新着として一覧先頭に並べ、NEWバッジを表示する */
  isNew?: boolean;
};

export const PROPERTIES: PropertyRecord[] = [
  {
    id: "shinjuku-park-1203",
    listingKind: "rent",
    cityKey: "tokyo",
    rooms: 2,
    areaSqm: 58,
    builtYear: 2019,
    monthlyRentYen: 248000,
  },
  {
    id: "meguro-river-501",
    listingKind: "sale",
    cityKey: "tokyo",
    rooms: 3,
    areaSqm: 72,
    builtYear: 2017,
    salePriceYen: 118000000,
  },
  {
    id: "yokohama-minato-902",
    listingKind: "rent",
    cityKey: "kanagawa",
    rooms: 1,
    areaSqm: 36,
    builtYear: 2021,
    monthlyRentYen: 112000,
  },
  {
    id: "kawasaki-station-305",
    listingKind: "sale",
    cityKey: "kanagawa",
    rooms: 2,
    areaSqm: 64,
    builtYear: 2015,
    salePriceYen: 59800000,
  },
  {
    id: "umeda-sky-2101",
    listingKind: "rent",
    cityKey: "osaka",
    rooms: 2,
    areaSqm: 55,
    builtYear: 2020,
    monthlyRentYen: 198000,
  },
  {
    id: "namba-loft-808",
    listingKind: "sale",
    cityKey: "osaka",
    rooms: 4,
    areaSqm: 98,
    builtYear: 2014,
    salePriceYen: 142000000,
  },
  {
    id: "shibuya-cross-402",
    listingKind: "rent",
    cityKey: "tokyo",
    rooms: 3,
    areaSqm: 81,
    builtYear: 2018,
    monthlyRentYen: 385000,
  },
  {
    id: "shinagawa-bay-1502",
    listingKind: "sale",
    cityKey: "tokyo",
    rooms: 2,
    areaSqm: 61,
    builtYear: 2016,
    salePriceYen: 92800000,
  },
  {
    id: "sakai-garden-101",
    listingKind: "rent",
    cityKey: "osaka",
    rooms: 1,
    areaSqm: 32,
    builtYear: 2022,
    monthlyRentYen: 88000,
  },
  {
    id: "yokohama-hills-2205",
    listingKind: "sale",
    cityKey: "kanagawa",
    rooms: 3,
    areaSqm: 76,
    builtYear: 2013,
    salePriceYen: 87500000,
  },
  {
    id: "ikebukuro-sunrise-0801",
    listingKind: "rent",
    cityKey: "tokyo",
    rooms: 2,
    areaSqm: 52,
    builtYear: 2024,
    monthlyRentYen: 224000,
    isNew: true,
  },
  {
    id: "nakanoshima-river-1201",
    listingKind: "sale",
    cityKey: "osaka",
    rooms: 2,
    areaSqm: 68,
    builtYear: 2023,
    salePriceYen: 102000000,
    isNew: true,
  },
  {
    id: "fujisawa-coast-0302",
    listingKind: "rent",
    cityKey: "kanagawa",
    rooms: 1,
    areaSqm: 38,
    builtYear: 2025,
    monthlyRentYen: 98000,
    isNew: true,
  },
  {
    id: "taito-skytree-0909",
    listingKind: "rent",
    cityKey: "tokyo",
    rooms: 3,
    areaSqm: 74,
    builtYear: 2020,
    monthlyRentYen: 268000,
    isNew: true,
  },
];

/** 新着フラグが付いた物件の件数（メッセージ表示などと同期） */
export const NEW_LISTING_COUNT = PROPERTIES.filter((p) => p.isNew).length;

const propertyOrder = new Map(
  PROPERTIES.map((property, index) => [property.id, index] as const),
);

/** 新着を先頭に、それ以外はデータ定義順 */
export function sortPropertiesForDisplay(list: PropertyRecord[]): PropertyRecord[] {
  return [...list].sort((a, b) => {
    const aNew = a.isNew ? 1 : 0;
    const bNew = b.isNew ? 1 : 0;
    if (aNew !== bNew) return bNew - aNew;
    return (propertyOrder.get(a.id) ?? 0) - (propertyOrder.get(b.id) ?? 0);
  });
}

export function getPropertyById(id: string): PropertyRecord | undefined {
  return PROPERTIES.find((p) => p.id === id);
}
