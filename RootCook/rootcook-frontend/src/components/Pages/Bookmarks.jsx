import React, { useEffect, useState } from "react";
import "./Bookmarks.css";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

export const Bookmarks = ({ setRecipe }) => {
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
        const responseData = await response.json();
        setUserId(responseData[0].id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const getBookmark = async () => {
      try {
        setToken(JSON.parse(localStorage.getItem("login")));
        const response = await fetch(
          `http://127.0.0.1:8080/bookmarks?user=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        setFilteredData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      getBookmark();
    }
  }, [userId, token]);

  return (
    <div>
      <h1>Bookmarks</h1>
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
          </div>
        ))}
      </div>
    </div>
  );
};
