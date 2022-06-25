import {Component} from 'react'
import {AiFillFire} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import TrendingCard from '../TrendingCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    value2: true,
    Dataset: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.renderHomePage()
  }

  renderHomePage = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const url = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const Response = await fetch(url, options)
    const Data = await Response.json()
    console.log(Data)
    if (Response.ok === true) {
      const updateDate = Data.videos.map(video => ({
        id: video.id,
        publishedAt: video.published_at,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
      }))
      this.setState({Dataset: updateDate})
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
    console.log(Data)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <AiFillFire />
      <h1>Trending</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button type="button" onClick={this.renderHomePage} className="button01">
        Retry
      </button>
    </div>
  )

  renderNoVideo = () => (
    <div className="no-products-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
        className="no-products-img"
        alt="no products"
      />
      <h1 className="no-products-heading">No videos Found</h1>
      <p className="no-products-description">
        We could not find any videos. Try other filters.
      </p>
      <button type="button" onClick={this.renderHomePage} className="button01">
        Retry
      </button>
    </div>
  )

  renderGames = () => {
    const {Dataset} = this.state
    return (
      <div>
        <h1>Trending</h1>
        <ul className="container-trending">
          {Dataset.map(video => (
            <TrendingCard video={video} key={video.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGames()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {value2} = this.state
    console.log(value2)
    return (
      <div>
        <Header />
        <div className="apex">
          <SideBar value2={value2} />
          <div>{this.renderAllProducts()}</div>
        </div>
      </div>
    )
  }
}
export default Trending
