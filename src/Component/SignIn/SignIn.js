import React from 'react'
import './SignIn.css';

// SignIn :: Props -> Reac.Component
export default ({ isInitialized }) => isInitialized
  ? <div id="sign-in-button"></div>
  : null
