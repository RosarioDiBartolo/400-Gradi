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
      ingredients: string[];
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
        ingredients: ["Pane tostato", "Pomodori maturi", "Basilico fresco", "Olio extravergine d'oliva", "Aglio", "Sale"],
        price: "5€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Arancini",
        description: "Ripieno di ragù e piselli",
        ingredients: ["Riso", "Ragù di carne", "Piselli", "Mozzarella", "Uova", "Pangrattato", "Olio per friggere"],
        price: "3€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Caprese",
        description: "Mozzarella di bufala, pomodoro e basilico",
        ingredients: ["Mozzarella di bufala", "Pomodori freschi", "Basilico", "Olio extravergine d'oliva", "Sale"],
        price: "6€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Carpaccio di Manzo",
        description: "Manzo crudo con rucola e scaglie di parmigiano",
        ingredients: ["Carne di manzo", "Rucola", "Parmigiano a scaglie", "Olio extravergine d'oliva", "Limone", "Sale", "Pepe"],
        price: "8€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Olive All’Ascolana",
        description: "Olive ripiene fritte",
        ingredients: ["Olive verdi grandi", "Carne macinata", "Pane grattugiato", "Uova", "Farina", "Olio per friggere"],
        price: "4€",
        thumbnail: getRandomThumbnail(),
      },
    ],
  },
  {
    name: "Primi",
    icon: <ChefHat className="h-5 w-5 text-primary inline-block mr-1" />,
    items: [
      {
        name: "Pasta alla Norma",
        description: "Melanzane, ricotta salata e pomodoro",
        ingredients: ["Pasta", "Melanzane", "Pomodori pelati", "Ricotta salata", "Basilico", "Olio EVO"],
        price: "8€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Gnocchi al Pesto",
        description: "Gnocchi fatti in casa con pesto fresco",
        ingredients: ["Patate", "Farina", "Uova", "Basilico", "Pinoli", "Aglio", "Parmigiano", "Olio EVO"],
        price: "7€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Spaghetti alle Vongole",
        description: "Con vongole fresche e prezzemolo",
        ingredients: ["Spaghetti", "Vongole veraci", "Aglio", "Olio EVO", "Prezzemolo", "Peperoncino (facoltativo)"],
        price: "10€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Lasagne alla Bolognese",
        description: "Sfoglia fresca, ragù e besciamella",
        ingredients: ["Pasta fresca all’uovo", "Ragù di carne", "Besciamella", "Parmigiano", "Mozzarella"],
        price: "9€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Risotto ai Funghi Porcini",
        description: "Riso cremoso con porcini freschi",
        ingredients: ["Riso Carnaroli", "Funghi porcini", "Brodo vegetale", "Burro", "Parmigiano", "Cipolla", "Prezzemolo"],
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
        ingredients: ["Filetto di pesce spada", "Olio EVO", "Limone", "Prezzemolo", "Sale", "Pepe"],
        price: "12€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Pollo alla Cacciatora",
        description: "Cotto lentamente con pomodoro e olive",
        ingredients: ["Pollo", "Pomodori pelati", "Olive nere", "Vino rosso", "Aglio", "Rosmarino", "Olio EVO"],
        price: "10€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Scaloppine al Limone",
        description: "Vitello tenero al profumo di limone",
        ingredients: ["Fettine di vitello", "Farina", "Burro", "Limone", "Sale", "Pepe"],
        price: "11€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Involtini di Melanzane",
        description: "Ripieni di formaggio e prosciutto",
        ingredients: ["Melanzane", "Prosciutto cotto", "Formaggio filante", "Parmigiano", "Olio EVO"],
        price: "9€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Calamari Fritti",
        description: "Con salsa tartara fatta in casa",
        ingredients: ["Calamari freschi", "Farina", "Olio per friggere", "Limone", "Maionese", "Capperi", "Cetriolini"],
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
        ingredients: ["Cialda croccante", "Ricotta di pecora", "Zucchero", "Scorza d’arancia candita", "Granella di pistacchio o cioccolato"],
        price: "4€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Gelato Artigianale",
        description: "Varie gusti di stagione",
        ingredients: ["Latte fresco", "Panna", "Zucchero", "Uova", "Frutta o cioccolato a seconda del gusto"],
        price: "3€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Tiramisù",
        description: "Classico con savoiardi e mascarpone",
        ingredients: ["Savoiardi", "Caffè", "Mascarpone", "Uova", "Zucchero", "Cacao amaro"],
        price: "5€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Cassata Siciliana",
        description: "Pan di spagna, ricotta e frutta candita",
        ingredients: ["Pan di Spagna", "Ricotta di pecora", "Zucchero", "Frutta candita", "Glassa di zucchero", "Cioccolato"],
        price: "6€",
        thumbnail: getRandomThumbnail(),
      },
      {
        name: "Panna Cotta",
        description: "Con coulis di frutti di bosco",
        ingredients: ["Panna fresca", "Zucchero", "Gelatina", "Vaniglia", "Frutti di bosco"],
        price: "4€",
        thumbnail: getRandomThumbnail(),
      },
    ],
  },
];

