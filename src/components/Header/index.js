import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {BsMoon} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Popup} from 'reactjs-popup'
import './index.css'

class Header extends Component {
  good = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  theme = () => {
    const {changeValue} = this.props
    changeValue()
  }

  render() {
    return (
      <div className="container01">
        <div className="container02">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="img01"
            />
          </Link>
        </div>
        <div className="container03">
          <button type="button" data-testid="theme" onClick={this.theme}>
            <BsMoon className="ionc" />
          </button>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
            className="image-1"
          />
          <div className="popup-container">
            <Popup
              modal
              trigger={
                <button type="button" className="button-1">
                  Logout
                </button>
              }
            >
              {close => (
                <>
                  <div className="containerPop">
                    <div className="containerPop1">
                      <p className="papa-Pop">
                        Are you sure, you want to logout
                      </p>
                      <div className="containerPop2">
                        <button
                          type="button"
                          className="button-pop-1"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="button-pop-2"
                          onClick={this.good}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)
