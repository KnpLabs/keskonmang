import SignIn from './SignIn'
import { connect } from 'react-redux'
import { componentDidMount } from 'react-functional-lifecycle'
import { compose } from 'ramda'
import { signInButtonMounted } from './../../Redux/State/SignIn'

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  signInButtonMounted: compose(dispatch, signInButtonMounted),
})

const didMount = ({ signInButtonMounted }) => signInButtonMounted()

const lifecycles = compose(
  componentDidMount(didMount)
)(SignIn)

// SignIn :: Props -> React.Component
export default connect(
  null,
  mapDispatchToProps,
)(lifecycles)


// export default SignIn
