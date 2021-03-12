import Histories from './Histories'
import { connect } from 'react-redux'
import { componentDidMount } from 'react-functional-lifecycle'
import { getHistories } from './../../Redux/State/History'
import { compose } from 'ramda'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  histories: state.History.histories,
  page: state.History.page,
  totalPages: state.History.totalPages,
  loading: state.History.loading,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  getHistories: compose(dispatch, getHistories),
})

const didMount = ({ getHistories }) => getHistories()

const lifecycles = compose(
  componentDidMount(didMount)
)(Histories)

// Histories :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
