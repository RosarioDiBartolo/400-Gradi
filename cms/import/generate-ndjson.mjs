import fs from "node:fs";

const INPUT = "import/menu.seed.json";
const OUTPUT = "import/menu.ndjson";
// categorie che sono drink (tutto il resto = food)
const DRINK_CATEGORY_SLUGS = new Set([
  "bevande",
  "birre-alla-spina",
  "birrificio-delletna",
  "vini-rossi",
  "vini-bianchi",
  "cocktail",
  "caffe",
]);

function normalizeItemId(oldId) {
  if (typeof oldId !== "string") return oldId;
  if (oldId.startsWith("menuItem.")) {
    return "item." + oldId.slice("menuItem.".length);
  }
  return oldId;
}

function isObject(x) {
  return x !== null && typeof x === "object" && !Array.isArray(x);
}

function ensureI18nString(obj) {
  // i18nString: { it?: string, en?: string }
  if (!isObject(obj)) return { it: "", en: "" };
  return {
    it: typeof obj.it === "string" ? obj.it : "",
    en: typeof obj.en === "string" ? obj.en : "",
  };
}

function ensureI18nText(obj) {
  // i18nText: { it?: string, en?: string }
  if (!isObject(obj)) return { it: "", en: "" };
  return {
    it: typeof obj.it === "string" ? obj.it : "",
    en: typeof obj.en === "string" ? obj.en : "",
  };
}

function inferKindFromCategoryRef(doc) {
  // prova a prendere lo slug dall'id category.xxx oppure dal ref
  const ref = doc?.category?._ref;
  if (typeof ref === "string" && ref.startsWith("category.")) {
    const slug = ref.slice("category.".length);
    return DRINK_CATEGORY_SLUGS.has(slug) ? "drink" : "food";
  }
  return "food";
}

function toNdjsonLines(docs) {
  return docs.map((d) => JSON.stringify(d)).join("\n");
}

const raw = fs.readFileSync(INPUT, "utf-8");
const docs = JSON.parse(raw);

if (!Array.isArray(docs)) {
  throw new Error("Input JSON must be an array of documents");
}

const out = [];

for (const doc of docs) {
  // drop settings (non esiste nello schema che mi hai mandato)
  if (doc?._type === "settings") continue;

  // normalize category
  if (doc?._type === "category") {
    const currentSlug =
      doc?.slug?.current ||
      (typeof doc?._id === "string" && doc._id.startsWith("category.")
        ? doc._id.slice("category.".length)
        : "");

    const kind = DRINK_CATEGORY_SLUGS.has(currentSlug) ? "drink" : "food";

    out.push({
      _id: doc._id,
      _type: "category",
      title: ensureI18nString(doc.title),
      slug: doc.slug, // gia { _type:"slug", current:"..." }
      image: doc.image ?? null,
      kind, // REQUIRED nello schema
      order: typeof doc.sortOrder === "number" ? doc.sortOrder : doc.order ?? 0,
      isActive: typeof doc.isActive === "boolean" ? doc.isActive : true,
    });
    continue;
  }

  // normalize item (prima era menuItem)
  if (doc?._type === "menuItem" || doc?._type === "item") {
    out.push({
      _id: normalizeItemId(doc._id),
      _type: "item",
      name: ensureI18nString(doc.title ?? doc.name),
      description: ensureI18nText(doc.description),
      category: doc.category, // reference gia ok
      basePrice: typeof doc.price === "number" ? doc.price : doc.basePrice ?? 0,
      mainImage: doc.mainImage ?? null,
      gallery: Array.isArray(doc.gallery) ? doc.gallery : [],
      variants: Array.isArray(doc.variants) ? doc.variants : [], // nel tuo vecchio file erano modifiers -> li ignoriamo
      allergens: Array.isArray(doc.allergens) ? doc.allergens : [],
      tags: Array.isArray(doc.tags) ? doc.tags : [],
      order: typeof doc.sortOrder === "number" ? doc.sortOrder : doc.order ?? 0,
      isAvailable:
        typeof doc.isAvailable === "boolean"
          ? doc.isAvailable
          : typeof doc.isActive === "boolean"
            ? doc.isActive
            : true,
    });

    continue;
  }

  // se trovi altri tipi non previsti, li teniamo cosi come sono (o puoi scegliere di scartarli)
  out.push(doc);
}

fs.writeFileSync(OUTPUT, toNdjsonLines(out), "utf-8");

console.log(`Input docs: ${docs.length}`);
console.log(`Output docs: ${out.length}`);
console.log(`Wrote NDJSON: ${OUTPUT}`);
