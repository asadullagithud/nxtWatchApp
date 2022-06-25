import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import './index.css'

const Item = props => {
  const {video} = props
  const {publishedAt, thumbnailUrl, viewCount, title, id, name} = video
  const NewDate = new Date(publishedAt).getTime()
  const Year = new Date(NewDate).getFullYear()
  const OurNewDateFormate = `${Year}`
  const Time = formatDistanceToNow(new Date(OurNewDateFormate))
  const result = Time.replace('about', 'ago')
  const myArray = result.split(' ')
  const result1 = myArray[1].concat(' ', myArray[2], ' ', myArray[0])
  return (
    <Link to={`/video/${id}`}>
      <li className="container-Trend">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="icon-image-tren"
        />
        <div className="container-card02">
          <div className="container4">
            <p className="para-card9">{title}</p>
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
export default Item
