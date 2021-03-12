import { connect } from 'react-redux'
import Logo from './Logo'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  restaurantShown: state.RestaurantDetails.restaurant !== null,
})

// Logo :: Props -> React.Component
export default connect(
  mapStateToProps,
  null,
)(Logo)
