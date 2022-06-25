import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="apex">
      <SideBar />
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
          alt="not found"
          className="not-found-img"
        />
        <h1 className="product-failure-heading-text">Page Not Found</h1>
        <p className="products-failure-description">
          we are sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
