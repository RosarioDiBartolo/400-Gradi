"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 
import { Button } from "@/components/ui/button";
import ParallaxBg from "@/components/parallax-bg";
 
import { Play } from "lucide-react"; 
import { menuData, type Category } from "@/lib/menu";
import Link from "next/link";
 
 
 


const Category = ({
  category,
}: {
  category: Category;
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
             <Link
              key={item.name}
              href={`/products/${encodeURIComponent(category.name)}/${encodeURIComponent(item.name)}`}
              className="border group shadow shadow-amber-400/0 transition active:shadow-primary/60 text-start  backdrop-blur  backdrop-brightness-75    text-card-foreground rounded-2xl mb-2 overflow-hidden     "
            >
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
            </Link>
           
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
          {menuData.map(category => (
            <TabsTrigger className="h-fit" key={category.name} value={category.name}>
              {category.icon} {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </header>
      <main className=" bg-background/80 p-4 flex-1  relative   overflow-x-hidden overflow-y-auto">
        <ParallaxBg />
        <div>
          {menuData.map( category => (
            <Category
              key={category.name}
              category={category}
            />
          ))}
        </div>
      </main>
        
     </Tabs>
  );
}
