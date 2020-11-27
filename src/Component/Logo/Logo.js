import React from 'react'
import './Logo.css'

// FullWidthLogo :: Props -> React.Component
const FullWidthLogo = () =>
  <img
    src="/images/logo-keskonmang.svg"
    alt="logo"
    className="full is-hidden-touch"
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
  backToSearch,
  restaurantShown,
}) =>
  <figure data-is="brand-logo" onClick={backToSearch}>
    <HorizontalLogo className="is-hidden-desktop"/>

    {restaurantShown
      ? <HorizontalLogo className="is-hidden-touch"/>
      : <FullWidthLogo/>
    }
  </figure>
