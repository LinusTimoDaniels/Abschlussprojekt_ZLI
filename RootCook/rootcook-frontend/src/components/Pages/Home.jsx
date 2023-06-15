import React, { useEffect, useState } from 'react';
import FilterBar from '../FilterBar';
import './Home.css';

export const Home = () => {
  const [data, setData] = useState([]); // State variable to hold the fetched data
  const [view, setView] = useState([]); // State variable to hold the filtered and sorted view of data
  const [filter, setFilter] = useState({ query: '', sort: '', category: '' }); // State variable for filters

  const fetchData = () => {
    fetch('http://127.0.0.1:8080/recipe')
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

  useEffect(() => {
    // Fetch data from the backend on component mount
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleQueryChange = (event) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      query: event.target.value
    }));
  };

  const handleSortChange = (sortValue) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      sort: sortValue
    }));
  };

  useEffect(() => {
    // Apply filtering and sorting logic here whenever data or filter values change
    let filteredData = data;

    if (filter.query) {
      // Filter recipes based on the query
      filteredData = filteredData.filter(recipe =>
        recipe.title.toLowerCase().includes(filter.query.toLowerCase())
      );
    }

    if (filter.sort === 'ASC') {
      // Sort recipes in ascending order by title
      filteredData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter.sort === 'DESC') {
      // Sort recipes in descending order by title
      filteredData.sort((a, b) => b.title.localeCompare(a.title));
    }

    setView(filteredData); // Update the view with filtered and sorted data
  }, [data, filter]);

  return (
    <div>
      <h1 id='home-title'>Welcome to RootCook</h1>
      <form id="search-form" onSubmit={handleSubmit}>
        <input type="text" id='query' value={filter.query} onChange={handleQueryChange} />
        <input type="submit" id="submit" value="Submit" />
      </form>

      <FilterBar sort={filter.sort} setSort={handleSortChange} />

      <div className="parallax"></div>
      <div className="placeholder">
        {view.map((recipe, index) => (
          <div key={index} className="recipe-item">
            <h3 className='recipe-title'>{recipe.title}</h3>
            <img src={recipe.image} className='recipe-image' alt={recipe.title} />
            <button className='more-btn'>More</button>
          </div>
        ))}
      </div>
    </div>
  );
};
