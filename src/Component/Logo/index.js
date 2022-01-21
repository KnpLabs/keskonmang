import React from 'react'
import { useLocation } from 'react-router-dom'
import Logo from './container'

export default () => {
  let { pathname } = useLocation();

  return (<Logo currentPath={ pathname } />);
}
