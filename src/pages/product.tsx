import { Button } from "@/components/ui/button";
import { getCategory } from "@/lib/menu";
import { ShoppingCart, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useParams } from "react-router-dom";

function Product() {
  const { category: categoryName, name: productName } = useParams<{
    category: string;
    name: string;
  }>(); // grab the "id" param
  const { scrollY } = useScroll();

  // scale example
  const scale = useTransform(scrollY, [-300, 300], [1.3, 0.8]);

  // brightness example
  const brightness = useTransform(scrollY, [-300, 300], [1.5, 0.2]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  if (!categoryName || !productName) {
    return null;
  }
  const category = getCategory(categoryName);
  const product = category?.items.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );

  return (
    product && (
      <main className=" bg-background flex-1   text-center relative">
        <header></header>
        <div className=" fixed inset-0 z-0 bg-gradient-to-b from-secondary">
          <motion.img
            style={{
              scale,
              filter,
            }}
            src={product.thumbnail}
            className="    w-full    "
          />
        </div>
        <div className="  mt-[45vh] h-screen w-full  bg-secondary/90 p-12 rounded-t-4xl relative">
          <h1 className=" text-4xl font-great-vibes font-extrabold">
            {product.name}
          </h1>

          <h2 className=" italic text-xl text-secondary-foreground font-cinzel ">
            {category?.name}
          </h2>
          <img src={product.thumbnail} className=" h-52 mx-auto   " />
          <p className=" text-muted-foreground font-light text-xs">
            {product.description}
          </p>

            <div className=" space-y-8">
          <h3 className="  text-2xl   ">Ingredienti</h3>
            <ul className=" text-start ms-3 bg-secondary p-4 rounded-3xl">
              <li className=" text-secondary-foreground">
                Condimento
              </li>
              <li className=" text-muted-foreground   ms-3" >
               - Salsa di pomodoro
              </li>
              <li className=" text-muted-foreground ms-3" >
               - Formaggio Fuso
              </li>
              <li className="text-secondary-foreground" >
                Impasto
              </li>
              <li className=" text-muted-foreground   ms-3" >
               - Farina tapioca
              </li>
              <li className=" text-muted-foreground ms-3" >
               - Lievito madre
              </li>
            </ul>  
            <div className=" space-y-4">
            <Button variant={"outline"} className=" w-full">
              Aggiungi recenzione <Star  className=" fill-primary text-primary"/> <Star  className="  text-primary"/>
            </Button>
          <Button className=" w-full">
            Aggiungi al carrello <ShoppingCart />
          </Button> </div>
          </div>
        </div>
      </main>
    )
  );
}

export default Product;
