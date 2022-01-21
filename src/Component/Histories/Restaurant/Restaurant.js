import React from 'react'
import { getExternalRestaurantUrl } from '../../../Util'

// Restaurant :: Props -> React.Component
export default ({
  restaurant,
  history,
}) =>
  <div className="history">
    { restaurant && restaurant.image
      ? <figure><img src={ restaurant.image } alt={ restaurant.name } /></figure>
      : <div className="image-placeholder"></div>
    }

    <div className="content">
      <h3>{ history.restaurantName }</h3>

      { restaurant &&
        <p>{ restaurant.address } { restaurant.zipCode } { restaurant.city }, { restaurant.country }</p>
      }

      { restaurant && restaurant.phone &&
        <p className="phone"><a href={ 'tel:' + restaurant.phone }>{ restaurant.phone }</a></p>
      }

      <a
        href={ getExternalRestaurantUrl(history.restaurantId) }
        target="_blank"
        rel="noopener noreferrer"
        className="website"
      >Voir la fiche</a>
    </div>
  </div>
