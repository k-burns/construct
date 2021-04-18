import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addDuck, fetchDucks} from '../store/ducks'
import {Link} from 'react-router-dom'

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
      <div className = 'home-container'>
        <h3 className = 'home-title'>Welcome to your nest, {this.email}</h3>
        <h5>{ducks.length ? 'Pick a duck to play with' : 'Uh oh! Your nest is empty! Why not go make a freind?'}</h5>
        <div className = 'nest-container'> {ducks.map(duck => <div className = 'nest-items' key = {duck.name}><Link to={{pathname:"/savedDuck", state:{id: duck.id, color: duck.color, name: duck.name}}}>{duck.name}</Link></div>)}</div>
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
