import SignIn from './SignIn'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { signIn } from './../../Redux/State/SignIn'

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  signIn: compose(dispatch, signIn),
})

// SignIn :: Props -> React.Component
export default connect(
  null,
  mapDispatchToProps,
)(SignIn)