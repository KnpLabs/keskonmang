import React from 'react'
import './Loader.css'

// Icon :: Props -> React.Component
export default ({
  classes,
}) =>
  <progress className={"progress is-small is-primary " + classes} max="100"></progress>
