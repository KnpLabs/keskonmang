import React from 'react'

// Icon :: Props -> React.Component
export default ({
  name,
  className,
  onClick = null,
}) =>
  <ion-icon
    name={ name }
    class={ `icon-component ${className}` }
    onClick={ onClick }
  ></ion-icon>
