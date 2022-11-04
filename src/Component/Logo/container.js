import { connect } from 'react-redux'
import Logo from './Logo'
import { equals, isNil } from 'ramda'

// mapStateToProps :: State -> Props
const mapStateToProps = (state, { currentPath }) => ({
  restaurantShown: !isNil(state.RestaurantDetails.restaurant),
  historiesShown: equals(currentPath, '/history'),
})

// Logo :: Props -> React.Component
export default connect(
  mapStateToProps,
  null,
)(Logo)
