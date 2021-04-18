import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1 className='title'>Construct-A-Duck</h1>
    <nav>
      {isLoggedIn ? (
        <div className='nav-container'>
          <div className='nav-left'>
            <Link to='/construct'>Constructor</Link>
            <Link to='/info'>Information</Link>
          </div>
          <div className='nav-right'>
            <Link to='/home'>Home</Link>
            <a href='#' onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className='nav-container'>
          <div className='nav-left'>
            <Link to='/construct'>Construct-A-Duck</Link>
            <Link to='/info'>Information</Link>
          </div>
          <div className='nav-right'>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/login'>Login</Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

