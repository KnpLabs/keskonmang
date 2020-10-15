import React from 'react'
import './RestaurantDetails.css'

// RestaurantDetails :: Props -> React.Component
export default ({
  restaurant,
  loading,
  getRestaurant,
  backToSearch,
  restaurantShown,
}) =>
  restaurantShown &&
  <div className="details-container">
    <section data-is="restaurant-details">
      {restaurant.image_url &&
        <figure className="restaurant-image">
          <img src={restaurant.image_url} alt={restaurant.name} />
        </figure>
      }

      <h1 className="title">{restaurant.name}</h1>
      <div className="separator"> </div>
      {restaurant.location &&
        <p className="address">
          {restaurant.location.display_address.map(line => <span>{line}<br/></span>)}
        </p>
      }

      {restaurant.display_phone &&
        <p className="phone">
          {restaurant.display_phone}
        </p>
      }
      {restaurant.url &&
        <p className="website">
          <a
            href={restaurant.url}
            target="_blank"
            rel="noopener noreferrer"
          >Voir la fiche sur Yelp</a>
        </p>
      }
      {restaurant.hours &&
        <p className={restaurant.hours.is_open_now ? 'open' : 'close'}>
          {restaurant.hours.is_open_now ? 'Ouvert' : 'Fermé'}
        </p>
      }
      {restaurant.price &&
        <div className={`price price-${restaurant.price.length}`}>
          <p>Prix :</p>
          <span className="bullet"> </span>
          <span className="bullet"> </span>
          <span className="bullet"> </span>
          <span className="bullet"> </span>
        </div>
      }
      <button
        className={`next-restaurant button ${loading ? 'is-loading' : ''}`}
        onClick={getRestaurant}
      >
        <img
          className={`${loading ? 'is-hidden': ''}`}
          src="/images/retry.svg"
          alt="Retry icon"
        />
        Chercher à nouveau
      </button>
    </section>

    <button className="back-button" onClick={backToSearch}>Changer ma recherche</button>
  </div>
