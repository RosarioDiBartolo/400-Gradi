export type OrderedEntity = {
  order?: number | null;
};

export const sortByOrderAsc = <T extends OrderedEntity>(a: T, b: T) =>
  (a.order ?? 0) - (b.order ?? 0);
