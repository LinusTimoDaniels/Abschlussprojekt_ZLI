import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FilterBar from "../FilterBar";
import "./Home.css";

export const Home = ({ user, setUser, setRecipe }) => {
  // State variables
  const [data, setData] = useState([]); // Stores the fetched data
  const [filteredData, setFilteredData] = useState([]); // Stores the filtered and sorted data
  const [filter, setFilter] = useState({ query: "", sort: "", category: "" }); // Stores the filter criteria
  const [caloriesRange, setCaloriesRange] = useState([0, 10000]);
  const [proteinRange, setProteinRange] = useState([0, 10000]);
  const [fibresRange, setFibresRange] = useState([0, 10000]);
  const [fatRange, setFatRange] = useState([0, 10000]);
  const [sugarRange, setSugarRange] = useState([0, 10000]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [
    data,
    filter,
    caloriesRange,
    proteinRange,
    fibresRange,
    fatRange,
    sugarRange,
  ]);

  useEffect(() => {
    console.log("caloriesRange:", caloriesRange);
  }, [caloriesRange]);

  useEffect(() => {
    console.log("proteinRange:", proteinRange);
  }, [proteinRange]);

  useEffect(() => {
    console.log("fibresRange:", fibresRange);
  }, [fibresRange]);

  useEffect(() => {
    console.log("fatRange:", fatRange);
  }, [fatRange]);

  useEffect(() => {
    console.log("sugarRange:", sugarRange);
  }, [sugarRange]);

  // Fetches data from the server
  const fetchData = () => {
    const token = JSON.parse(localStorage.getItem("login"));

    fetch("http://127.0.0.1:8080/recipe", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData:", responseData);
        setData(responseData); // Updates the data state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Handles the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(); // Fetches the data again when the form is submitted
  };

  // Handles the query input change
  const handleQueryChange = (event) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      query: event.target.value,
    }));
  };

  // Handles the sort criteria change
  const handleSortChange = (sortValue) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      sort: sortValue,
    }));
  };

  // Handles the category filter change
  const handleCategoryChange = (categoryValue) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: categoryValue,
    }));
  };

  useEffect(() => {
    applyFiltersAndSort();
    /* console.log("user: ", user); */
  }, [data, filter]);

  // Applies filters and sorts the data based on the filter criteria
  const applyFiltersAndSort = () => {
    let tempData = [...data];

    if (filter.query) {
      // Filters the data based on the query
      tempData = tempData.filter((recipe) =>
        recipe.title.toLowerCase().includes(filter.query.toLowerCase())
      );
    }

    if (filter.category && filter.category !== "5") {
      // Filters the data based on the selected category
      tempData = tempData.filter(
        (recipe) => recipe.Categorie_id === parseInt(filter.category)
      );
    }

    // Filter by calories range
    tempData = tempData.filter((recipe) => {
      const calories = recipe.calories;
      return calories >= caloriesRange[0] && calories <= caloriesRange[1];
    });

    // Filter by protein range
    tempData = tempData.filter((recipe) => {
      const protein = recipe.protein;
      return protein >= proteinRange[0] && protein <= proteinRange[1];
    });

    // Filter by fibres range
    tempData = tempData.filter((recipe) => {
      const fibres = recipe.fibres;
      return fibres >= fibresRange[0] && fibres <= fibresRange[1];
    });

    // Filter by fat range
    tempData = tempData.filter((recipe) => {
      const fat = recipe.fat;
      return fat >= fatRange[0] && fat <= fatRange[1];
    });

    // Filter by sugar range
    tempData = tempData.filter((recipe) => {
      const sugar = recipe.sugar;
      return sugar >= sugarRange[0] && sugar <= sugarRange[1];
    });

    if (filter.sort === "title ASC") {
      // Sorts the data in ascending order based on the recipe title
      tempData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter.sort === "title DESC") {
      // Sorts the data in descending order based on the recipe title
      tempData.sort((a, b) => b.title.localeCompare(a.title));
    } else if (filter.sort === "calories ASC") {
      // Sorts the data in ascending order based on the calories
      tempData.sort((a, b) =>
        a.calories.toString().localeCompare(b.calories.toString())
      );
    } else if (filter.sort === "calories DESC") {
      // Sorts the data in descending order based on the calories
      tempData.sort((a, b) =>
        b.calories.toString().localeCompare(a.calories.toString())
      );
    } else if (filter.sort === "protein ASC") {
      // Sorts the data in ascending order based on the protein
      tempData.sort((a, b) =>
        a.protein.toString().localeCompare(b.protein.toString())
      );
    } else if (filter.sort === "protein DESC") {
      // Sorts the data in descending order based on the protein
      tempData.sort((a, b) =>
        b.protein.toString().localeCompare(a.protein.toString())
      );
    } else if (filter.sort === "fibres ASC") {
      // Sorts the data in ascending order based on the fibres
      tempData.sort((a, b) =>
        a.fibres.toString().localeCompare(b.fibres.toString())
      );
    } else if (filter.sort === "fibres DESC") {
      // Sorts the data in descending order based on the fibres
      tempData.sort((a, b) =>
        b.fibres.toString().localeCompare(a.fibres.toString())
      );
    } else if (filter.sort === "sugar ASC") {
      // Sorts the data in ascending order based on the sugar
      tempData.sort((a, b) =>
        a.sugar.toString().localeCompare(b.sugar.toString())
      );
    } else if (filter.sort === "sugar DESC") {
      // Sorts the data in descending order based on the sugar
      tempData.sort((a, b) =>
        b.sugar.toString().localeCompare(a.sugar.toString())
      );
    } else if (filter.sort === "fat ASC") {
      // Sorts the data in ascending order based on the fat
      tempData.sort((a, b) => a.fat.toString().localeCompare(b.fat.toString()));
    } else if (filter.sort === "fat DESC") {
      // Sorts the data in descending order based on the fat
      tempData.sort((a, b) => b.fat.toString().localeCompare(a.fat.toString()));
    }

    setFilteredData(tempData); // Updates the filteredData state with the filtered and sorted data
  };

  return (
    <div>
      <h1 id="home-title">Welcome to RootCook {user}</h1>
      <form id="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="query"
          value={filter.query}
          onChange={handleQueryChange}
        />
        <input type="submit" id="submit" value="Submit" />
      </form>

      <FilterBar
        sort={filter.sort}
        setSort={handleSortChange}
        category={filter.category}
        setCategory={handleCategoryChange}
        caloriesRange={caloriesRange}
        setCaloriesRange={setCaloriesRange}
        fibresRange={fibresRange}
        setFibresRange={setFibresRange}
        proteinRange={proteinRange}
        setProteinRange={setProteinRange}
        fatRange={fatRange}
        setFatRange={setFatRange}
        sugarRange={sugarRange}
        setSugarRange={setSugarRange}
      />

      <div className="parallax"></div>
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

export default Home;
