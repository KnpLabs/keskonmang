import React from 'react'
import logo from '../../Style/Images/Logo-keskonmang.svg'
import './Logo.css'

// Logo :: Props -> React.Component
export default ({restaurantShown}) =>
  <figure
    data-is="brand-logo"
    className={`${restaurantShown ? 'is-small' : ''}`}
  >
    <img src={logo} alt="logo" />
  </figure>
