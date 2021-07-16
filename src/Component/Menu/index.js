import Menu from './Menu'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { signOut } from './../../Redux/State/SignIn'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  user: state.Session.user,
  isSignedIn: state.SignIn.isSignedIn,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  signOut: compose(dispatch, signOut),
})

// Menu :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu)
