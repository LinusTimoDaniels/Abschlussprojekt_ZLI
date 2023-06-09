import React, { useState } from 'react';
import './Home.css';

export const Home = () => {
  const [query, setQuery] = useState(''); // State variable to hold the input field value
  const [data, setData] = useState(null); // State variable to hold the fetched data

  const fetchData = () => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=5753ba649e594eae871a98a6750b8450`)
      .then(response => response.json()) // Convert the response to JSON format
      .then(responseData => {
        setData(responseData); // Store the fetched data in the state variable
        console.log(responseData); // Log the fetched data to the console
      })
      .catch(error => {
        console.error(error); // Log any error that occurs during the API call
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    fetchData(); // Call the fetchData function to fetch data from the API
  };

  return (
    <div>
      <h1>Welcome to RootCook</h1>
      <form id="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update the query state variable as the input value changes
        />
        <input type="submit" name="submit" value="Submit" />
      </form>
      <div className="parallax"></div>
      <div className="placeholder">
        {data && data.results.map((recipe, index) => (
          <div key={index} className="recipe-item">
            {/* Render the desired information for each recipe */}
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <img src={recipe.image}/>
          </div>
        ))}
      </div>
    </div>
  );
};
