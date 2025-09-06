import { Navbar } from "@/components/ui/navbar";
import { navItems } from "@/lib/nav-data";
 
 
const logo = {
  url: "/", // Sito ufficiale
  src: "/logo.png", // Usare il logo ufficiale (da sostituire con URL corretto)
  alt: "Logo di 400 Gradi Sicilia Gourmet",
  title: "400 Gradi Sicilia Gourmet"
}
function Header() {
  return (
    <header className=" px-5 z-50   border-secondary-foreground    sticky top-0    bg-gradient-to-br from-background via-background to-background text-secondary-foreground   ">
      <Navbar menu={navItems} logo={logo}/>
      {/* <Button
        className=" absolute right-0 top-7 hidden md:inline-flex "
        variant={"hover-glow"}
      >
        Prenotazioni
      </Button> */}
    </header>
  );
}

export default Header;
