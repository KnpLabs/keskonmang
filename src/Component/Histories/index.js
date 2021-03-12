import Histories from './container'
import { connect } from 'react-redux'
import React from 'react'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  isLogged: state.Session.user !== null
})

const view = ({isLogged, ...props}) => isLogged
  ? <Histories {...props} />
  : null

// Histories :: Props -> React.Component
export default connect(
  mapStateToProps,
  null,
)(view)
