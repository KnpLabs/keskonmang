import React from 'react'
import './RestaurantFilters.css'
import Select from 'react-select'

const colorSelectTheme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#feddde',
    primary50: '#feddde',
    primary25: '#feddde',
    neutral20: '#feddde',
    neutral30: '#feddde',
  },
})

// RestaurantWheel :: Props -> React.Component
export default ({
  cuisineTypes,
  diets,
  prices,
  handleCuisineTypeChange,
  handleDietChange,
  handlePriceChange,
  cuisineTypeFilters,
  dietFilters,
  priceFilters,
  cuisineTypeFiltersLoaded,
  dietFiltersLoaded,
  priceFiltersLoaded,
}) => 
  <div>
    <div className="field filter">
      <div className="control">
        <label className="label">Type de cuisine</label>
          <Select
            isMulti
            name="cuisineType"
            options={cuisineTypeFilters}
            value={cuisineTypes}
            onChange={handleCuisineTypeChange}
            isLoading={!cuisineTypeFiltersLoaded}
            menuPlacement="top"
            placeholder="Tous"
            theme={colorSelectTheme}
          />
      </div>
    </div>
    <div className="field filter">
      <div className="control">
        <label className="label">Régime alimentaire</label>
          <Select
            isMulti
            name="diet"
            options={dietFilters}
            value={diets}
            onChange={handleDietChange}
            isLoading={!dietFiltersLoaded}
            menuPlacement="top"
            placeholder="Tous"
            theme={colorSelectTheme}
          />
      </div>
    </div>
    <div className="field filter">
      <div className="control">
        <label className="label">Prix</label>
          <Select
            isMulti
            name="price"
            options={priceFilters}
            value={prices}
            onChange={handlePriceChange}
            isLoading={!priceFiltersLoaded}
            menuPlacement="top"
            placeholder="Tous"
            theme={colorSelectTheme}
            isClearable={false}
          />
      </div>
    </div>
  </div>
