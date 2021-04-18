import React from 'react'
import { connect } from 'react-redux'
import { fetchDucks } from '../store'
import { Link } from 'react-router-dom'

class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.userName = props.userName
  }

  componentDidMount() {
    this.props.getDucks(this.props.id)
  }

  render() {
    const ducks = this.props.ducks || []
    return (
      <div className='home-container'>
        <h3 className='home-title'>Welcome to your nest, {this.userName}</h3>
        <h5>
          {/* load ducks or empty message */}
          {ducks.length
            ? 'Pick a duck to play with'
            : 'Uh oh! Your nest is empty! Why not go make a friend?'}
        </h5>
        <div className='nest-container'>
          {ducks.map((duck) => (
            <div className='nest-items' key={duck.id}>
              {/* link on duck name to view/edit the duck */}
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
  userName: state.user.userName,
  id: state.user.id,
  ducks: state.ducks
})

const mapDispatch = (dispatch) => ({
  getDucks: (userId) => dispatch(fetchDucks(userId))
})

export default connect(mapState, mapDispatch)(UserHome)
