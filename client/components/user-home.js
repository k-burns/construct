import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchDucks} from '../store/ducks'
import Nest from './nest'
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.email = props.email
  }

  componentDidMount() {
    this.props.getDucks(this.props.id)
  }

  render() {
    const ducks = this.props.ducks || []
    return (
      <div>
        <h3>Welcome to your nest, {this.email}</h3>
        <h5>Pick a duck to play with</h5>
        <div>{ducks.map(duck => {return
          (<div>{duck.name}</div>)})}</div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email,
  id: state.user.id,
  ducks: state.ducks
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
