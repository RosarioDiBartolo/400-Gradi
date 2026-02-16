const CACHE_KEY = "menu.auto_translate.it_en.v1";

const runtimeCache = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

let storageLoaded = false;
let storageCache: Record<string, string> = {};

export const normalizeAutoTranslationKey = (text: string) =>
  text.trim().replace(/\s+/g, " ");

const loadStorageCache = () => {
  if (storageLoaded || typeof window === "undefined") return;
  storageLoaded = true;

  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return;

    const parsed = JSON.parse(raw) as Record<string, string>;
    storageCache = parsed ?? {};

    Object.entries(storageCache).forEach(([key, value]) => {
      if (typeof value === "string" && value.trim().length > 0) {
        runtimeCache.set(key, value);
      }
    });
  } catch {
    storageCache = {};
  }
};

const persist = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(storageCache));
  } catch {
    // Ignore storage write failures.
  }
};

const decodeEntities = (text: string) => {
  if (typeof window === "undefined") return text;
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

const requestTranslation = async (italianText: string): Promise<string> => {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    italianText
  )}&langpair=it|en`;

  const res = await fetch(url);
  if (!res.ok) return italianText;

  const data = (await res.json()) as {
    responseData?: {
      translatedText?: string;
    };
  };

  const translated = decodeEntities(data?.responseData?.translatedText ?? "").trim();
  return translated.length > 0 ? translated : italianText;
};

export const getCachedAutoTranslation = (italianText: string): string | null => {
  const key = normalizeAutoTranslationKey(italianText);
  if (!key) return null;

  loadStorageCache();
  return runtimeCache.get(key) ?? null;
};

export const translateItalianToEnglish = async (
  italianText: string
): Promise<string> => {
  const key = normalizeAutoTranslationKey(italianText);
  if (!key) return "";

  loadStorageCache();

  const cached = runtimeCache.get(key);
  if (cached) return cached;

  const active = inflight.get(key);
  if (active) return active;

  const task = requestTranslation(key)
    .then((translated) => {
      const finalText = translated.trim().length > 0 ? translated : key;
      runtimeCache.set(key, finalText);
      storageCache[key] = finalText;
      persist();
      return finalText;
    })
    .catch(() => key)
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, task);
  return task;
};
