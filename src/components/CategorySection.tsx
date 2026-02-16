import type { Category } from "@/types/menu";
import type { Lang, LocalizeFn } from "@/lib/i18n/lang";
import ItemCard from "./ItemCard";

type CategorySectionProps = {
  category: Category;
  lang: Lang;
  localize: LocalizeFn;
  anchorId: string;
  index: number;
};

export default function CategorySection({
  category,
  lang,
  localize,
  anchorId,
  index,
}: CategorySectionProps) {
  const title = localize(category.title, lang);
  const featuredItemIndex = category.items.findIndex((item) => Boolean(item.mainImage?.url));
  const featuredItem =
    featuredItemIndex >= 0 ? category.items[featuredItemIndex] : null;
  const items = category.items.filter((_, itemIndex) => itemIndex !== featuredItemIndex);

  return (
    <section id={anchorId} className="scroll-mt-28 space-y-10">
      <header className="space-y-5">
        <h2 className="text-[clamp(2rem,6vw,3rem)] leading-[1.05]">{title}</h2>
        <div className="h-px w-full bg-gold/70" />
      </header>

      {featuredItem ? (
        <ItemCard
          item={featuredItem}
          lang={lang}
          localize={localize}
          featured
          reverse={index % 2 !== 0}
        />
      ) : null}

      <div className="divide-y divide-border/70 border-y border-border/70">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} lang={lang} localize={localize} />
        ))}
      </div>
    </section>
  );
}
