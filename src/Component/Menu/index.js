import Menu from './Menu'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { signOut } from './../../Redux/State/SignIn'

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  signOut: compose(dispatch, signOut),
})

// Menu :: Props -> React.Component
export default connect(
  null,
  mapDispatchToProps,
)(Menu)
