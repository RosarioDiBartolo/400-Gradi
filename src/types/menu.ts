// App-level normalized menu types. Raw Sanity schema + query types live in src/types/sanity.types.ts.
export type i18nString = {
  it: string;
  en?: string | null;
};

export type i18nText = {
  it: string;
  en?: string | null;
};

export type MenuImage = {
  url: string;
  alt?: string | null;
};

export type Variant = {
  label: i18nString;
  price: number;
  order: number;
  isDefault?: boolean | null;
};

export type Item = {
  _id: string;
  name: i18nString;
  description?: i18nText | null;
  basePrice?: number | null;
  mainImage?: MenuImage | null;
  gallery?: MenuImage[] | null;
  variants?: Variant[] | null;
  allergens?: string[] | null;
  tags?: string[] | null;
  order: number;
  isAvailable: boolean;
};

export type Category = {
  _id: string;
  title: i18nString;
  image?: MenuImage | null;
  kind: "food" | "drink";
  order: number;
  isActive: boolean;
  items: Item[];
};
