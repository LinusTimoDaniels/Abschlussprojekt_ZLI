import "./App.css";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Nutritionplan } from "./components/Pages/Nutritionplan";
import { MyRecipes } from "./components/Pages/MyRecipes";
import { Contact } from "./components/Pages/Contact";
import { Bookmarks } from "./components/Pages/Bookmarks";
import { Login } from "./components/Pages/Login";
import { Register } from "./components/Pages/Register";

function App() {
  const [currentForm, setCurrentFrom] = useState("login");

  const [user, setUser] = useState('');

  const toggleForm = (formName) => {
    setCurrentFrom(formName);
  };

  return (
    <>
      <Router>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            <Route
              path="/myrecipes"
              element={<MyRecipes user={user} setUser={setUser} />}
            />
            <Route
              path="/nutritionplan"
              element={<Nutritionplan user={user} setUser={setUser} />}
            />
            <Route
              path="/bookmarks"
              element={<Bookmarks user={user} setUser={setUser} />}
            />
            <Route
              path="/contact"
              element={<Contact user={user} setUser={setUser} />}
            />
            <Route path="/login">
              <Route
                path="/login"
                element={
                  currentForm === "login" ? (
                    <Login
                      onFormSwitch={toggleForm}
                      user={user}
                      setUser={setUser}
                    />
                  ) : (
                    <Register
                      onFormSwitch={toggleForm}
                      user={user}
                      setUser={setUser}
                    />
                  )
                }
              />
            </Route>
          </Routes>
        </div>

        <Footer />
      </Router>
    </>
  );
}

export default App;
