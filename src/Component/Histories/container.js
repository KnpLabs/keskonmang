import Histories from './Histories'
import { connect } from 'react-redux'
import { componentDidMount, componentWillUnmount } from 'react-functional-lifecycle'
import { clear, getHistories, getNextHistories } from './../../Redux/State/History'
import { compose, groupBy } from 'ramda'

// pageName :: String
const pageName = 'history-page'

// formatByDate :: Array -> Object
const formatByDate = groupBy(history => new Date(history.createdAt).toLocaleDateString())

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  histories: formatByDate(state.History.histories),
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
  componentDidMount(() => window.document.querySelector('body').classList.add(pageName)),
  componentDidMount(({ getHistories }) => getHistories()),
  componentWillUnmount(() => window.document.querySelector('body').classList.remove(pageName)),
  componentWillUnmount(({ clear }) => clear()),
)(Histories)

// Histories :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
