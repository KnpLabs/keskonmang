import RestaurantWheel from './RestaurantWheel'
import { connect } from 'react-redux'
import { handleAddress, getCoordinates } from '../../Redux/State/RestaurantWheel'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  address: state.address,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
    handleChange: e => dispatch(handleAddress(e.target.value)),
    submitForm: e => { 
        e.preventDefault(); 
        dispatch(getCoordinates());
    }
})

// RestaurantWheel :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantWheel)
