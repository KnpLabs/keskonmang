import React from 'react'
import logo from '../../Style/Images/Logo-keskonmang.svg'
import './Logo.css'

// Logo :: Props -> React.Component
export default ({restaurantShown}) => 
  <figure className={`logo ${restaurantShown ? 'small' : ''}`}> 
    <img src={logo} alt="logo" />  
  </figure>
