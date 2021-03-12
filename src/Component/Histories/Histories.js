import React from 'react'
import './Histories.css'
import { map } from 'ramda'

// RestaurantDetails :: Props -> React.Component
export default ({
  histories,
  page,
  totalPages,
  getHistories,
  loading,
}) => !loading
  ? <section data-is="histories">
    <h1 className="title">Historique</h1>

    <div className="columns">
      <div className="is-1 column">
        <ion-icon
          class={`nav ${page <= 1 ? 'disabled' : ''}`}
          name="chevron-back-outline"
          onClick={ () => page > 1 ? getHistories(page - 1) : null }
        ></ion-icon>
      </div>

      <div className="column history-list">
        {map(history => 
          <div key={ history.id } className="history columns">
            <div className="date is-6 column">
              {new Date(history.createdAt).toLocaleDateString()}
              <span className="time">{new Date(history.createdAt).toLocaleTimeString()}</span>
            </div>
            <div className="name is-6 column">
              <a
                href={`https://www.yelp.ca/biz/${history.restaurantId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="website"
              >{history.restaurantName}</a>
            </div>
          </div>,
        )(histories)}
      </div>

      <div className="is-1 column">
        <ion-icon
          class={`nav ${page === totalPages ? 'disabled' : ''}`}
          name="chevron-forward-outline"
          onClick={ () => totalPages > page ? getHistories(page + 1) : null }
        ></ion-icon>
      </div>
    </div>
  </section>
  : <button className="button is-loading loader"></button>
