import Histories from './Histories'
import { connect } from 'react-redux'
import { componentDidMount, componentWillUnmount } from 'react-functional-lifecycle'
import { clear, getHistories, getNextHistories } from './../../Redux/State/History'
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
  getNextHistories: compose(dispatch, getNextHistories),
  clear: compose(dispatch, clear),
})

const lifecycles = compose(
  componentDidMount(({ getHistories }) => getHistories()),
  componentWillUnmount(({ clear }) => clear()),
)(Histories)

// Histories :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
