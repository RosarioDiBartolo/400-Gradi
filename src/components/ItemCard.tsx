import Image from "next/image";

import type { Item } from "@/types/menu";
import type { Lang, LocalizeFn } from "@/lib/i18n/lang";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PriceBlock from "./PriceBlock";

type ItemCardProps = {
  item: Item;
  lang: Lang;
  localize: LocalizeFn;
  featured?: boolean;
  reverse?: boolean;
};

const ui = {
  it: {
    allergens: "Allergeni",
    details: "Dettagli",
    gallery: "Galleria",
  },
  en: {
    allergens: "Allergens",
    details: "Details",
    gallery: "Gallery",
  },
};

const MOCKUP_IMAGE = {
  url: "/menu-image-placeholder.svg",
  alt: "400 Gradi placeholder",
};

export default function ItemCard({
  item,
  lang,
  localize,
  featured = false,
  reverse = false,
}: ItemCardProps) {
  const name = localize(item.name, lang);
  const description = localize(item.description ?? null, lang);
  const allergens = item.allergens ?? [];
  const tags = item.tags ?? [];
  const media = [item.mainImage, ...(item.gallery ?? [])]
    .filter((image): image is NonNullable<typeof item.mainImage> => Boolean(image?.url))
    .filter(
      (image, index, images) =>
        images.findIndex((candidate) => candidate.url === image.url) === index
    );

  const previewDescription =
    description.length > 88 ? `${description.slice(0, 88)}...` : description;
  const detailMedia = media.length > 0 ? media : [MOCKUP_IMAGE];

  if (featured) {
    return (
      <article className="border border-border/70 bg-surface">
        <div
          className={cn(
            "grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-8",
            reverse && "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
          )}
        >
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-6">
              <h3 className="max-w-[28ch] text-[clamp(1.6rem,4.5vw,2.6rem)] leading-tight">
                {name}
              </h3>
              <PriceBlock
                basePrice={item.basePrice}
                variants={item.variants}
                lang={lang}
                localize={localize}
              />
            </div>
            {description ? (
              <p className="max-w-[52ch] text-[15px] leading-7 text-muted-foreground">
                {description}
              </p>
            ) : null}
            {allergens.length > 0 ? (
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {ui[lang].allergens}
                </p>
                <div className="flex flex-wrap gap-2">
                  {allergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="border border-border/70 px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="overflow-hidden border border-border/60 bg-background">
            <Image
              src={(media[0] ?? MOCKUP_IMAGE).url}
              alt={(media[0] ?? MOCKUP_IMAGE).alt || name}
              width={1200}
              height={900}
              className="h-full min-h-[260px] w-full object-cover"
              sizes="(max-width: 767px) 100vw, 35vw"
            />
          </div>
        </div>
        {media.length > 1 ? (
          <div className="space-y-3 border-t border-border/60 px-6 pb-6 pt-4 md:px-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {ui[lang].gallery}
            </p>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
              {media.slice(1).map((image) => (
                <div
                  key={`${item._id}-${image.url}`}
                  className="overflow-hidden border border-border/60 bg-background"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || name}
                    width={600}
                    height={420}
                    className="aspect-[4/3] w-full object-cover"
                    sizes="(max-width: 767px) 30vw, 16vw"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </article>
    );
  }

  return (
    <article>
      <Accordion type="single" collapsible>
        <AccordionItem value={item._id} className="border-none">
          <AccordionTrigger className="py-8 text-current hover:no-underline">
            <div className="flex w-full items-start justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-[clamp(1.25rem,2.8vw,2rem)] leading-tight">{name}</h3>
                {previewDescription ? (
                  <p className="text-[13px] uppercase tracking-[0.1em] text-muted-foreground">
                    {previewDescription}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2 text-right">
                <PriceBlock
                  basePrice={item.basePrice}
                  variants={item.variants}
                  lang={lang}
                  localize={localize}
                  compact
                />
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {ui[lang].details}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pb-8">
            {description ? (
              <p className="max-w-[62ch] text-[15px] leading-7 text-muted-foreground">
                {description}
              </p>
            ) : null}

            {(item.variants?.length ?? 0) > 1 ? (
              <PriceBlock
                basePrice={item.basePrice}
                variants={item.variants}
                lang={lang}
                localize={localize}
                className="max-w-[220px]"
              />
            ) : null}

            {tags.length > 0 ? (
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {tags.join(" | ")}
              </p>
            ) : null}

            {allergens.length > 0 ? (
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {ui[lang].allergens}
                </p>
                <div className="flex flex-wrap gap-2">
                  {allergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="border border-border/70 px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {detailMedia.length > 0 ? (
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {ui[lang].gallery}
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {detailMedia.map((image) => (
                    <div
                      key={`${item._id}-${image.url}`}
                      className="overflow-hidden border border-border/60 bg-background"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || name}
                        width={1200}
                        height={900}
                        className={cn(
                          "w-full object-cover",
                          detailMedia.length === 1 ? "h-[320px]" : "aspect-[4/3]"
                        )}
                        sizes="(max-width: 767px) 100vw, 44vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </article>
  );
}
