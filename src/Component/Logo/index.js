import { connect } from 'react-redux'
import Logo from './Logo'
import { compose } from 'ramda'
import { backToSearch } from './../../Redux/State/RestaurantWheel'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  restaurantShown: state.RestaurantWheel.restaurantShown,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  backToSearch: compose(dispatch, backToSearch)
})

// Logo :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logo)
