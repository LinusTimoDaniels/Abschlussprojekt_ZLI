import React, { useEffect, useState } from "react";
import "./Recipe.css";
import Cookies from "js-cookie";

export const Recipe = ({ recipe, setRecipe }) => {
  const [userId, setUserId] = useState();
  const [token, setToken] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const fetchUser = () => {
    const cookie = Cookies.get("jwt");
    const token = JSON.parse(localStorage.getItem("login"));

    return fetch(`http://127.0.0.1:8080/user?jwt=${cookie}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setUserId(responseData[0].id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getBookmark = () => {
    setToken(JSON.parse(localStorage.getItem("login")));
    console.log("useriddddd", userId);
    fetch(`http://127.0.0.1:8080/bookmarks?user=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Bookmarks:", responseData);
        setIsBookmarked(
          responseData.some((item) => item.User_id === recipe.id)
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const addBookmark = () => {
    const token = JSON.parse(localStorage.getItem("login"));

    fetch("http://127.0.0.1:8080/bookmarks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
        recipe: recipe.id,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData:", responseData);
        setIsBookmarked(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchUser().then(() => getBookmark());
  }, []);

  useEffect(() => {
    fetchUser().then(() => getBookmark());
  }, [token]);

  return (
    <div className="recipe-container-container">
      <h1 className="recipe-title-1">{recipe.title}</h1>
      <div className="recipe-container">
        <div>
          <img
            className="recipe-image-1"
            src={recipe.image}
            alt="Image of Recipe"
          />
        </div>
        <div className="recipe-description-1">
          <h3>{recipe.description}</h3>
          <ul className="recipe-ingredients-list">
            <li>Calories: {recipe.calories}</li>
            <li>Protein: {recipe.protein} g</li>
            <li>Fibres: {recipe.fibres} g</li>
            <li>Fat: {recipe.fat} g</li>
            <li>Sugar: {recipe.sugar} g</li>
          </ul>
        </div>
        <div>
          <button
            className={`bookmarks-btn ${isBookmarked ? "bookmarked" : ""}`}
            onClick={isBookmarked ? null : addBookmark}
            disabled={isBookmarked}
          >
            {isBookmarked ? "Bookmarked" : "Bookmark"}
            {isBookmarked ? console.log("true") : console.log("false")}
          </button>
        </div>
        <div>
          <p>{recipe.instructions}</p>
        </div>
        <div>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};
