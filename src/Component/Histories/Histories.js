import React from 'react'
import Restaurant from './Restaurant'
import './Histories.css'
import Loader from '../Loader/Loader'
import { isEmpty, map, mapObjIndexed, values } from 'ramda'

// Histories :: Props -> React.Component
export default ({
  histories,
  page,
  totalPages,
  getHistories,
  getNextHistories,
  loading,
}) => loading && isEmpty(histories)
  ? <Loader/>
  : <section data-is="histories">
    <h1 className="title">Historique</h1>

    { values(mapObjIndexed((historiesByDate, index) =>
      <div key={ index } className="history-day">
        <h4>{ new Date(historiesByDate[0].createdAt).toLocaleDateString() }</h4>

        { map(history =>
          <Restaurant key={ `history-${history.id}` } history={ history } />
        )(historiesByDate) }
      </div>,
    )(histories)) }

    { page < totalPages &&
      <button className={`button show-more ${ loading ? 'is-loading' : '' }`} onClick={ getNextHistories }>
        Afficher plus!
      </button>
    }
  </section>
