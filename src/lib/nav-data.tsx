import { BookOpen, Calendar, Home, Info, MapPin, Menu, Phone, Settings, ShoppingCart, Star, Users, Utensils, Wine } from "lucide-react";

export const navItems =[
  { title: "Home", url: "#" },
  {
    title: "Menù",
    url: "#",
    items: [
      {
        title: "Antipasti",
        description: "Deliziosi piatti per iniziare al meglio",
        icon: <Utensils className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Primi e Secondi",
        description: "Le specialità del nostro chef",
        icon: <Star className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Vini e Bevande",
        description: "Vini selezionati, cocktail e soft drink",
        icon: <Wine className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Dolci",
        description: "Dessert fatti in casa per concludere",
        icon: <BookOpen className="size-5 shrink-0" />,
        url: "#",
      },
    ],
  },
  {
    title: "Prenotazioni",
    url: "#",
    items: [
      {
        title: "Riserva un Tavolo",
        description: "Prenota facilmente online",
        icon: <Calendar className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Eventi Privati",
        description: "Organizza con noi le tue occasioni speciali",
        icon: <Users className="size-5 shrink-0" />,
        url: "#",
      },
    ],
  },
  {
    title: "Chi Siamo",
    url: "#",
    items: [
      {
        title: "La Nostra Storia",
        description: "Passione e tradizione in cucina",
        icon: <Info className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Specialità dello Chef",
        description: "Scopri i piatti consigliati oggi",
        icon: <Star className="size-5 shrink-0" />,
        url: "#",
      },
    ],
  },
  {
    title: "Contatti",
    url: "#",
    items: [
      {
        title: "Chiamaci",
        description: "Per qualsiasi informazione o prenotazione",
        icon: <Phone className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Dove Siamo",
        description: "Indirizzo e orari di apertura",
        icon: <MapPin className="size-5 shrink-0" />,
        url: "#",
      },
    ],
  },
]

export const footerNavItems =[
  { title: "Home", url: "/" , icon: <Home />},
  { title: "Menu", url: "/menu" , icon: <Menu/>},
    { title: "Carrello", url: "/cart" , icon: <ShoppingCart/>},

  { title: "Settings", url: "/settings" , icon: <Settings/>},
  
   
]