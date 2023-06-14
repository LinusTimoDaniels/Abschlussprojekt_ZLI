import "./App.css";
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Nutritionplan } from "./components/Pages/Nutritionplan";
import { MyRecipes } from "./components/Pages/MyRecipes";
import { Contact } from "./components/Pages/Contact";
import { Bookmarks } from "./components/Pages/Bookmarks";
import { Login } from "./components/Pages/Login";


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myrecipes" element={<MyRecipes />} />
            <Route path="/nutritionplan" element={<Nutritionplan />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <Footer/>

      </Router>
  </>
  );
}

export default App;
