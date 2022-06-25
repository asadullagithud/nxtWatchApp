import {HiHome} from 'react-icons/hi'
import {AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class SideBar extends Component {
  render() {
    const {value, value1, value2, value4} = this.props
    console.log(value)
    return (
      <div className="container-side">
        <ul className="container-side01">
          <li className="container-side-head">
            <Link to="/" className={value ? 'button--2' : 'button--1'}>
              <HiHome
                size={value ? 22 : 20}
                color={value ? 'red' : '#909090'}
                style={{margin: 5}}
              />
              Home
            </Link>
          </li>
          <li>
            <Link to="/trending" className={value2 ? 'button--2' : 'button--1'}>
              <AiFillFire
                size={value2 ? 22 : 20}
                color={value2 ? 'red' : '#909090'}
                style={{margin: 5}}
              />
              Trending
            </Link>
          </li>
          <li>
            <Link to="/gaming" className={value1 ? 'button--2' : 'button--1'}>
              <SiYoutubegaming
                size={value1 ? 22 : 20}
                color={value1 ? 'red' : '#909090'}
                style={{margin: 5}}
              />
              Gaming
            </Link>
          </li>
          <li>
            <Link
              to="/saved-videos"
              className={value4 ? 'button--2' : 'button--1'}
            >
              <MdPlaylistAdd
                size={value4 ? 22 : 20}
                color={value4 ? 'red' : '#909090'}
                style={{margin: 5}}
              />
              Saved Videos
            </Link>
          </li>
        </ul>
        <div className="container-side-02">
          <p className="para-side">CONTACT US</p>
          <div className="container-side3">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
              className="img-25"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
              className="img-25"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
              className="img-25"
            />
          </div>
          <p className="para-side1">
            Enjoy! Now to see your channels and recommendations!
          </p>
        </div>
      </div>
    )
  }
}
export default SideBar
