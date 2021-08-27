import { connect } from 'react-redux'
import Logo from './Logo'
import { isNil } from 'ramda'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  restaurantShown: !isNil(state.RestaurantDetails.restaurant),
})

// Logo :: Props -> React.Component
export default connect(
  mapStateToProps,
  null,
)(Logo)
