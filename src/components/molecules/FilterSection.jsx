import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FilterSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="font-medium text-gray-800">{title}</h3>
        <ApperIcon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          size={20}
          className="text-gray-500"
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterSidebar = ({ filters, onFilterChange, onClearAll }) => {
  const categories = ["Men", "Women", "Kids", "Beauty", "Home"];
  const brands = ["Nike", "Adidas", "Zara", "H&M", "Uniqlo", "Levi's"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Red", "Blue", "Green", "Black", "White", "Pink"];

  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterType, newValues);
  };

  const handlePriceChange = (type, value) => {
    onFilterChange("priceRange", {
      ...filters.priceRange,
      [type]: value
    });
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-primary hover:text-primary"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <FilterSection title="Price Range" defaultOpen>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Min Price</label>
              <input
                type="number"
                placeholder="0"
                value={filters.priceRange?.min || ""}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Max Price</label>
              <input
                type="number"
                placeholder="10000"
                value={filters.priceRange?.max || ""}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </FilterSection>

        {/* Categories */}
        <FilterSection title="Categories">
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.categories || []).includes(category)}
                  onChange={() => handleCheckboxChange("categories", category)}
                  className="mr-3 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brands">
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.brands || []).includes(brand)}
                  onChange={() => handleCheckboxChange("brands", brand)}
                  className="mr-3 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Sizes */}
        <FilterSection title="Sizes">
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleCheckboxChange("sizes", size)}
                className={`p-2 text-sm border rounded-md transition-colors ${
                  (filters.sizes || []).includes(size)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Colors */}
        <FilterSection title="Colors">
          <div className="space-y-2">
            {colors.map((color) => (
              <label key={color} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.colors || []).includes(color)}
                  onChange={() => handleCheckboxChange("colors", color)}
                  className="mr-3 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{color}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default FilterSidebar;