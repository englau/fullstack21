import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit,username,password,changeUsername,changePassword }) => {
  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
  username
          <input id = "username" type = "text"  value = {username} name="username" onChange={changeUsername} />
        </div>
        <div>
  Password
          <input id = "password" type = "text"  value = {password} name="password" onChange={changePassword} />
        </div>
        <button id = "loginbutton" type ="submit"> login </button>
      </form>
    </div>
  )


}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeUsername: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired
}
export default LoginForm