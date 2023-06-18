import React, { useState, useEffect } from "react";
import "./FilterBar.css";
import RangeSlider from "./RangeSlider";

function FilterBar({
  sort,
  setSort,
  category,
  setCategory,
  caloriesRange,
  setCaloriesRange,
  proteinRange,
  setProteinRange,
  fibresRange,
  setFibresRange,
  fatRange,
  setFatRange,
  sugarRange,
  setSugarRange,
}) {


  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleRangeChange = (identifier, newValues) => {
    switch (identifier) {
      case "calories":
        setCaloriesRange(newValues);
        break;
      case "protein":
        setProteinRange(newValues);
        break;
      case "fibres":
        setFibresRange(newValues);
        break;
      case "fat":
        setFatRange(newValues);
        break;
      case "sugar":
        setSugarRange(newValues);
        break;
      default:
        break;
    }
  };

  return (
    <div className="filter-container">
      {/* Sort dropdown */}
      <div className="sort-bar">
        <select
          value={sort}
          onChange={handleSortChange}
          className="sort-bar-object sort-bar-object-sort"
        >
          <option disabled value="">
            Sort By:
          </option>
          <option value="title ASC">Alphabetically ASC</option>
          <option value="title DESC">Alphabetically DESC</option>
          <option value="calories ASC">Calories ASC</option>
          <option value="calories DESC">Calories DESC</option>
          <option value="protein ASC">Protein ASC</option>
          <option value="protein DESC">Protein DESC</option>
          <option value="fibres ASC">Fibres ASC</option>
          <option value="fibres DESC">Fibres DESC</option>
          <option value="sugar ASC">Sugar ASC</option>
          <option value="sugar DESC">Sugar DESC</option>
          <option value="fat ASC">Fat ASC</option>
          <option value="fat DESC">Fat DESC</option>
        </select>
      </div>
      {/* Category dropdown */}
      <div className="sort-bar">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="sort-bar-object sort-bar-object-sort"
        >
          <option disabled value="">
            Category:
          </option>
          <option value="1">Vegan</option>
          <option value="2">Vegetarian</option>
          <option value="3">Meat</option>
          <option value="4">Fish</option>
          <option value="5">All</option>
        </select>
      </div>
      {/* Calories RangeSlider */}
      <div className="range-bar-container">
        <div className="range-slider-container" id="cal-slider">
          <h1>Calories</h1>
          <RangeSlider
            values={caloriesRange}
            onChange={(newValues) => handleRangeChange("calories", newValues)}
          />
        </div>
        <div className="range-slider-container" id="pro-slider">
          <h1>Protein</h1>
          <RangeSlider
            values={proteinRange}
            onChange={(newValues) => handleRangeChange("protein", newValues)}
          />
        </div>
        {/* Fibres RangeSlider */}
        <div className="range-slider-container" id="fib-slider">
          <h1>Fibres</h1>
          <RangeSlider
            values={fibresRange}
            onChange={(newValues) => handleRangeChange("fibres", newValues)}
          />
        </div>
        {/* Fat RangeSlider */}
        <div className="range-slider-container" id="fat-slider">
          <h1>Fat</h1>
          <RangeSlider
            values={fatRange}
            onChange={(newValues) => handleRangeChange("fat", newValues)}
          />
        </div>
        {/* Sugar RangeSlider */}
        <div className="range-slider-container" id="sug-slider">
          <h1>Sugar</h1>
          <RangeSlider
            values={sugarRange}
            onChange={(newValues) => handleRangeChange("sugar", newValues)}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
