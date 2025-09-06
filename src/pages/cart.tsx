import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategory } from "@/lib/menu";
import type { ProductReference } from "@/lib/types";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
 

const Order = ({
  productRef: { categoryName, productName },
}: {
  productRef: ProductReference
}) => {

  const category = getCategory(categoryName)
  const product = category?.items.find(p=>p.name === productName)
  console.log({category, product})
  return (
    product && (
      <div className=" rounded-3xl   p-4 relative">
        <Badge className=" top-0 -translate-y-1/2 left-4   absolute px-4 font-bold  ">
          {product.price}
        </Badge>
        <img className=" h-44 mx-auto object-cover" src={product.thumbnail} />
        <h3 className=" text-primary font-cinzel">{category?.name}</h3>
        <h2 className=" text-xl font-great-vibes font-bold">{product.name}</h2>

        <hr className=" my-2" />
      </div>
    )
  );
};
function Cart() {
  const navigate = useNavigate();

  return (
    <>
      <header className=" bg-background sticky top-0 backdrop-blur-md z-50 text-foreground p-5 flex items-center gap-5">
        <ChevronLeft
          onClick={() => navigate(-1)}
          size={28}
          strokeWidth={1.25}
          absoluteStrokeWidth
        />{" "}
        <h1 className=" text-2xl flex items-center gap-3">
          <ShoppingCart /> Carrello{" "}
        </h1>
      </header>
      <main className=" flex-1 bg-background   p-5">
        <Card className="text-center rounded-3xl border-0">
          <CardHeader>
            <CardTitle>Sommario ordini</CardTitle>
          </CardHeader>
          <CardContent>
            <Order
              productRef={{
                categoryName: "Antipasti",
                productName: "Bruschetta Siciliana",
              }}
            />
            <Order
              productRef={{
                categoryName: "Primi",
                productName: "Pasta alla Norma",
              }}
            />
            <Order
              productRef={{
                categoryName: "Primi",
                productName: "Gnocchi al Pesto",
              }}
            />
          </CardContent>

          <CardFooter>
            <Button variant={"secondary"} size={"xl"} className=" rounded-full w-full">
              Vai al pagamento <ShoppingCart />
            </Button>
          </CardFooter>
        </Card>
      </main>{" "}
    </>
  );
}

export default Cart;
