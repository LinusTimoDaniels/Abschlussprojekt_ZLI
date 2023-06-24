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
import { Recipe } from "./components/Pages/Recipe";
import { AddRecipe } from "./components/Pages/AddRecipe";

function App() {
  const [currentForm, setCurrentFrom] = useState("login");

  const [user, setUser] = useState("");

  const [recipe, setRecipe] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    instructions: "",
    calories: "",
    protein: "",
    fat: "",
    fibres: "",
    sugar: "",
    published: "",
    userid: "",
    categorieid: "",
    mealtypeid: "",
    mealtype: "",
  });

  const toggleForm = (formName) => {
    setCurrentFrom(formName);
  };

  return (
    <>
      <Router>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                <Home user={user} setUser={setUser} setRecipe={setRecipe} />
              }
            />
            <Route
              path="/myrecipes"
              element={
                <MyRecipes
                  user={user}
                  setUser={setUser}
                  setRecipe={setRecipe}
                />
              }
            />
            <Route
              path="/nutritionplan"
              element={<Nutritionplan user={user} setUser={setUser} />}
            />
            <Route
              path="/bookmarks"
              element={
                <Bookmarks
                  user={user}
                  setUser={setUser}
                  recipe={recipe}
                  setRecipe={setRecipe}
                />
              }
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
            <Route
              path="/recipe"
              element={
                <Recipe
                  recipe={recipe}
                  setRecipe={setRecipe}
                  user={user}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/addrecipe"
              element={
                <AddRecipe
                  recipe={recipe}
                  setRecipe={setRecipe}
                  user={user}
                  setUser={setUser}
                />
              }
            />
          </Routes>
        </div>

        <Footer />
      </Router>
    </>
  );
}

export default App;
