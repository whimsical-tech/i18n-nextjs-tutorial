export type ListingKind = "sale" | "rent";

export type CityKey = "tokyo" | "osaka" | "kanagawa";

export type PropertyRecord = {
  id: string;
  listingKind: ListingKind;
  cityKey: CityKey;
  rooms: number;
  areaSqm: number;
  builtYear: number;
  photoCredit?: string;
  photoCreditUrl?: string;
  monthlyRentYen?: number;
  salePriceYen?: number;
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
    photoCredit: "Naomi Hébert",
    photoCreditUrl:
      "https://unsplash.com/@naomish?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "meguro-river-501",
    listingKind: "sale",
    cityKey: "tokyo",
    rooms: 3,
    areaSqm: 72,
    builtYear: 2017,
    salePriceYen: 118000000,
    photoCredit: "Quilia",
    photoCreditUrl:
      "https://unsplash.com/@heyquilia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "yokohama-minato-902",
    listingKind: "rent",
    cityKey: "kanagawa",
    rooms: 1,
    areaSqm: 36,
    builtYear: 2021,
    monthlyRentYen: 112000,
    photoCredit: "Patrick Perkins",
    photoCreditUrl:
      "https://unsplash.com/@patrickperkins?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "kawasaki-station-305",
    listingKind: "sale",
    cityKey: "kanagawa",
    rooms: 2,
    areaSqm: 64,
    builtYear: 2015,
    salePriceYen: 59800000,
    photoCredit: "Pixasquare",
    photoCreditUrl:
      "https://unsplash.com/@pixasquare?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "umeda-sky-2101",
    listingKind: "rent",
    cityKey: "osaka",
    rooms: 2,
    areaSqm: 55,
    builtYear: 2020,
    monthlyRentYen: 198000,
    photoCredit: "Kara Eads",
    photoCreditUrl:
      "https://unsplash.com/@karaeads?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "namba-loft-808",
    listingKind: "sale",
    cityKey: "osaka",
    rooms: 4,
    areaSqm: 98,
    builtYear: 2014,
    salePriceYen: 142000000,
    photoCredit: "Francesca Tosolini",
    photoCreditUrl:
      "https://unsplash.com/@fromitaly?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "shibuya-cross-402",
    listingKind: "rent",
    cityKey: "tokyo",
    rooms: 3,
    areaSqm: 81,
    builtYear: 2018,
    monthlyRentYen: 385000,
    photoCredit: "Douglas Sheppard",
    photoCreditUrl:
      "https://unsplash.com/@candjstudios?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "shinagawa-bay-1502",
    listingKind: "sale",
    cityKey: "tokyo",
    rooms: 2,
    areaSqm: 61,
    builtYear: 2016,
    salePriceYen: 92800000,
    photoCredit: "Spacejoy",
    photoCreditUrl:
      "https://unsplash.com/@spacejoy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "sakai-garden-101",
    listingKind: "rent",
    cityKey: "osaka",
    rooms: 1,
    areaSqm: 32,
    builtYear: 2022,
    monthlyRentYen: 88000,
    photoCredit: "Kam Idris",
    photoCreditUrl:
      "https://unsplash.com/@ka_idris?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "yokohama-hills-2205",
    listingKind: "sale",
    cityKey: "kanagawa",
    rooms: 3,
    areaSqm: 176,
    builtYear: 2013,
    salePriceYen: 87500000,
    isNew: true,
    photoCredit: "Frames For Your Heart",
    photoCreditUrl:
      "https://unsplash.com/@framesforyourheart?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "ikebukuro-sunrise-0801",
    listingKind: "rent",
    cityKey: "tokyo",
    rooms: 2,
    areaSqm: 52,
    builtYear: 2024,
    monthlyRentYen: 224000,
    photoCredit: "Lotus Design N Print",
    photoCreditUrl:
      "https://unsplash.com/@lotusdnp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
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
    photoCredit: "Outsite Co",
    photoCreditUrl:
      "https://unsplash.com/@outsite?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "fujisawa-coast-0302",
    listingKind: "rent",
    cityKey: "kanagawa",
    rooms: 4,
    areaSqm: 138,
    builtYear: 2025,
    monthlyRentYen: 898000,
    isNew: true,
    photoCredit: "Ярослав Алексеенко",
    photoCreditUrl:
      "https://unsplash.com/photos/white-and-brown-concrete-building-under-blue-sky-during-daytime-_TPTXZd9mOo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    id: "taito-skytree-0909",
    listingKind: "rent",
    cityKey: "tokyo",
    rooms: 2,
    areaSqm: 74,
    builtYear: 2020,
    monthlyRentYen: 268000,
    isNew: true,
    photoCredit: "Spacejoy",
    photoCreditUrl:
      "https://unsplash.com/@spacejoy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
];

/** 新着フラグが付いた物件の件数（メッセージ表示などと同期） */
export const NEW_LISTING_COUNT = PROPERTIES.filter((p) => p.isNew).length;

const propertyOrder = new Map(
  PROPERTIES.map((property, index) => [property.id, index] as const),
);

/** 新着を先頭に、それ以外はデータ定義順 */
export function sortPropertiesForDisplay(
  list: PropertyRecord[],
): PropertyRecord[] {
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
