import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    IsState: false,
    username: '',
    password: '',
    visibility: '',
    error: '',
  }

  good = event => {
    event.preventDefault()
    /*
    this.setState(prevState => ({
      IsState: !prevState.IsState,
    }))
    */
    this.goodSeen()
  }

  resultResponse = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  resultResponseNot = error => {
    this.setState({error})
    this.setState(prevState => ({
      IsState: !prevState.IsState,
    }))
  }

  goodSeen = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const Response = await fetch(url, options)
    const Data = await Response.json()
    console.log(Data)
    if (Response.ok === true) {
      this.resultResponse(Data.jwt_token)
    } else {
      this.resultResponseNot(Data.error_msg)
    }
  }

  checkbox = event => {
    if (event.target.checked) {
      this.setState({visibility: true})
    } else {
      this.setState({visibility: false})
    }
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  username = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const {IsState, password, username, visibility, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
        <div className="container-1">
          <div className="container-2">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="img-logo"
            />
          </div>
          <form className="container-3" onSubmit={this.good}>
            <label htmlFor="USERNAME" className="label">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="username"
              value={username}
              className="input"
              id="USERNAME"
              onChange={this.username}
            />
            <label htmlFor="PASSWORD" className="label">
              PASSWORD
            </label>
            <input
              type={visibility ? 'text' : 'password'}
              placeholder="password"
              value={password}
              className="input-p"
              id="PASSWORD"
              onChange={this.password}
            />
            <div className="checkbox">
              <input type="checkbox" id="checkbox" onClick={this.checkbox} />
              <label htmlFor="checkbox" className="checkbox">
                Show password
              </label>
            </div>
            <div className="container-4">
              <button type="submit" className="button" color="#ffffff">
                Login
              </button>
              {IsState && <p className="para">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
