import React, { useEffect, useState } from "react";
import "./Recipe.css";
import Cookies from "js-cookie";
import swal from "sweetalert";

export const Recipe = ({ recipe }) => {
  const [userId, setUserId] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(null);
  const [ingredient, setIngredient] = useState({});

  useEffect(() => {
    console.log(isBookmarked);
  }, [isBookmarked]);

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
    const fetchIngredient = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("login"));

        const response = await fetch(
          `http://127.0.0.1:8080/ingredients?recipe=${recipe.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = await response.json();
        setIngredient(responseData);
        console.log(ingredient);
      } catch (error) {
        console.error("Error fetching ingredients data:", error);
      }
    };

    fetchIngredient();
  }, [recipe]);

  useEffect(() => {
    const getBookmark = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("login"));
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
        setIsBookmarked(responseData.some((item) => item.id === recipe.id));
        console.log("recipeid", recipe.id);
        console.log("bookmarks", responseData);
        console.log("userid", userId);
      } catch (error) {
        console.error("Error fetching bookmark data:", error);
      }
    };

    if (userId) {
      getBookmark();
    }
  }, [userId]);

  useEffect(() => {
    if (recipe && isBookmarked === null) {
      setIsBookmarked(recipe.isBookmarked);
    }
  }, [recipe]);

  const addBookmark = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("login"));
      await fetch("http://127.0.0.1:8080/bookmarks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userId,
          recipe: recipe.id,
        }),
      });
      setIsBookmarked(true);
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const deleteBookmark = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("login"));
      await fetch("http://127.0.0.1:8080/bookmarks", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userId,
          recipe: recipe.id,
        }),
      });
      setIsBookmarked(false);
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  const handleBookmark = () => {
    try {
      if (userId) {
        if (isBookmarked) {
          deleteBookmark();
        } else {
          addBookmark();
        }
      } else {
        throw new Error("You need to login");
      }
    } catch (error) {
      swal("info", `Error, edditing bookmark ${error.message}`, "info");
    }
  };

  return (
    <div className="recipe-container-container">
      <h1 className="recipe-title-1">{recipe.title}</h1>
      <div className="recipe-container">
        <div className="recipe-image-1-container">
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
        <div className="recipe-mealtype">
          <h3>{recipe.mealtype}</h3>
        </div>
        <div className="bookmarks-btn-container">
          <button
            className={`bookmarks-btn ${
              isBookmarked === null ? "" : isBookmarked ? "bookmarked" : ""
            }`}
            onClick={handleBookmark}
          >
            {isBookmarked === null
              ? "Loading..."
              : isBookmarked
              ? "delete Bookmark"
              : "Bookmark"}
          </button>
        </div>
        <div className="recipe-instructions-1">
          <div className="recipe-instructions">
            <p>{recipe.instructions}</p>
          </div>
        </div>
        <div className="recipe-ingredients">
          <ul>
            {Object.keys(ingredient).map((item, index) => (
              <li key={index}>
                {ingredient[item].name} {ingredient[item].amount}
                {console.log(ingredient[item].name, recipe.mealtype)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
