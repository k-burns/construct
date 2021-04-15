import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchDucks} from '../store/ducks'
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.email = props.email
  }

  componentDidMount() {
    this.props.getDucks()
  }

  render() {
    return (
      <div>
        <h3>Welcome to your nest, {this.email}</h3>
        <h5>Pick a duck to play with</h5>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email
})

const mapDispatch = dispatch => ({
  getDucks: userId => dispatch(fetchDucks(userId))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
