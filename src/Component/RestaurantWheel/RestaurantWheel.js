import React from 'react'
import './RestaurantWheel.css'
import RestaurantFilters from '../RestaurantFilters'

// RestaurantWheel :: Props -> React.Component
export default ({
  address,
  fetchError,
  handleAddressChange,
  loading,
  submitForm,
  noRestaurants,
  restaurant,
}) => <section data-is="restaurant-wheel">
    <h1 className="title">
      Trouve un resto' ouvert proche de toi !
    </h1>
    <form onSubmit={submitForm}>
      <div className="field">
        <div className="control">
          <label className="label">
            Adresse
          </label>
          <input
            type="text"
            name="address"
            className="input address"
            onChange={handleAddressChange}
            value={address}
          />
        </div>
      </div>
      <RestaurantFilters/>

      {fetchError && <span className="global-error">Une erreur est survenue :(</span>}
      {noRestaurants && <span className="global-error">Aucun restaurants à proposer :(</span>}

      <button
        className={`submit-address ${address.length > 3 ? 'ready' : ''} button ${loading ? 'is-loading' : ''}`}
        disabled={address.length < 3}
      >
        Qu'est ce qu'on mange ?
      </button>
    </form>
  </section>
