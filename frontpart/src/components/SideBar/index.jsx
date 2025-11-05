import React, { useState, useEffect } from "react";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import { Collapse } from "react-collapse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Button } from "@mui/material";

function Sidebar({ onApplyFilters }) {
  const [categories, setCategories] = useState([]);
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);
  const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
  const [isOpenColorFilter, setIsOpenColorFilter] = useState(true);
  const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    availability: [],
    sizes: [],
    colors: [],
    price: [100, 10000],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/getCategory"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => {
      const newValues = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      const updatedFilters = { ...prev, [type]: newValues };

      // Convert categories array to a single category string (first selected)
      const filtersForBackend = {
        ...updatedFilters,
        category:
          updatedFilters.categories.length > 0
            ? updatedFilters.categories[0]
            : null,
      };

      // Remove categories array before sending:
      delete filtersForBackend.categories;

      onApplyFilters(filtersForBackend); // send filters with category string
      return updatedFilters;
    });
  };

  const handlePriceChange = (event, newValue) => {
    setSelectedFilters((prev) => ({ ...prev, price: newValue }));
  };

  const applyFilters = () => {
    onApplyFilters(selectedFilters);
  };

  const resetFilters = () => {
    const reset = {
      categories: [],
      availability: [],
      sizes: [],
      colors: [],
      price: [100, 10000],
    };
    setSelectedFilters(reset);
    onApplyFilters(reset);
  };

  return (
    <aside className="sidebar py-5">
      <div className="box bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6 font-poppins select-none">

        {/* Price Filter */}
        <h3 className="mb-3 text-lg font-semibold flex items-center justify-between cursor-pointer text-gray-900 hover:text-red-600">
          Price Range
          <button
            onClick={() => setIsOpenPriceFilter(!isOpenPriceFilter)}
            className="text-red-600 hover:text-red-700"
            aria-label="Toggle Price Filter"
          >
            {isOpenPriceFilter ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </h3>
        <Collapse isOpened={isOpenPriceFilter}>
          <div className="px-1">
            <Slider
              value={selectedFilters.price}
              onChange={handlePriceChange}
              onChangeCommitted={applyFilters}
              valueLabelDisplay="auto"
              min={100}
              max={10000}
              sx={{
                color: "#FF3D3D",
                "& .MuiSlider-thumb": {
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.3)" },
                },
              }}
            />
          </div>
        </Collapse>

        {/* Category Filter */}
        <h3 className="mb-3 text-lg font-semibold flex items-center justify-between cursor-pointer text-gray-900 hover:text-red-600">
          Shop by Category
          <button
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
            className="text-red-600 hover:text-red-700"
            aria-label="Toggle Category Filter"
          >
            {isOpenCategoryFilter ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll max-h-[300px] overflow-y-auto pl-2 relative left-[10px]">
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category._id}
                  control={
                    <Checkbox
                      sx={{ "&.Mui-checked": { color: "#FF3D3D" } }}
                      checked={selectedFilters.categories.includes(category._id)}
                      onChange={() =>
                        handleFilterChange("categories", category._id)
                      }
                      className="text-red-600"
                    />
                  }
                  label={
                    <span className="text-gray-700 font-medium hover:text-red-600">
                      {category.name}
                    </span>
                  }
                  className="ml-0 mb-1"
                />
              ))}
            </FormGroup>
          </div>
        </Collapse>

        {/* Availability Filter */}
        <h3 className="mb-3 text-lg font-semibold flex items-center justify-between cursor-pointer text-gray-900 hover:text-red-600">
          Availability
          <button
            onClick={() => setIsOpenAvailFilter(!isOpenAvailFilter)}
            className="text-red-600 hover:text-red-700"
            aria-label="Toggle Availability Filter"
          >
            {isOpenAvailFilter ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </h3>
        <Collapse isOpened={isOpenAvailFilter}>
          <FormGroup>
            {["In Stock", "Out of Stock"].map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={selectedFilters.availability.includes(option)}
                    onChange={() => handleFilterChange("availability", option)}
                    sx={{ "&.Mui-checked": { color: "#FF3D3D" } }}
                    className="text-red-600"
                  />
                }
                label={
                  <span className="text-gray-700 font-medium hover:text-red-600">
                    {option}
                  </span>
                }
                className="ml-0 mb-1"
              />
            ))}
          </FormGroup>
        </Collapse>

        {/* Size Filter */}
        <h3 className="mb-3 text-lg font-semibold flex items-center justify-between cursor-pointer text-gray-900 hover:text-red-600">
          Size
          <button
            onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
            className="text-red-600 hover:text-red-700"
            aria-label="Toggle Size Filter"
          >
            {isOpenSizeFilter ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </h3>
        <Collapse isOpened={isOpenSizeFilter}>
          <FormGroup>
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <FormControlLabel
                key={size}
                control={
                  <Checkbox
                    checked={selectedFilters.sizes.includes(size)}
                    onChange={() => handleFilterChange("sizes", size)}
                    sx={{ "&.Mui-checked": { color: "#FF3D3D" } }}
                    className="text-red-600"
                  />
                }
                label={
                  <span className="text-gray-700 font-medium hover:text-red-600">
                    {size}
                  </span>
                }
                className="ml-0 mb-1"
              />
            ))}
          </FormGroup>
        </Collapse>

        {/* Color Filter */}
        <h3 className="mb-3 text-lg font-semibold flex items-center justify-between cursor-pointer text-gray-900 hover:text-red-600">
          Color
          <button
            onClick={() => setIsOpenColorFilter(!isOpenColorFilter)}
            className="text-red-600 hover:text-red-700"
            aria-label="Toggle Color Filter"
          >
            {isOpenColorFilter ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </h3>
        <Collapse isOpened={isOpenColorFilter}>
          <FormGroup>
            {["Red", "Blue", "Green", "Black", "White", "Yellow"].map((color) => (
              <FormControlLabel
                key={color}
                control={
                  <Checkbox
                    checked={selectedFilters.colors.includes(color)}
                    onChange={() => handleFilterChange("colors", color)}
                    sx={{ "&.Mui-checked": { color: "#FF3D3D" } }}
                    className="text-red-600"
                  />
                }
                label={
                  <span className="text-gray-700 font-medium hover:text-red-600">
                    {color}
                  </span>
                }
                className="ml-0 mb-1"
              />
            ))}
          </FormGroup>
        </Collapse>

        {/* Actions */}
        <div className="flex gap-4 mt-4">
          <Button
            onClick={resetFilters}
            variant="contained"
            color="error"
            className="w-1/2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
            sx={{
              backgroundColor: "#FF3D3D",
              "&:hover": { backgroundColor: "#cc3232", boxShadow: "0 4px 12px rgb(204 50 50 / 0.6)" },
              textTransform: "none",
            }}
          >
            Reset
          </Button>
          <Button
            onClick={applyFilters}
            variant="contained"
            color="primary"
            className="w-1/2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
            sx={{
              backgroundColor: "#FF3D3D",
              "&:hover": { backgroundColor: "#cc3232", boxShadow: "0 4px 12px rgb(204 50 50 / 0.6)" },
              textTransform: "none",
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
