import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

//component for both login and create user
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className = 'signin-form'>
      <h2 className ='signin-header'>{displayName}</h2>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="userName">
            <small>User Name</small>
          </label>
          <input name="userName" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

//login map state
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

//signup map state
const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const userName = evt.target.userName.value
      const password = evt.target.password.value
      dispatch(auth(userName, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

