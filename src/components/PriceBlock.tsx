import type { Variant } from "@/types/menu";
import type { Lang } from "@/lib/i18n/lang";
import { getLocalized } from "@/lib/i18n/lang";

type PriceBlockProps = {
  basePrice?: number | null;
  variants?: Variant[] | null;
  lang: Lang;
};

const ui = {
  it: {
    priceUnavailable: "Prezzo non disponibile",
  },
  en: {
    priceUnavailable: "Price unavailable",
  },
};

const sortByOrder = (a: Variant, b: Variant) => (a.order ?? 0) - (b.order ?? 0);

const formatPrice = (price: number) => `${price.toFixed(2)} EUR`;

export default function PriceBlock({
  basePrice,
  variants,
  lang,
}: PriceBlockProps) {
  if (variants && variants.length > 0) {
    const ordered = variants.slice().sort(sortByOrder);
    return (
      <div className="min-w-[96px] text-right text-sm">
        {ordered.map((variant) => (
          <div
            key={`${variant.label.it}-${variant.order}-${variant.price}`}
            className="flex justify-between gap-2"
          >
            <span className="text-muted-foreground">
              {getLocalized(variant.label, lang)}
            </span>
            <span className="font-medium">{formatPrice(variant.price)}</span>
          </div>
        ))}
      </div>
    );
  }

  if (typeof basePrice === "number") {
    return (
      <div className="min-w-[96px] text-right text-sm font-semibold">
        {formatPrice(basePrice)}
      </div>
    );
  }

  return (
    <div className="min-w-[96px] text-right text-xs text-muted-foreground">
      {ui[lang].priceUnavailable}
    </div>
  );
}
