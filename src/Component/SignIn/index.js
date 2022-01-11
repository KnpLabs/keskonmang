import SignIn from './Container'
import React from 'react'
import { connect } from 'react-redux'
import { componentDidMount } from 'react-functional-lifecycle'
import { compose } from 'ramda'
import { initialize } from './../../Redux/State/SignIn'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  isInitialized: state.SignIn.initialized,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  initialize: compose(dispatch, initialize),
})

const didMount = ({ initialize }) => initialize()

const View = ({ isInitialized }) => isInitialized  ? <SignIn /> : null

const lifecycles = componentDidMount(didMount)(View)

// SignIn :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
