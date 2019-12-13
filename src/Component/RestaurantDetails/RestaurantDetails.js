import React from 'react'
import { getImageUrl } from './../../Util'
import retryIcon from '../../Style/Images/retry.svg'
import '../../Style/RestaurantDetails.css'

// RestaurantDetails :: Props -> React.Component
export default ({
  restaurant,
  loading,
  getRestaurant,
  backToSearch,
  restaurantShown,
}) =>
  restaurantShown &&
  <div>
    <section className="restaurant-details">
      {restaurant.bestPhoto &&
      <figure className="restaurant-image">
        <img src={getImageUrl(restaurant.bestPhoto)} alt={restaurant.name} />
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
          {restaurant.contact.formattedPhone}
        </p>
      }
      {restaurant.url &&
        <p className="website">
          <a href={restaurant.url}>Voir le site</a>
        </p>
      }
      {restaurant.hours &&
        <p className={restaurant.hours.isOpen ? 'open' : 'close'}>
          {restaurant.hours.isOpen ? 'Ouvert' : 'Fermé'}
        </p>
      }
      {restaurant.price &&
        <div className={`price price-${restaurant.price.tier}`}>
          <p>Prix :</p>
          <span className="bullet"></span>
          <span className="bullet"></span>
          <span className="bullet"></span>
          <span className="bullet"></span>
        </div>
      }
      <button
        className={`next-restaurant button ${loading ? 'is-loading' : ''}`}
        onClick={getRestaurant}
      >
        <img src={retryIcon} alt="Retry icon" />
        Chercher un autre restaurant
      </button>
    </section>

    <button className="back-button" onClick={backToSearch}>Changer ma recherche</button>
  </div>
