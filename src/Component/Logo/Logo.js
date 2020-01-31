import React from 'react'
import './Logo.css'

// FullWidthLogo :: Props -> React.Component
const FullWidthLogo = () =>
  <img
    src="/images/logo-keskonmang.svg"
    alt="logo"
    className="is-hidden-touch"
  />

// HorizontalLogo :: Props -> React.Component
const HorizontalLogo = ({ className = '' }) =>
  <img
    src="/images/keskonmang-horizontal-01.svg"
    alt="logo"
    className={className}
  />

// Logo :: Props -> React.Component
export default ({
  restaurantShown,
}) =>
  <figure data-is="brand-logo">
    <HorizontalLogo className="is-hidden-desktop"/>

    {restaurantShown
      ? <HorizontalLogo className="is-hidden-desktop"/>
      : <FullWidthLogo/>
    }
  </figure>
