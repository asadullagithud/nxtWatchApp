import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoDetails extends Component {
  state = {
    value: true,
    apiStatus: apiStatusConstants.initial,
    videoDetails: [],
    button01: false,
    button02: false,
    button03: false,
  }

  componentDidMount() {
    this.renderHomePage()
  }

  getFormattedData = data => ({
    id: data.id,
    publishedAt: data.published_at,
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    viewCount: data.view_count,
    videoUrl: data.video_url,
    description: data.description,
    name: data.channel.name,
    profileImageUrl: data.channel.profile_image_url,
  })

  renderHomePage = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const jwsToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwsToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      const videoDetails = this.getFormattedData(data.video_details)
      /*
      const videoDetails = data.video_details.map(video => ({
        id: video.id,
        publishedAt: video.published_at,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
        name: video.video_details.channel.name,
        profileImageUrl: video.video_details.channel.profile_image_url,
        description: video.description,
        videoUrl: video.video_url,
      }))
      */
      this.setState({
        apiStatus: apiStatusConstants.success,
      })
      this.setState({videoDetails})
      console.log(videoDetails)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  button01 = () => {
    this.setState(prevState => ({button01: !prevState.button01}))
    this.setState({button02: false})
  }

  button02 = () => {
    this.setState(prevState => ({button02: !prevState.button02}))
    this.setState({button01: false})
  }

  button03 = () => {
    this.setState(prevState => ({button03: !prevState.button03}))
  }

  renderJobItemDetails = () => (
    <CartContext.Consumer>
      {value => {
        const {videoDetails, button01, button02, button03} = this.state
        const {
          publishedAt,
          title,
          viewCount,
          description,
          videoUrl,
          name,
          profileImageUrl,
        } = videoDetails
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem(videoDetails)
        }
        const token = Cookies.get('jwt_token')
        if (token === undefined) {
          return <Redirect to="/login" />
        }
        return (
          <div className="full-job-item-container">
            <ReactPlayer url={videoUrl} width="900px" height="480px" />
            <p className="heading98">{title}</p>
            <div>
              <div className="container-0">
                <div className="container-02">
                  <p className="para-8">{viewCount} views *</p>
                  <p className="para-8">{publishedAt}</p>
                </div>
                <div className="container-02">
                  <button
                    type="button"
                    className="button98"
                    onClick={this.button01}
                  >
                    <AiOutlineLike
                      size={20}
                      color={button01 ? 'blue' : 'black'}
                    />
                    Like
                  </button>
                  <button
                    type="button"
                    className="button98"
                    onClick={this.button02}
                  >
                    <AiOutlineDislike
                      size={20}
                      color={button02 ? '#2563eb' : '#64748b'}
                    />
                    Dislike
                  </button>
                  <button
                    type="button"
                    className="button98"
                    onClick={this.button03}
                  >
                    <MdPlaylistAdd
                      size={20}
                      color={button03 ? '#2563eb' : '#64748b'}
                      onClick={onClickAddToCart}
                    />
                    Save
                  </button>
                </div>
              </div>
              <div className="container-channel">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="img-98"
                />
                <div className="container-channel-name">
                  <p className="heading87">{name}</p>
                  <p className="para-98">{description}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderFailureView = () => (
    <div className="render-loading-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong </h1>
      <p className="failure-desc">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        type="button"
        testid="button"
        className="job-item-failure-button"
        onClick={this.getFunction}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {value} = this.state
    return (
      <div>
        <Header />
        <div className="apex">
          <SideBar value={value} />
          <div>{this.renderAllProducts()}</div>
        </div>
      </div>
    )
  }
}
export default VideoDetails
