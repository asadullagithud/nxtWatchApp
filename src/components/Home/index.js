import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import SideBar from '../SideBar'
import Card from '../Card'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    value: true,
    searchVal: '',
    Dataset: [],
    apiStatus: apiStatusConstants.initial,
    Get: true,
  }

  componentDidMount() {
    this.renderHomePage()
  }

  getFormattedData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
  })

  renderHomePage = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const {searchVal} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchVal}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const Response = await fetch(url, options)
    const Data = await Response.json()
    if (Response.ok === true) {
      const updateDate = Data.videos.map(video => ({
        id: video.id,
        publishedAt: video.published_at,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
        name: video.channel.name,
        profileImageUrl: video.channel.profile_image_url,
      }))
      this.setState({Dataset: updateDate})
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
    console.log(Data)
  }

  search = event => {
    this.setState({searchVal: event.target.value}, this.renderHomePage)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
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
        alt="no videos"
      />
      <h1 className="no-products-heading">No Search results found</h1>
      <p className="no-products-description">
        Try different key words or remove search filter.
      </p>
      <button type="button" onClick={this.renderHomePage} className="button01">
        Retry
      </button>
    </div>
  )

  renderVideo = () => {
    const {Dataset} = this.state
    return (
      <div>
        <ul className="container-card-ul">
          {Dataset.map(video => (
            <Card video={video} key={video.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderVideosListView = () => {
    const {Dataset} = this.state
    return (
      <div>
        {Dataset.length === 0 ? (
          <div className="products-error-view-container1">
            {this.renderNoVideo()}
          </div>
        ) : (
          this.renderVideo()
        )}
      </div>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getIt = () => {
    this.setState({Get: false})
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    const {value, searchVal, Get} = this.state
    console.log(value)
    return (
      <div>
        <Header />
        <div className="apex">
          <SideBar value={value} />
          <div>
            {Get && (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="nxt watch logo"
                  className="img01"
                />
                <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                <button type="button" onClick={this.getIt} data-testid="close">
                  GET IT NOW
                </button>
              </div>
            )}
            <div className="search">
              <input
                type="search"
                placeholder="search"
                value={searchVal}
                className="input01"
                onChange={this.search}
                id="search"
              />
              <button
                type="button"
                onClick={this.search}
                className="iocButton"
                data-testid="searchButton"
              >
                <AiOutlineSearch size={19} />
              </button>
            </div>
            {this.renderAllProducts()}
          </div>
        </div>
      </div>
    )
  }
}
export default Home
