import React from 'react';
import './FilterBar.css';

function FilterBar({ sort, setSort }) {
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className='filter-container'>
      <div className='sort-bar'>
        <select value={sort} onChange={handleSortChange} className='sort-bar-object sort-bar-object-sort'>
          <option disabled className='filter-object' value='Sort By:'>Sort By:</option>
          <option className='filter-object' value='ASC'>Alphabethicly ASC</option>
          <option className='filter-object' value='DESC'>Alphabethicly DESC</option>
          <option className='filter-object' value='option3'>Calories ASC</option>
        </select>
      </div>
      <div className='filter-bar'>
        <select className='sort-bar-object sort-bar-object-right'>
          <option disabled className='filter-object' value="option1">Categorie</option>
          <option className='filter-object' value="option1">Meat</option>
          <option className='filter-object' value="option2">Fish</option>
          <option className='filter-object' value="option3">Vegetarian</option>
          <option className='filter-object' value="option3">Vegan</option>
        </select>
        <select className='sort-bar-object'>
          <option disabled className='filter-object' value="option1">Option 1</option>
          <option className='filter-object' value="option1">Option 1</option>
          <option className='filter-object' value="option2">Option 2</option>
          <option className='filter-object' value="option3">Option 3</option>
        </select>
        <select className='sort-bar-object'>
          <option disabled className='filter-object' value="option1">Option 1</option>
          <option className='filter-object' value="option1">Option 1</option>
          <option className='filter-object' value="option2">Option 2</option>
          <option className='filter-object' value="option3">Option 3</option>
        </select>
        <select className='sort-bar-object'>
          <option disabled className='filter-object' value="option1">Option 1</option>
          <option className='filter-object' value="option1">Option 1</option>
          <option className='filter-object' value="option2">Option 2</option>
          <option className='filter-object' value="option3">Option 3</option>
        </select>
        <select className='sort-bar-object sort-bar-object-left'>
          <option disabled className='filter-object' value="option1">Option 1</option>
          <option className='filter-object' value="option1">Option 1</option>
          <option className='filter-object' value="option2">Option 2</option>
          <option className='filter-object' value="option3">Option 3</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
