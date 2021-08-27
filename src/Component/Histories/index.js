import Histories from './container'
import { connect } from 'react-redux'
import React from 'react'
import { Redirect } from 'react-router-dom'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  isLogged: state.Session.user !== null
})

const view = ({isLogged, ...props}) => isLogged
  ? <Histories {...props} />
  : <Redirect to={{ pathname: '/' }} />

// Histories :: Props -> React.Component
export default connect(
  mapStateToProps,
  null,
)(view)
