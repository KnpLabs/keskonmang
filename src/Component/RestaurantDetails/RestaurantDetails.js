import React from 'react'

// RestaurantDetails :: Props -> React.Component
export default ({
  restaurant,
  loading,
  getCoordinates,
  backToSearch,
}) =>
  <div className="restaurant-details">
    <section className="venue-details">
      {restaurant.bestPhoto &&
      <figure>
        <img src={restaurant.bestPhoto} alt={restaurant.name} />
      </figure>
      }

      <h1>{restaurant.name}</h1>
      <div className="separator"></div>
      <p className="address">
        {restaurant.location.address}&nbsp;
        {restaurant.location.postalCode}&nbsp;
        {restaurant.location.city}
      </p>

      {restaurant.contact &&
        <p className="phone">
          {restaurant.contact.phone}
        </p>
      }
      {restaurant.url &&
        <p className="website">
          <a href={restaurant.url}>Voir le site</a>
        </p>
      }
      {restaurant.hours &&
        <p className="hours">
          {restaurant.hours}
        </p>
      }
      {restaurant.price &&
        <div className={`price price-${restaurant.price.tier}`}>
          <span className="bullet"></span>
          <span className="bullet"></span>
          <span className="bullet"></span>
          <span className="bullet"></span>
        </div>
      }
      <button
        className={`button ${loading ? 'is-loading' : ''}`}
        onClick={getCoordinates}
      >
        Chercher un autre restaurant
      </button>
    </section>

    <button onClick={backToSearch}>Changer ma recherche</button>
  </div>
