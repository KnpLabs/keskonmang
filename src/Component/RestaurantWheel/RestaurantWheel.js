import React from 'react'
import RestaurantDetails from './../RestaurantDetails'

// RestaurantWheel :: Props -> React.Component
export default ({
  submitForm,
  handleChange,
  address,
  restaurant,
}) =>
  <div>
    <h1>Qu'est ce qu'on mange ce midi ?</h1>
    <p>Trouve un resto' proche de toi !</p>
    <form onSubmit={submitForm}>
      <label>Adresse</label>
      <input
        type="text"
        name="address"
        onChange={handleChange}
        value={address}
      />
      <button>Qu'est ce qu'on mange ?</button>
    </form>

    {/* @TODO display this in a fancy way :) */}
    {restaurant !== null  && <RestaurantDetails/>}
  </div>
