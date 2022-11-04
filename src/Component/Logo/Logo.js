import React from 'react'
import { Link } from "react-router-dom"
import './Logo.css'

// FullWidthLogo :: Props -> React.Component
const FullWidthLogo = ({ className = '' }) =>
  <img
    src="/images/logo-keskonmang.svg"
    alt="logo"
    className={ `full ${className}` }
  />

// HorizontalLogo :: Props -> React.Component
const HorizontalLogo = ({ className = '' }) =>
  <img
    src="/images/keskonmang-horizontal-01.svg"
    alt="logo"
    className={ `horizontal ${className}` }
  />

// Logo :: Props -> React.Component
export default ({
  restaurantShown,
  historiesShown,
}) =>
  <figure data-is="brand-logo">
    <Link to="/">
      {restaurantShown || historiesShown
        ? <HorizontalLogo />
        : <>
          <FullWidthLogo className="is-hidden-touch"/>
          <HorizontalLogo className="is-hidden-desktop"/>
        </>
      }
    </Link>
  </figure>
