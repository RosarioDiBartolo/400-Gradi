// App.jsx
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
 
export default function App() {
  return (
    <> 
       <Outlet />
       <Footer/>
      </>
   );
}
