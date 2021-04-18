import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1 className = 'title'>Construct-A-Duck</h1>
    <nav>
      {isLoggedIn ? (
        <div className = 'nav-container'>

          {/* The navbar will show these links after you log in */}
          <div className = 'nav-left'>
          <Link to="/construct">Constructor</Link>
          <Link to= "/info">Information</Link>
          </div>
          <div className = 'nav-right'>
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          </div>
        </div>
      ) : (
        <div className = 'nav-container'>
          {/* The navbar will show these links before you log in */}
          <div className = 'nav-left'>
          <Link to="/construct">Construct-A-Duck</Link>
          <Link to= "/info">Information</Link>
          </div>
          <div className = 'nav-right'>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
