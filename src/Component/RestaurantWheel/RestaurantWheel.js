import React from 'react'
import './RestaurantWheel.css'

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
  <section
    className={`${restaurantShown ? 'is-hidden' : ''}`}
    data-is="restaurant-wheel"
  >
    <h1 className="title">
      Trouve un resto' proche de toi !
    </h1>
    <form onSubmit={submitForm}>
      <div className="field">
        <div className="control">
          <label className="label">
            Adresse
            {invalidAddress &&
              <span className="error">Cette adresse est introuvable :(</span>
            }
          </label>
          <input
            type="text"
            name="address"
            className={`input address ${invalidAddress ? 'error' : ''}`}
            onChange={handleChange}
            value={address}
          />
        </div>
      </div>

      {fetchError && <span className="global-error">Une erreur est survenue :(</span>}

      <button
        className={`submit-address ${address.length > 3 ? 'ready' : ''} button ${loading ? 'is-loading' : ''}`}
      >
        Qu'est ce qu'on mange ?
      </button>
    </form>
  </section>
