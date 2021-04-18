import React from 'react'
import { connect } from 'react-redux'
import { fetchDucks } from '../store/ducks'
import { Link } from 'react-router-dom'

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
      <div className='home-container'>
        <h3 className='home-title'>Welcome to your nest, {this.email}</h3>
        <h5>
          {ducks.length
            ? 'Pick a duck to play with'
            : 'Uh oh! Your nest is empty! Why not go make a freind?'}
        </h5>
        <div className='nest-container'>
          {' '}
          {ducks.map((duck) => (
            <div className='nest-items' key={duck.id}>
              <Link
                to={{
                  pathname: '/savedDuck',
                  state: { name: duck.name, color: duck.color, id: duck.id,}
                }}
              >
                {duck.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  email: state.user.email,
  id: state.user.id,
  ducks: state.ducks
})

const mapDispatch = (dispatch) => ({
  getDucks: (userId) => dispatch(fetchDucks(userId))
})

export default connect(mapState, mapDispatch)(UserHome)
