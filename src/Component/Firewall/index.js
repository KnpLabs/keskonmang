import { connect } from 'react-redux'
import Firewall from './Firewall'

const mapStateToProps = state => ({
  isSignedIn: state.SignIn.isSignedIn
})

export default connect(
  mapStateToProps,
)(Firewall)
