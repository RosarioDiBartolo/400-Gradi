import type { Category } from "@/types/menu";
import type { Lang } from "@/lib/i18n/lang";
import { getLocalized } from "@/lib/i18n/lang";
import ItemCard from "./ItemCard";

type CategorySectionProps = {
  category: Category;
  lang: Lang;
};

export default function CategorySection({ category, lang }: CategorySectionProps) {
  const title = getLocalized(category.title, lang);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-3">
        {category.items.map((item) => (
          <ItemCard key={item._id} item={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}
