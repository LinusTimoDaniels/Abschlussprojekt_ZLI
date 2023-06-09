import "./App.css";
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { About } from "./components/Pages/About";
import { Blog } from "./components/Pages/Blog";
import { Contact } from "./components/Pages/Contact";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myrecipes" element={<About />} />
            <Route path="/nutritionplan" element={<Blog />} />
            <Route path="/bookmarks" element={<Contact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Contact />} />
          </Routes>
        </div>

        <Footer/>

      </Router>
  </>
  );
}

export default App;
