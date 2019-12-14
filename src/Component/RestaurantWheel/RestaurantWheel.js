import React from 'react'
import '../../Style/RestaurantWheel.css'

// RestaurantWheel :: Props -> React.Component
export default ({
  address,
  fetchError,
  handleChange,
  invalidAddress,
  loading,
  restaurantShown,
  submitForm,
}) =>
  <div className={`restaurant-wheel ${restaurantShown ? 'hidden' : ''}`}>
    <h1 className="title">Trouve un resto' proche de toi !</h1>
    <form onSubmit={submitForm}>
      <label>
        Adresse
        {invalidAddress &&
          <span className="error">Cette adresse est introuvable :(</span>
        }
      </label>
      <input
        type="text"
        name="address"
        className={`address-input ${invalidAddress ? 'error' : ''}`}
        onChange={handleChange}
        value={address}
      />

      {fetchError && <span className="global-error">Une erreur est survenue :(</span>}

      <button
        className={`submit-address ${address.length > 3 ? 'ready' : ''} button ${loading ? 'is-loading' : ''}`}
      >
        Qu'est ce qu'on mange ?
      </button>
    </form>
  </div>
