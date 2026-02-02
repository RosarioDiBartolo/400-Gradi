import type { Category, Item, Variant } from "@/types/menu";

type FetchMenuResponse = {
  result?: Category[];
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

const sortByOrder = <T extends { order: number }>(a: T, b: T) =>
  (a.order ?? 0) - (b.order ?? 0);

const normalizeVariants = (variants?: Variant[] | null) =>
  (variants ?? []).slice().sort(sortByOrder);

const normalizeItems = (items?: Item[] | null) =>
  (items ?? [])
    .filter((item) => item.isAvailable)
    .slice()
    .sort(sortByOrder)
    .map((item) => ({
      ...item,
      variants: normalizeVariants(item.variants),
    }));

const normalizeCategories = (categories?: Category[] | null): Category[] =>
  (categories ?? [])
    .filter((category) => category.isActive)
    .slice()
    .sort(sortByOrder)
    .map((category) => ({
      ...category,
      items: normalizeItems(category.items),
    }));

const buildQuery = () => `
*[_type == "category" && kind == $kind && isActive == true]
  | order(order asc) {
    _id,
    title,
    kind,
    order,
    isActive,
    "items": *[
      _type == "item" &&
      isAvailable == true &&
      references(^._id)
    ] | order(order asc) {
      _id,
      name,
      description,
      basePrice,
      variants,
      allergens,
      tags,
      order,
      isAvailable
    }
  }
`;

export const fetchMenu = async (
  kind: "food" | "drink"
): Promise<Category[]> => {
  const { projectId, dataset, apiVersion, token } = getEnv();
  const query = buildQuery();
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
