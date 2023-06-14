import React, { useState } from 'react';
import './Home.css';
/* https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=24&apiKey=233cc954a41346fa8e21006d664dd268 */

export const Home = () => {
  const [query, setQuery] = useState(''); // State variable to hold the input field value
  const [data, setData] = useState(null); // State variable to hold the fetched data

  const fetchData = () => {
    fetch(`http://127.0.0.1:8080/${query}`)
      .then(response => response.json())
      .then(responseData => {
        console.log('responseData:', responseData);
        setData(responseData);
        console.log('data:', data);
      })
      .catch(error => {
        console.error(error);
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
          id='query'
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update the query state variable as the input value changes
        />
        <input type="submit" id="submit" value="Submit" />
      </form>

      <div className="parallax"></div>
      <div className="placeholder">
        {data && data.map((recipe, index) => (
          <div key={index} className="recipe-item">
            {/* Render the desired information for each recipe */}
            <h3 className='recipe-title'>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <img src={recipe.image} className='recipe-image'/>
            <button className='more-btn'>More</button>
          </div>
        ))}
      </div>
    </div>
  );
};
