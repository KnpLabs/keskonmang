import React from 'react'
import SignIn from './../SignIn'

// Firewall :: Props -> React.Component
export default ({
  isSignedIn,
  children,
}) => isSignedIn ? children : <SignIn/>
