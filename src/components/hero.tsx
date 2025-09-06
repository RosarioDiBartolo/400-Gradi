 import { Button } from "./ui/button";
import { Pizza, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="hero"
      className="text-center max-w-3xl px-4  flex flex-col items-center pt-10 "
    >
      {/* Titolo piccolo con icona */}
      <h1 className="text-2xl   font-great-vibes flex items-center gap-2 justify-center">
        <Pizza className="h-6 w-6 text-primary" />
        La migliore pizzeria di Catania
      </h1>
      {/* Titolo principale */}
      <h2 className="text-secondary-foreground text-3xl md:text-6xl font-cinzel font-bold leading-tight">
        La Sicilia Gourmet...
      </h2>

      {/* Logo */}
      <img
        src="/logo.png"
        alt="Logo 400 Gradi"
        className="max-w-xs md:max-w-sm w-full my-2"
      />

      {/* Sottotitolo */}
      <p className="font-sans font-light text-muted-foreground text-xl mb-6 max-w-2xl">
        <Star className="inline-block h-5 w-5 text-yellow-500 mr-1" />
        Utilizziamo solo ingredienti di qualità a cinque stelle per il nostro
        menù. Vieni a gustare la ricchezza in ogni piatto che serviamo.
      </p>

      {/* Call to action */}
      <Button asChild size="xl" className="font-serif flex items-center gap-2">
        <Link to={"/menu"}> 
        Vai al menù
        <MapPin className="h-5 w-5" />
        </Link>
      </Button>
    </section>
  );
}

export default Hero;
