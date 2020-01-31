import React from 'react'
import './Logo.css'

// Logo :: Props -> React.Component
export default ({restaurantShown}) =>
  <figure
    data-is="brand-logo"
    className={`${restaurantShown ? 'is-small' : ''}`}
  >
    <img src="/images/keskonmang-horizontal-01.svg" alt="logo" />
  </figure>
