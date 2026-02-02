export type i18nString = {
  it: string;
  en?: string | null;
};

export type i18nText = {
  it: string;
  en?: string | null;
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
  variants?: Variant[] | null;
  allergens?: string[] | null;
  tags?: string[] | null;
  order: number;
  isAvailable: boolean;
};

export type Category = {
  _id: string;
  title: i18nString;
  kind: "food" | "drink";
  order: number;
  isActive: boolean;
  items: Item[];
};
