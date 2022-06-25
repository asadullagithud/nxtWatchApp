import {Link} from 'react-router-dom'
import './index.css'

const GameCard = props => {
  const {video} = props
  const {thumbnailUrl, viewCount, title, id} = video
  return (
    <Link to={`/videos/${id}`}>
      <li className="container-game">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="icon-image-game"
        />
        <p className="para-game">{title}</p>
        <p className="para-game01">{viewCount} Watching WorldWide</p>
      </li>
    </Link>
  )
}
export default GameCard
