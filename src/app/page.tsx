import Image from "next/image";
import Link from "next/link";

const railCards = [
  {
    title: "Menu",
    subtitle: "Le nostre creazioni",
    href: "/menu",
    imagePosition: "object-[52%_30%]",
  },
  {
    title: "Drinks",
    subtitle: "Mixology e pairing",
    href: "/drinks",
    imagePosition: "object-[50%_58%]",
  },
  {
    title: "La Nostra Filosofia",
    subtitle: "Fuoco, impasto, ricerca",
    href: "/menu",
    imagePosition: "object-[50%_78%]",
  },
] as const;

const aboutAwards = [
  { label: "Trip Advisor", sublabel: "Best Steak House", city: "Prague" },
  { label: "Michelin Guide", sublabel: "Best Steak House", city: "Prague" },
  { label: "Star Dining", sublabel: "Best Steak House", city: "Prague" },
] as const;

export default function Page() {
  return (
    <div className="bg-[#090806] text-[#f3eee4]">
      <section className="relative isolate min-h-screen overflow-hidden border-b border-[#c8a466]/25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(232,153,72,0.24),transparent_42%),radial-gradient(circle_at_18%_76%,rgba(185,97,36,0.34),transparent_44%)]" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1380px] flex-col  p-3">
       

          <div className="mt-3 grid flex-1 gap-1 lg:grid-cols-[minmax(0,1fr)_320px]">
            <header className="z-10 m- fixed  flex w-fit items-center justify-between rounded-2xl border border-[#f3eee4]/22 bg-black/42 px-4 py-3 backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-5">
              <p className="font-display text-2xl uppercase tracking-[0.08em] text-[#efe4cf]">
                400 Gradi
              </p>
              <p className="hidden text-[11px] uppercase tracking-[0.24em] text-[#d3b77d] sm:block">
                Corso Italia, Catania
              </p>
            </div>
            <nav aria-label="Home navigation">
              <ul className="flex items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-[#efe4cf]/80">
                <li>
                  <Link href="/menu" className="transition-colors hover:text-[#f8f1e4]">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/drinks" className="transition-colors hover:text-[#f8f1e4]">
                    Drinks
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
            <article className="group relative isolate min-h-[62vh] overflow-hidden rounded-[22px] border border-[#f3eee4]/22 lg:min-h-0">
              <Image
                src="/home-bg.png"
                alt="Sala del ristorante 400 Gradi"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(20,13,8,0.35),rgba(8,7,5,0.82)_72%)]" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#d3b77d]">
                  Contemporary Italian Fire Atelier
                </p>
                <h1 className="mt-4 max-w-[820px] text-5xl font-normal leading-[0.92] text-[#f8f1e4] sm:text-7xl lg:text-8xl">
                  400 Gradi
                </h1>
                <p className="mt-4 text-xl leading-[1.12] text-[#ecdcc2] sm:text-2xl lg:text-[2rem]">
                  Fuoco. Impasto. Tradizione.
                </p>
                <p className="mt-6 max-w-[560px] text-sm leading-relaxed text-[#f3eee4]/76 sm:text-base">
                  Atelier contemporaneo della pizza a Catania: ricerca sugli impasti,
                  qualita delle materie prime e atmosfera urbana, calda, essenziale.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/menu"
                    className="inline-flex items-center justify-center rounded-full border border-[#d7b16f] bg-[#d7b16f] px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-[#16120b] transition-colors hover:bg-transparent hover:text-[#f8f1e4]"
                  >
                    Apri il menu
                  </Link>
                  <Link
                    href="/drinks"
                    className="inline-flex items-center justify-center rounded-full border border-[#f8f1e4]/45 px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-[#f8f1e4] transition-colors hover:border-[#f8f1e4] hover:bg-[#f8f1e4]/10"
                  >
                    Esplora i drinks
                  </Link>
                </div>
              </div>
            </article>

            <aside className="grid gap-1" aria-label="Azioni rapide">
              {railCards.map((card) => {
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group relative isolate block min-h-[160px] overflow-hidden rounded-[18px] border border-[#f3eee4]/22 lg:min-h-0"
                  >
                    <Image
                      src="/home-bg.png"
                      alt="Dettaglio atmosfera 400 Gradi"
                      fill
                      className={`transition-transform duration-500 group-hover:scale-105 ${card.imagePosition}`}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(10,8,6,0.16),rgba(10,8,6,0.9)_85%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[#d3b77d]">
                        {card.subtitle}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="font-display text-2xl text-[#f8f1e4]">
                          {card.title}
                        </p>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#f8f1e4]/45 text-[#f8f1e4] transition-colors group-hover:border-[#d7b16f] group-hover:text-[#d7b16f]">
                          -
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1380px] px-5 pb-14 pt-6 sm:px-8 lg:px-10">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <article className="group relative isolate min-h-[520px] overflow-hidden rounded-[22px] border border-[#f3eee4]/28 lg:min-h-[760px]">
            <Image
              src="/home-bg.png"
              alt="Chef al lavoro nella cucina di 400 Gradi"
              fill
              className="object-cover object-[36%_50%] transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(14,10,8,0.1),rgba(8,7,5,0.92)_82%)]" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <p className="font-display text-6xl uppercase leading-none tracking-[0.06em] text-[#f8f1e4] sm:text-7xl lg:text-8xl">
                About
              </p>
            </div>
          </article>

          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-[18px] border border-[#f3eee4]/35 bg-[#070606] p-6 sm:p-8">
                <h2 className="font-display text-3xl uppercase leading-[1.05] tracking-[0.07em] text-[#f8f1e4] sm:text-[2.15rem]">
                  Sushi Artistry Redefined
                </h2>
                <p className="mt-20 max-w-[32ch] text-sm leading-relaxed text-[#f8f1e4]/84 sm:mt-24 sm:text-base">
                  Where culinary craftsmanship meets modern elegance. Indulge in the finest
                  creations, expertly curated to elevate your dining experience.
                </p>
              </article>

              <article className="group relative isolate min-h-[260px] overflow-hidden rounded-[18px] border border-[#f3eee4]/35">
                <Image
                  src="/home-bg.png"
                  alt="Interno ristorante 400 Gradi"
                  fill
                  className="object-cover object-[63%_30%] transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(12,9,7,0.06),rgba(8,6,5,0.42)_80%)]" />
              </article>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {aboutAwards.map((award) => (
                <article
                  key={award.label}
                  className="rounded-[18px] border border-[#f3eee4]/35 bg-[#070606] px-6 py-8 text-center"
                >
                  <p className="text-[13px] tracking-[0.2em] text-[#f8f1e4]">*****</p>
                  <p className="mt-4 font-display text-3xl uppercase leading-[1.02] text-[#f8f1e4]">
                    {award.label}
                  </p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#f8f1e4]/84">
                    {award.sublabel}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#f8f1e4]/84">
                    {award.city}
                  </p>
                </article>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <article className="group relative isolate min-h-[260px] overflow-hidden rounded-[18px] border border-[#f3eee4]/35">
                <Image
                  src="/home-bg.png"
                  alt="Team cucina 400 Gradi"
                  fill
                  className="object-cover object-[30%_26%] transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(12,9,7,0.14),rgba(8,6,5,0.48)_85%)]" />
              </article>

              <article className="rounded-[18px] border border-[#f3eee4]/35 bg-[#070606] p-7 sm:p-9">
                <p className="font-display text-2xl uppercase tracking-[0.08em] text-[#f8f1e4] sm:text-3xl">
                  Our Story
                </p>
                <p className="mt-10 max-w-[34ch] text-sm leading-relaxed text-[#f8f1e4]/84 sm:text-base">
                  Founded with a passion for culinary excellence, 400 Gradi evolved into a
                  destination for guests who value craftsmanship, seasonal ingredients, and
                  an atmosphere built around warm hospitality.
                </p>
              </article>
            </div>

            <footer className="rounded-[18px] border border-[#f3eee4]/35 bg-[#070606] px-6 py-5 text-center text-[11px] uppercase tracking-[0.2em] text-[#f8f1e4]/84">
              By 400 Gradi | Licensing | Styleguide
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
}

