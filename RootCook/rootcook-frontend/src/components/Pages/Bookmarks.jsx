import React, { useEffect, useState } from "react";
import "./Bookmarks.css";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

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
        console.log(responseData);
        if (Array.isArray(responseData)) {
          setFilteredData(responseData);
        } else if (responseData) {
          setFilteredData([responseData]);
        } else {
          setFilteredData([]);
        }
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
      <h1 id="home-title">Bookmarks</h1>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
