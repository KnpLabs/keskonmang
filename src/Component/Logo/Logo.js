import React from 'react'
import logo from '../../Style/Images/Logo-keskonmang.svg'
import '../../Style/Logo.css'

// Logo :: Props -> React.Component
export default () => 
  <figure className="logo"> 
    <img src={logo} alt="logo" />  
  </figure>
