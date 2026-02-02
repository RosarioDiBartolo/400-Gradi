import type { Item } from "@/types/menu";
import type { Lang } from "@/lib/i18n/lang";
import { getLocalized } from "@/lib/i18n/lang";
import PriceBlock from "./PriceBlock";

type ItemCardProps = {
  item: Item;
  lang: Lang;
};

const ui = {
  it: {
    allergens: "Allergeni",
  },
  en: {
    allergens: "Allergens",
  },
};

export default function ItemCard({ item, lang }: ItemCardProps) {
  const name = getLocalized(item.name, lang);
  const description = getLocalized(item.description ?? null, lang);
  const allergens = item.allergens ?? [];

  return (
    <article className="rounded-lg border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-base font-semibold">{name}</h3>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <PriceBlock basePrice={item.basePrice} variants={item.variants} lang={lang} />
      </div>
      {allergens.length > 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">
          {ui[lang].allergens}: {allergens.join(", ")}
        </p>
      ) : null}
    </article>
  );
}
