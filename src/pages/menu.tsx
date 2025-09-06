import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParallaxBg from "@/components/parallax-bg";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "@/components/ui/sheet";

import { Play } from "lucide-react"; 
import { menuData, type MenuData } from "@/lib/menu";
 
 
 


const Category = ({
  category,
}: {
  category: MenuData[string] & { name: string };
}) => (
  <TabsContent value={category.name}>
    <div className="  ">
      <h2 className=" text-3xl font-great-vibes  my-4    font-extralight text-secondary-foreground flex items-center justify-between">
        {category.name}{" "}
        <Button className=" relative" size={"icon"} variant={"outline"}>
          {category.icon}
        </Button>
      </h2>
      <div className=" grid grid-cols-2 sm:grid-cols-4 gap-4">
        {category.items.map((item) => (
          <Sheet>
            <SheetTrigger className="border group shadow shadow-amber-400/0 transition active:shadow-primary/60 text-start  backdrop-blur  backdrop-brightness-75    text-card-foreground rounded-2xl mb-2 overflow-hidden     ">
              <img src={item.thumbnail} className=" h-32 mx-auto object-cover" />
           

              <div className=" min-h-28 p-3 border-t bg-gradient-to-r from-card to-card via-primary/10 ">
                <h3 className=" group-hover:text-primary transition font-great-vibes   line-clamp-1 font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="  font-cinzel  h-10 text-xs font-extralight text-muted-foreground">
                  {item.description}
                </p>
                <span className="text-secondary-foreground font-bold">
                  - {item.price}
                </span>
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className=" ">
              <SheetHeader>
                <SheetTitle>{item.name}</SheetTitle>
                <SheetDescription>{item.description}</SheetDescription>
              </SheetHeader>
              <div className=" p-5 space-y-10">
                <img
                  src={item.thumbnail}
                  className="  rounded-md  max-w-xs mx-auto "
                />
                <Button className=" w-full">
                  Aggiungi al carrello <ShoppingCart />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  </TabsContent>
);
export default function Menu() {
  return (
    <Tabs defaultValue="Antipasti" className="flex-1 gap-0">
      <header className=" z-50 sticky top-0 bg-secondary text-secondary-foreground">
        <div className=" text-muted-foreground text-xs p-4 flex justify-between ">
          <span className="">Menu</span>{" "}
          <button className=" flex items-center gap-2">Ordina per <div className=" flex mt-1"> <Play  className=" size-2 fill fill-muted-foreground rotate-180"/> <Play className=" size-2 fill fill-muted-foreground " /></div>  </button >
        </div>
        <TabsList className="   items-center w-full    overflow-x-auto overflow-y-hidden     py-6 px-2  ">
          {Object.entries(menuData).map(([category, data]) => (
            <TabsTrigger className="h-fit" key={category} value={category}>
              {data.icon} {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </header>
      <main className=" bg-background/80 p-4 flex-1  relative   overflow-x-hidden overflow-y-auto">
        <ParallaxBg />
        <div>
          {Object.entries(menuData).map(([categoryName, data]) => (
            <Category
              key={categoryName}
              category={{ ...data, name: categoryName }}
            />
          ))}
        </div>
      </main>
        
     </Tabs>
  );
}
