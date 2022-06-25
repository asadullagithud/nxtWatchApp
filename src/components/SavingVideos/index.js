import {Component} from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import Item from '../Item'
import CartContext from '../../context/CartContext'
import './index.css'

class SavingVideos extends Component {
  state = {
    value4: true,
  }

  CartListView = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <Item key={eachCartItem.id} video={eachCartItem} />
            ))}
          </ul>
        )
      }}
    </CartContext.Consumer>
  )

  renderNoVideo = () => (
    <div className="no-products-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        className="no-products-img"
        alt="No saved videos found"
      />
      <h1 className="no-products-heading">No saved videos found</h1>
      <p className="no-products-description">
        Save your videos by clicking a button
      </p>
      <button type="button" onClick={this.renderHomePage} className="button01">
        Retry
      </button>
    </div>
  )

  renderVideosListView = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <div>
            {cartList.length === 0 ? (
              <div className="products-error-view-container1">
                {this.renderNoVideo()}
              </div>
            ) : (
              this.CartListView()
            )}
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    const {value4} = this.state
    console.log(value4)
    return (
      <div>
        <Header />
        <div className="apex">
          <SideBar value4={value4} />
          <h1>Saved Videos</h1>
          {this.renderVideosListView()}
        </div>
      </div>
    )
  }
}
export default SavingVideos
