import React, { useEffect } from "react";
import { useState } from "react";
import "./AddRecipe.css";
import swal from "sweetalert";
import Cookies from "js-cookie";

export const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [instructions, setInstructions] = useState("");
  const [calories, setCalories] = useState(1);
  const [protein, setProtein] = useState(1);
  const [fibres, setFibres] = useState(1);
  const [fat, setFat] = useState(1);
  const [sugar, setSugar] = useState(1);
  const [published, setPublished] = useState(false);
  const [categorie, setCategorie] = useState("1");
  const [mealtype, setMealtype] = useState("1");
  const [userId, setUserId] = useState(null);
  const [ingredient, setIngredient] = useState({});
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    console.log("showDiv:", showDiv);
  }, [showDiv]);

  useEffect(() => {
    console.log("Calories:", calories);
  }, [calories]);

  useEffect(() => {
    console.log("Protein:", protein);
  }, [protein]);

  useEffect(() => {
    console.log("Fibres:", fibres);
  }, [fibres]);

  useEffect(() => {
    console.log("Fat:", fat);
  }, [fat]);

  useEffect(() => {
    console.log("Sugar:", sugar);
  }, [sugar]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    postRecipe(); // Fetches the data again when the form is submitted
  };

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("login"));

        const response = await fetch(`http://127.0.0.1:8080/ingredients/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        setIngredient(responseData);
        console.log("ingredients", responseData);
      } catch (error) {
        console.error("Error fetching ingredients data:", error);
      }
    };

    fetchIngredient();
  }, []);

  const postRecipe = () => {
    const recipeData = {
      title: title,
      description: description,
      image: image,
      instructions: instructions,
      calories: calories,
      protein: protein,
      fibres: fibres,
      fat: fat,
      sugar: sugar,
      published: published,
      categorie: categorie,
      mealtype: mealtype,
      userId: userId,
    };

    const token = JSON.parse(localStorage.getItem("login"));

    fetch("http://127.0.0.1:8080/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error posting recipe");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        swal("success", "You have successfully added a recipe!", "success");
        // Perform any additional actions or handle the response here
        setTimeout(() => {
          /* window.location = "http://127.0.0.1:3000/myrecipes"; */
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
        swal(
          "error",
          `Error posting recipe, please make sure to fill out all the fields! ${error.message}`,
          "error"
        );
        // Handle any errors that occur during the request
      });
  };

  return (
    <div>
      <h1 id="home-title">AddRecipe</h1>
      <div className="addrecipe-container-container">
        <form className="addrecipe-container">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            name="instructions"
            id="instructions"
            rows="10"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
          <div className="nutritional-values">
            <div className="calories-div">
              <label htmlFor="calories">Calories:</label>
              <input
                type="range"
                min="1"
                max="1000"
                id="calories"
                name="calories"
                className="slider"
                value={calories}
                onChange={(e) => setCalories(parseInt(e.target.value))}
              />
              <span className="slider-value">{calories}</span>
            </div>
            <div className="protein-div">
              <label htmlFor="protein">Protein:</label>
              <input
                type="range"
                min="1"
                max="1000"
                id="protein"
                name="protein"
                className="slider"
                value={protein}
                onChange={(e) => setProtein(parseInt(e.target.value))}
              />
              <span className="slider-value">{protein}</span>
            </div>
            <div className="fibres-div">
              <label htmlFor="fibres">Fibres:</label>
              <input
                type="range"
                min="1"
                max="1000"
                id="fibres"
                name="fibres"
                className="slider"
                value={fibres}
                onChange={(e) => setFibres(parseInt(e.target.value))}
              />
              <span className="slider-value">{fibres}</span>
            </div>
            <div className="fat-div">
              <label htmlFor="fat">Fat:</label>
              <input
                type="range"
                min="1"
                max="1000"
                id="fat"
                name="fat"
                className="slider"
                value={fat}
                onChange={(e) => setFat(parseInt(e.target.value))}
              />
              <span className="slider-value">{fat}</span>
            </div>
            <div className="sugar-div">
              <label htmlFor="sugar">Sugar:</label>
              <input
                type="range"
                min="1"
                max="1000"
                id="sugar"
                name="sugar"
                className="slider"
                value={sugar}
                onChange={(e) => setSugar(parseInt(e.target.value))}
              />
              <span className="slider-value">{sugar}</span>
            </div>
          </div>
          <label htmlFor="published">Do you want to publish this Recipe?</label>
          <select
            name="published"
            id="published"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          >
            <option value="1">No</option>
            <option value="0">Yes</option>
          </select>
          <label htmlFor="categorie">Categorie:</label>
          <select
            name="categorie"
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option value="1">Vegan</option>
            <option value="2">Vegetarian</option>
            <option value="3">Meat</option>
            <option value="4">Fish</option>
          </select>
          <label htmlFor="mealtype">Mealtype:</label>
          <select
            name="mealtype"
            id="mealtype"
            value={mealtype}
            onChange={(e) => setMealtype(e.target.value)}
          >
            <option value="1">Breakfast</option>
            <option value="2">Lunch</option>
            <option value="3">Dinner</option>
            <option value="4">Snacks</option>
            <option value="5">Dessert</option>
          </select>
          <label htmlFor="ingredients">Ingredients:</label>
          <div className="ingredients-div">
            <input
              type="text"
              name="ingredients"
              id="ingredients"
              onFocus={() => setShowDiv(true)}
              onBlur={() => setShowDiv(false)}
            />
            <button>Add</button>
          </div>
          <div
            className={`${
              showDiv
                ? "ingredients-div-search-show"
                : "ingredients-div-search-hide"
            } ingredients-div-search`}
          >hallo</div>
          <div className="ingredients-div-list">
            {Object.values(ingredient).map((item, index) => (
              <div className="ingredients-item" key={index}>
                <h3>{item.name}</h3>
                <input type="text" />
              </div>
            ))}
          </div>
          <input
            type="submit"
            value="Submit"
            id="submit-btn"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};
