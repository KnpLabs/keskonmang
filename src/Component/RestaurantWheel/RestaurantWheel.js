import React from 'react'
import '../../Style/RestaurantWheel.css'

// RestaurantWheel :: Props -> React.Component
export default ({
  submitForm,
  handleChange,
  address,
  loading,
  restaurantShown
}) =>
  <div className={`restaurant-wheel ${restaurantShown ? 'hidden' : ''}`}>
    <h1 className="title">Trouve un resto' proche de toi !</h1>
    <form onSubmit={submitForm}>
      <label>Adresse</label>
      <input
        type="text"
        name="address"
        className="address-input"
        onChange={handleChange}
        value={address}
      />
      <button
        className={`submit-address ${address.length > 3 ? 'ready' : ''} button ${loading ? 'is-loading' : ''}`}
      >
        Qu'est ce qu'on mange ?
      </button>
    </form>
  </div>
