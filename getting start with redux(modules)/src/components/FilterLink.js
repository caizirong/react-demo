import React from 'react'
import {connect} from 'react-redux'
import Link from './Link'
import {setvisibilityFilter} from '../actions/index'
const mapStateToLinkProps = (
  state,
  ownProps // FilterLink自己的props,而不是传给子组件Link的props，传给子组件的是mapStateToLinkProps的返回值
) => ({
  active:
  ownProps.filter === state.visibilityFilter
})
const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => ({
  onClick() {
    dispatch(setvisibilityFilter(ownProps.filter));
  }
})

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);
export default FilterLink