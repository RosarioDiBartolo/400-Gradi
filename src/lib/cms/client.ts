import { defineQuery } from "groq";

import type {
  Category,
  Item,
  MenuImage,
  Variant,
  i18nString,
  i18nText,
} from "@/types/menu";
import type { MenuByKindQueryResult } from "@/types/sanity.types";

type FetchMenuResponse = {
  result?: MenuByKindQueryResult;
};

const getEnv = () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
  const token = process.env.SANITY_READ_TOKEN;

  if (!projectId || !dataset) {
    throw new Error(
      "Missing Sanity env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET."
    );
  }

  return { projectId, dataset, apiVersion, token };
};


const sortByOrder = <T extends { order?: number | null }>(a: T, b: T) =>
  (a.order ?? 0) - (b.order ?? 0);

type RawCategory = MenuByKindQueryResult[number];
type RawItem = RawCategory["items"][number];
type RawVariant = NonNullable<RawItem["variants"]>[number];

type RawI18n = { it?: string | null; en?: string | null } | null | undefined;

const normalizeI18nString = (value: RawI18n): i18nString => ({
  it: value?.it ?? "",
  en: value?.en ?? null,
});

const normalizeI18nText = (value: RawI18n): i18nText => ({
  it: value?.it ?? "",
  en: value?.en ?? null,
});

type RawImage = { url?: string | null; alt?: string | null } | null | undefined;

const normalizeImage = (image: RawImage): MenuImage | null => {
  if (!image?.url) return null;
  return {
    url: image.url,
    alt: image.alt ?? null,
  };
};

const normalizeImages = (images?: RawImage[] | null): MenuImage[] | null => {
  const normalized = (images ?? [])
    .map((image) => normalizeImage(image))
    .filter((image): image is MenuImage => Boolean(image));
  return normalized.length > 0 ? normalized : null;
};

const normalizeVariants = (variants?: RawVariant[] | null): Variant[] =>
  (variants ?? [])
    .map((variant) => ({
      label: normalizeI18nString(variant.label),
      price: variant.price ?? 0,
      order: variant.order ?? 0,
      isDefault: variant.isDefault ?? null,
    }))
    .slice()
    .sort(sortByOrder);

const normalizeItems = (items?: RawItem[] | null): Item[] =>
  (items ?? [])
    .filter((item) => item.isAvailable)
    .slice()
    .sort(sortByOrder)
    .map((item) => ({
      _id: item._id,
      name: normalizeI18nString(item.name),
      description: item.description ? normalizeI18nText(item.description) : null,
      basePrice: item.basePrice ?? null,
      mainImage: normalizeImage(item.mainImage),
      gallery: normalizeImages(item.gallery),
      variants: normalizeVariants(item.variants),
      allergens: item.allergens ?? null,
      tags: item.tags ?? null,
      order: item.order ?? 0,
      isAvailable: item.isAvailable ?? false,
    }));

const normalizeCategories = (
  categories?: RawCategory[] | null
): Category[] =>
  (categories ?? [])
    .filter((category) => category.isActive)
    .slice()
    .sort(sortByOrder)
    .map((category) => ({
      _id: category._id,
      title: normalizeI18nString(category.title),
      image: normalizeImage(category.image),
      kind: (category.kind ?? "food") as Category["kind"],
      order: category.order ?? 0,
      isActive: category.isActive ?? false,
      items: normalizeItems(category.items),
    }));

export const menuByKindQuery = defineQuery(`
*[_type == "category" && kind == $kind && isActive == true]
  | order(order asc) {
    _id,
    title,
    kind,
    order,
    isActive,
    image {
      "url": asset->url,
      alt
    },
    "items": *[
      _type == "item" &&
      isAvailable == true &&
      references(^._id)
    ] | order(order asc) {
      _id,
      name,
      description,
      basePrice,
      mainImage {
        "url": asset->url,
        alt
      },
      gallery[] {
        "url": asset->url,
        alt
      },
      variants,
      allergens,
      tags,
      order,
      isAvailable
    }
  }
`);

export const fetchMenu = async (
  kind: "food" | "drink"
): Promise<Category[]> => {
  const { projectId, dataset, apiVersion, token } = getEnv();
  const query = menuByKindQuery;
  const params = `&$kind=${encodeURIComponent(JSON.stringify(kind))}`;
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
    query
  )}${params}`;

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Sanity fetch failed: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as FetchMenuResponse;
  return normalizeCategories(data.result);
};
