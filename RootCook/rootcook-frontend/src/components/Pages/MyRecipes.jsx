import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import "./MyRecipes.css";
import swal from "sweetalert";
import { Recipe } from "./Recipe";

export const MyRecipes = ({ setRecipe }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const cookie = Cookies.get("jwt");
        const token = JSON.parse(localStorage.getItem("login"));

        const response = await fetch(
          `http://127.0.0.1:8080/user?jwt=${cookie}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 403) {
          throw new Error("You need to login");
        }

        const responseData = await response.json();
        setUserId(responseData[0].id);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.message === "You need to login") {
          swal("info", `Error fetching user data: ${error.message}`, "info");
        }
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      getRecipes();
    }
  }, [userId, token]);

  const getRecipes = async () => {
    try {
      setToken(JSON.parse(localStorage.getItem("login")));
      const response = await fetch(
        `http://127.0.0.1:8080/recipe?user=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      setFilteredData(responseData);
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      setToken(JSON.parse(localStorage.getItem("login")));
      const response = await fetch(
        `http://127.0.0.1:8080/recipe?recipe=${recipeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        swal("DELETED", "You have successfully deleted the recipe", "success");
        // Fetch recipes again to get the updated list
        getRecipes();
      } else {
        throw new Error("Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      swal("Failed", `Failed to delete recipe: ${error.message}`, "error");
    }
  };

  return (
    <div>
      <h1 id="home-title">My Recipes</h1>
      <NavLink exact to={"/addrecipe"}>
        <button className="add-recipe-btn">Add Recipe</button>
      </NavLink>
      <div className="placeholder">
        {/* Renders the filtered data */}
        {filteredData.map((recipe, index) => (
          <div key={index} className="recipe-item">
            <h3 className="recipe-title">{recipe.title}</h3>
            <img
              src={recipe.image}
              className="recipe-image"
              alt={recipe.title}
            />
            <div className="btn-container">
              <NavLink
                className="more-btn-link"
                exact
                to="/recipe"
                onClick={() => {
                  setRecipe({
                    id: recipe.id,
                    title: recipe.title,
                    description: recipe.description,
                    image: recipe.image,
                    instructions: recipe.instructions,
                    calories: recipe.calories,
                    protein: recipe.protein,
                    fat: recipe.fat,
                    fibres: recipe.fibres,
                    sugar: recipe.sugar,
                    published: recipe.published,
                    userid: recipe.user_id,
                    categorieid: recipe.categorie_id,
                    mealtypeid: recipe.meal_type_id,
                    mealtype: recipe.type,
                  });
                }}
              >
                <button className="more-btn">More</button>
              </NavLink>
              <NavLink className="more-btn-link">
                <button className="more-btn">Edit</button>
              </NavLink>
              <NavLink className="more-btn-link">
                <button
                  className="more-btn"
                  onClick={() => deleteRecipe(recipe.id)}
                >
                  DELETE
                </button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
