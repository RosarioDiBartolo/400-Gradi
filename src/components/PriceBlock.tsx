import type { Variant } from "@/types/menu";
import type { Lang, LocalizeFn } from "@/lib/i18n/lang";
import { sortByOrderAsc } from "@/lib/menu/order";
import { cn } from "@/lib/utils";

type PriceBlockProps = {
  basePrice?: number | null;
  variants?: Variant[] | null;
  lang: Lang;
  localize: LocalizeFn;
  compact?: boolean;
  className?: string;
};

const ui = {
  it: {
    priceUnavailable: "Prezzo non disponibile",
  },
  en: {
    priceUnavailable: "Price unavailable",
  },
};

const formatPrice = (price: number, lang: Lang) =>
  new Intl.NumberFormat(lang === "it" ? "it-IT" : "en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price);

const resolveMainPrice = (
  basePrice?: number | null,
  variants?: Variant[] | null
) => {
  if (typeof basePrice === "number") return basePrice;
  if (!variants || variants.length === 0) return null;
  const ordered = variants.slice().sort(sortByOrderAsc);
  const preferred = ordered.find((variant) => variant.isDefault);
  return preferred?.price ?? ordered[0]?.price ?? null;
};

export default function PriceBlock({
  basePrice,
  variants,
  lang,
  localize,
  compact = false,
  className,
}: PriceBlockProps) {
  const orderedVariants = (variants ?? []).slice().sort(sortByOrderAsc);
  const primaryPrice = resolveMainPrice(basePrice, orderedVariants);

  if (compact && typeof primaryPrice === "number") {
    return (
      <div
        className={cn(
          "min-w-[88px] text-right text-[1.05rem] font-medium text-gold",
          className
        )}
      >
        {formatPrice(primaryPrice, lang)}
      </div>
    );
  }

  if (variants && variants.length > 0) {
    return (
      <div className={cn("min-w-[120px] space-y-1 text-right text-sm", className)}>
        {orderedVariants.map((variant) => (
          <div
            key={`${variant.label.it}-${variant.order}-${variant.price}`}
            className="flex justify-between gap-2"
          >
            <span className="text-muted-foreground">{localize(variant.label, lang)}</span>
            <span className="font-medium text-gold">
              {formatPrice(variant.price, lang)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (typeof basePrice === "number") {
    return (
      <div
        className={cn(
          "min-w-[96px] text-right text-[1.05rem] font-medium text-gold",
          className
        )}
      >
        {formatPrice(basePrice, lang)}
      </div>
    );
  }

  return (
    <div className={cn("min-w-[96px] text-right text-xs text-muted-foreground", className)}>
      {ui[lang].priceUnavailable}
    </div>
  );
}
