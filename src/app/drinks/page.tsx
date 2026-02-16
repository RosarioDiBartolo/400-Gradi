import MenuClient from "@/components/MenuClient";
import { fetchMenu } from "@/lib/cms/client";

export default async function DrinksPage() {
  try {
    const data = await fetchMenu("drink");
    return <MenuClient initialData={data} kind="drink" />;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Errore nel caricamento.";
    return (
      <div className="border border-border/70 bg-surface p-6 text-sm text-muted-foreground">
        {message}
      </div>
    );
  }
}
