import React from 'react'
import { getExternalRestaurantUrl } from '../../../Util'

// Restaurant :: Props -> React.Component
export default ({
  history,
}) =>
  <div className="history">
    { history.restaurant && history.restaurant.image
      ? <figure><img src={ history.restaurant.image } alt={ history.restaurant.name } /></figure>
      : <div className="image-placeholder"></div>
    }

    <div className="content">
      <h3>{ history.restaurantName }</h3>

      { history.restaurant &&
        <p>{ history.restaurant.address } { history.restaurant.zipCode } { history.restaurant.city }, { history.restaurant.country }</p>
      }

      { history.restaurant && history.restaurant.phone &&
        <p className="phone"><a href={ 'tel:' + history.restaurant.phone }>{ history.restaurant.phone }</a></p>
      }

      <a
        href={ getExternalRestaurantUrl(history.restaurantId) }
        target="_blank"
        rel="noopener noreferrer"
        className="website"
      >Voir la fiche</a>
    </div>
  </div>
