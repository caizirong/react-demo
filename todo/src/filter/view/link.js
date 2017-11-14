import React, { Children } from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../actions'

const Link = ({ children, active, onClick }) => {
  if (active) {
    return <b>{children}</b>
  } else {
    return (
      <a href="#" onClick={(ev) => {
        ev.preventDefault();
        onClick()
      }}>{children}</a>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    active: state.filter === ownProps.filter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick:() => {dispatch(setFilter(ownProps.filter))}
  }
  
}

export default connect (mapStateToProps, mapDispatchToProps)(Link)