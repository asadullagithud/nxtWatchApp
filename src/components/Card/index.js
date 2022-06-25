import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import './index.css'

const Card = props => {
  const {video} = props
  const {
    publishedAt,
    thumbnailUrl,
    viewCount,
    title,
    profileImageUrl,
    name,
    id,
  } = video
  const NewDate = new Date(publishedAt).getTime()
  const Year = new Date(NewDate).getFullYear()
  const OurNewDateFormate = `${Year}`
  const Time = formatDistanceToNow(new Date(OurNewDateFormate))
  const result = Time.replace('about', 'ago')
  const myArray = result.split(' ')
  const result1 = myArray[1].concat(' ', myArray[2], ' ', myArray[0])
  return (
    <Link to={`/videos/${id}`}>
      <li className="container-card">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="icon-image-wall"
        />
        <div className="container-card02">
          <div>
            <img
              src={profileImageUrl}
              alt="channel logo"
              className="icon-image"
            />
          </div>
          <div className="container04">
            <p className="para-card">{title}</p>
            <p className="para-card0">{name}</p>
            <div className="container-card03">
              <p className="para-card0">{viewCount} views</p>
              <p className="para-card0">{result1}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default Card
