import React from 'react'
import './RestaurantDetails.css'

const placeholderImages = [
  '/images/cooker.svg',
  '/images/hungry.svg',
  '/images/in-love.svg',
  '/images/noodles.svg',
  '/images/party.svg',
  '/images/tongue-out.svg',
];

// RestaurantDetails :: Props -> React.Component
export default ({
  restaurant,
  loading,
  getRestaurant,
  backToSearch,
  restaurantShown,
  addHistory,
  isLogged,
}) => restaurantShown &&
  <section data-is="restaurant-details">
    <figure className="restaurant-image">
      {restaurant.url &&
        <a
          href={restaurant.url}
          target="_blank"
          rel="noopener noreferrer"
          className="website"
        >
          <img
            src="/images/circle_right.svg"
            alt="Voir la fiche sur Yelp"
            title="Voir la fiche sur Yelp"
          />
        </a>
      }
      {restaurant.image_url
        ? <img src={restaurant.image_url} alt={restaurant.name} />
        : <img className="placeholder" src={placeholderImages[Math.floor(Math.random() * 6)]} alt="Keskonmang'" />
      }
    </figure>

    <h1 className="title">{restaurant.name}</h1>
    <div className="separator"> </div>

    <p className="address">
      {restaurant.location.address1} {restaurant.location.address2 && !restaurant.location.address3 && 
        <span>({restaurant.location.address2})</span>
      } {restaurant.location.address2 && restaurant.location.address3 && 
        <span>({restaurant.location.address2} - {restaurant.location.address13})</span>
      }
      <br />
      {restaurant.location.zip_code} {restaurant.location.city}, {restaurant.location.country}
    </p>

    {restaurant.display_phone &&
      <p className="phone">
        <a href="tel:{restaurant.display_phone}">{restaurant.display_phone}</a>
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
    <div className={`buttons-container ${isLogged ? 'double-buttons' : ''}`}>
      {isLogged &&
        <button
          className="go-restaurant button"
          title="Ajouter à l'historique"
          onClick={addHistory}
        >
          J'y vais!
        </button>
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
    </div>

    <button className="back-button" onClick={backToSearch}>Changer ma recherche</button>
  </section>
