import React, { useEffect, useState } from "react";
import "./Bookmarks.css";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

export const Bookmarks = ({ recipe, setRecipe }) => {
  const [USERID, setUSERID] = useState("");
  const [token, setToken] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchUser = () => {
    const cookie = Cookies.get("jwt");
    const storedToken = JSON.parse(localStorage.getItem("login"));

    fetch(`http://127.0.0.1:8080/user?jwt=${cookie}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        const userId = responseData[0].id;
        setUSERID(userId);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const getBookmark = () => {
    setToken(JSON.parse(localStorage.getItem("login")));
    console.log(USERID);
    fetch(`http://127.0.0.1:8080/bookmarks?user=${USERID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Bookmarks:", responseData);
        setFilteredData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchUser();
    getBookmark();
  }, []);

  useEffect(() => {
    if (USERID) {
      getBookmark();
    }
  }, [USERID]);

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
                  USERID: recipe.user_id,
                  categorieid: recipe.categorie_id,
                  mealtypeid: recipe.meal_type_id,
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
