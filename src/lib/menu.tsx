import { ChefHat, Drumstick, Star, Utensils } from "lucide-react";
import type { JSX } from "react";

import saladThumbnail from "@/assets/salad.png";
import asparagusSaladThumbnail from "@/assets/asparagus.png";
import coffeThumbnail from "@/assets/coffe.png";
import burgerThumbnail from "@/assets/burger.png";
import pizzaThumbnail from "@/assets/pizza.png";
 
export type Product  = {
      thumbnail: string;
      name: string;
      description: string;
      price: string;
    }
export interface Category {
    name: string;
    icon: JSX.Element;
    items: Product []
 
}
  

const thumbnails = [
  saladThumbnail,
  asparagusSaladThumbnail,
  coffeThumbnail,
  burgerThumbnail,
  pizzaThumbnail,
];

function getRandomThumbnail() {
  return thumbnails[Math.floor(Math.random() * thumbnails.length)];
}


export const getCategory = ( name: string)=>(
  menuData.find( c => c.name.toLowerCase() === name.toLowerCase())
)


export const menuData: Category[] = [
    {
    name: "Antipasti",
    icon: <Utensils className="h-5 w-5 text-primary inline-block mr-1" />,
    items: [
      {
        name: "Bruschetta Siciliana",
        description: "Pomodoro, basilico e olio EVO",
        price: "5€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Arancini",
        description: "Ripieno di ragù e piselli",
        price: "3€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Caprese",
        description: "Mozzarella di bufala, pomodoro e basilico",
        price: "6€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Carpaccio di Manzo",
        description: "Manzo crudo con rucola e scaglie di parmigiano",
        price: "8€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Olive All’Ascolana",
        description: "Olive ripiene fritte",
        price: "4€",
        thumbnail: getRandomThumbnail(),
      },
    ],
  }, {
          name: "Primi",

    icon: <ChefHat className="h-5 w-5 text-primary inline-block mr-1" />,
    items: [
      {
        name: "Pasta alla Norma",
        description: "Melanzane, ricotta salata e pomodoro",
        price: "8€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Gnocchi al Pesto",
        description: "Gnocchi fatti in casa con pesto fresco",
        price: "7€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Spaghetti alle Vongole",
        description: "Con vongole fresche e prezzemolo",
        price: "10€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Lasagne alla Bolognese",
        description: "Sfoglia fresca, ragù e besciamella",
        price: "9€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Risotto ai Funghi Porcini",
        description: "Riso cremoso con porcini freschi",
        price: "11€",
        thumbnail: getRandomThumbnail(),
      },
    ],
  },
   {
          name: "Secondi",

    icon: <Drumstick className="h-5 w-5 text-primary inline-block mr-1" />,
    items: [
      {
        name: "Pesce Spada alla Griglia",
        description: "Servito con contorno di stagione",
        price: "12€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Pollo alla Cacciatora",
        description: "Cotto lentamente con pomodoro e olive",
        price: "10€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Scaloppine al Limone",
        description: "Vitello tenero al profumo di limone",
        price: "11€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Involtini di Melanzane",
        description: "Ripieni di formaggio e prosciutto",
        price: "9€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Calamari Fritti",
        description: "Con salsa tartara fatta in casa",
        price: "13€",
        thumbnail: getRandomThumbnail(),
      },
    ],
  },
   {
    name: "Dolci",
    icon: <Star className="h-5 w-5 text-yellow-400 inline-block mr-1" />,
    items: [
      {
        name: "Cannolo Siciliano",
        description: "Crema di ricotta fresca con granella",
        price: "4€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Gelato Artigianale",
        description: "Varie gusti di stagione",
        price: "3€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Tiramisù",
        description: "Classico con savoiardi e mascarpone",
        price: "5€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Cassata Siciliana",
        description: "Pan di spagna, ricotta e frutta candita",
        price: "6€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Panna Cotta",
        description: "Con coulis di frutti di bosco",
        price: "4€",
        thumbnail: getRandomThumbnail(),
      },
    ],
  },
];
