import React, { useState, useEffect } from "react";
import Slider from "react-slider";

const RangeSlider = ({ values, onChange }) => {
  const handleChange = (newValues) => {
    if (onChange) {
      onChange(newValues);
    }
  };

  return (
    <div
      className="slider-item"
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Slider
        className="slider"
        value={values}
        onChange={handleChange}
        min={0}
        max={1000}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <label htmlFor="minPrice">Min</label>
          <input
            type="number"
            id="minPrice"
            value={values && values[0]}
            onChange={(e) => handleChange([+e.target.value, values[1]])}
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Max</label>
          <input
            type="number"
            id="maxPrice"
            value={values && values[1]}
            onChange={(e) => handleChange([values[0], +e.target.value])}
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
