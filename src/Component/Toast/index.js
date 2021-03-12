import { connect } from 'react-redux'
import { removeToast } from '../../Redux/State/Toast'
import Toast from './Toast'
import { compose } from 'ramda'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  toasts: state.Toast.toasts,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  remove: compose(dispatch, removeToast),
})

// Toast :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toast)
