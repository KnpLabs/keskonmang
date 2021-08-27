import React from 'react'
import './Histories.css'
import { map } from 'ramda'
import { getExternalRestaurantUrl } from '../../Util'

// Histories :: Props -> React.Component
export default ({
  histories,
  page,
  totalPages,
  getHistories,
  getNextHistories,
  loading,
}) => <section data-is="histories">
    <h1 className="title">Historique</h1>

    <div className="history-list">
      {map(history => 
        <div key={ history.id } className="history columns">
          <div className="date is-6 column">
            {new Date(history.createdAt).toLocaleDateString()}
            <span className="time">{new Date(history.createdAt).toLocaleTimeString()}</span>
          </div>
          <div className="name is-6 column">
            <a
              href={getExternalRestaurantUrl(history.restaurantId)}
              target="_blank"
              rel="noopener noreferrer"
              className="website"
            >{history.restaurantName}</a>
          </div>
        </div>,
      )(histories)}
    </div>

    { page < totalPages &&
      <button className={`button show-more ${ loading ? 'is-loading' : '' }`} onClick={  getNextHistories }>
        Afficher plus!
      </button>
    }
  </section>
