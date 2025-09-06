import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Utensils, Drumstick, ChefHat, Star, ShoppingCart } from "lucide-react";
import type { JSX } from "react";
import { Button } from "@/components/ui/button";
import saladThumbnail from "@/assets/salad.png";
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
 
interface MenuData {
  [key: string]: {
    icon: JSX.Element;
    items: {
      name: string;
      description: string;
      price: string;
    }[];
  };
}
const menuData: MenuData = {
  Antipasti: {
    icon: <Utensils className="h-5 w-5 text-primary inline-block mr-1" />,
    items: [
      {
        name: "Bruschetta Siciliana",
        description: "Pomodoro, basilico e olio EVO",
        price: "5€",
      },
      {
        name: "Arancini",
        description: "Ripieno di ragù e piselli",
        price: "3€",
      },
      {
        name: "Caprese",
        description: "Mozzarella di bufala, pomodoro e basilico",
        price: "6€",
      },
      {
        name: "Carpaccio di Manzo",
        description: "Manzo crudo con rucola e scaglie di parmigiano",
        price: "8€",
      },
      {
        name: "Olive All’Ascolana",
        description: "Olive ripiene fritte",
        price: "4€",
      },
    ],
  },
  Primi: {
    icon: <ChefHat className="h-5 w-5 text-primary inline-block mr-1" />,
    items: [
      {
        name: "Pasta alla Norma",
        description: "Melanzane, ricotta salata e pomodoro",
        price: "8€",
      },
      {
        name: "Gnocchi al Pesto",
        description: "Gnocchi fatti in casa con pesto fresco",
        price: "7€",
      },
      {
        name: "Spaghetti alle Vongole",
        description: "Con vongole fresche e prezzemolo",
        price: "10€",
      },
      {
        name: "Lasagne alla Bolognese",
        description: "Sfoglia fresca, ragù e besciamella",
        price: "9€",
      },
      {
        name: "Risotto ai Funghi Porcini",
        description: "Riso cremoso con porcini freschi",
        price: "11€",
      },
    ],
  },
  Secondi: {
    icon: <Drumstick className="h-5 w-5 text-primary inline-block mr-1" />,
    items: [
      {
        name: "Pesce Spada alla Griglia",
        description: "Servito con contorno di stagione",
        price: "12€",
      },
      {
        name: "Pollo alla Cacciatora",
        description: "Cotto lentamente con pomodoro e olive",
        price: "10€",
      },
      {
        name: "Scaloppine al Limone",
        description: "Vitello tenero al profumo di limone",
        price: "11€",
      },
      {
        name: "Involtini di Melanzane",
        description: "Ripieni di formaggio e prosciutto",
        price: "9€",
      },
      {
        name: "Calamari Fritti",
        description: "Con salsa tartara fatta in casa",
        price: "13€",
      },
    ],
  },
  Dolci: {
    icon: <Star className="h-5 w-5 text-yellow-400 inline-block mr-1" />,
    items: [
      {
        name: "Cannolo Siciliano",
        description: "Crema di ricotta fresca con granella",
        price: "4€",
      },
      {
        name: "Gelato Artigianale",
        description: "Varie gusti di stagione",
        price: "3€",
      },
      {
        name: "Tiramisù",
        description: "Classico con savoiardi e mascarpone",
        price: "5€",
      },
      {
        name: "Cassata Siciliana",
        description: "Pan di spagna, ricotta e frutta candita",
        price: "6€",
      },
      {
        name: "Panna Cotta",
        description: "Con coulis di frutti di bosco",
        price: "4€",
      },
    ],
  },
};


const Category = ({
  category,
}: {
  category: MenuData[string] & { name: string };
}) => (
  <TabsContent value={category.name}>
    <div className="  ">
      <h2 className=" text-3xl  my-4    font-extralight text-secondary-foreground flex items-center justify-between">
        {category.name}{" "}
        <Button className=" relative" size={"icon"} variant={"outline"}>
          {category.icon}
        </Button>
      </h2>
      <div className=" grid grid-cols-2 sm:grid-cols-4 gap-4">
        {category.items.map((item) => (
          <Sheet>
            <SheetTrigger className="border text-start  backdrop-blur  backdrop-brightness-75    text-card-foreground rounded-2xl mb-2 overflow-hidden     ">
              <img src={saladThumbnail} className="  " />
           

              <div className=" min-h-28 p-3 border-t bg-gradient-to-r via-primary/10 ">
                <h3 className="   line-clamp-1 font-semibold text-lg">
                  {item.name}
                </h3>

                <p className=" h-10 text-xs font-extralight text-muted-foreground">
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
                  src={saladThumbnail}
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
      <main className=" bg-background/80 p-8 flex-1  relative   overflow-x-hidden overflow-y-auto">
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
