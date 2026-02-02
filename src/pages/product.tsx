import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/lib/menu";
import {   ChevronLeft, ShoppingCart, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link, useParams, useSearchParams } from "react-router-dom";

function Product() {
  const { category: categoryName, name: productName } = useParams<{
    category: string;
    name: string;
  }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const table = Number(searchParams.get("table"))
  

  const { scrollY } = useScroll();

  // Motion transforms
  const scale = useTransform(scrollY, [-300, 300], [1.3, 0.8]);
  const brightness = useTransform(scrollY, [-300, 300], [1.5, 0.2]);
    const contentBrightness = useTransform(scrollY, [0, 100], [ 0.5,1]);

  const filter = useTransform(brightness, (b) => `brightness(${b})`);
  const contentFilter = useTransform(contentBrightness, (b) => `brightness(${b})`);

  if (!categoryName || !productName)
    return <p className="text-center mt-10">Prodotto non trovato.</p>;

  const category = getCategory(categoryName);
  const product = category?.items.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );

  if (!product)
    return <p className="text-center mt-10">Prodotto non disponibile.</p>;

  return (
    <main className="bg-background flex-1 relative">
      {/* Hero image */}
      <div className="sticky top-0 z-0 bg-gradient-to-b from-secondary">
        <motion.img
          src={product.thumbnail}
          alt={product.name}
          style={{ scale, filter }}
          className="w-full h-[40vh] object-cover object-top"
          loading="lazy"
        />
      </div>

      {/* Product details */}
      <motion.div 
      style={{filter: contentFilter}}
      className="bg-secondary text-center p-8 md:p-12 rounded-t-4xl relative">
        <header className="  space-y-2">
          <Button variant={"link"} asChild>
            <Link className=" !block" to={"/menu"}>
              <ChevronLeft className=" size-6" />
            </Link>
          </Button>
          <h1 className="text-4xl font-great-vibes font-extrabold">
            {product.name}
          </h1>
          <h2 className="italic text-xl text-secondary-foreground font-cinzel">
            {category?.name}
          </h2>
        </header>

        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-52 mx-auto my-6 aspect-square object-cover outline rounded-full "
        />

        <p className="text-muted-foreground font-light text-sm leading-relaxed max-w-prose mx-auto">
          {product.description}
        </p>

        <section className="mt-10 space-y-8">
          {/* Ingredients */}
          <div>
            <h3 className="text-2xl text-primary font-semibold mb-4">
              Ingredienti
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {product.ingredients.map((item, index) => (
                <Badge key={index} className="font-bold" variant="default">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              Aggiungi recensione <Star className="fill-primary text-primary" />
            </Button>
            <Button
               asChild
              className="w-full flex items-center justify-center gap-2"
            >
              <Link to="/cart">
                Aggiungi al carrello <ShoppingCart />
              </Link>
            </Button>
          </div>
        </section>
      </motion.div>
    </main>
  );
}

export default Product;
