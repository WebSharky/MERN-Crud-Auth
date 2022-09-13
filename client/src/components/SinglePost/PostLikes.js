
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'



const PostLikes = ({likes, dislikes, fullPost, handleDislikePost, handleLikePost, isShowMoreButton, handleShowFullPost}) => {

    const styleUp = { color: "#57cee6", transform: 'scale(2, 2)', cursor: 'pointer' }
    const styleDown = { color: "#ff5c8a", transform: 'scale(2, 2) translateY(20%)', cursor: 'pointer' }

    return (
      <div className="flex">
      <p onClick={handleLikePost}><FaThumbsUp style={styleUp} /></p><p>{likes? likes.toString() : 0}</p>
      <p onClick={handleDislikePost}><FaThumbsDown style={styleDown}/></p><p>{dislikes? dislikes.toString() : 0}</p>
      {isShowMoreButton&&(<button onClick={handleShowFullPost}>{fullPost? 'Collapse post' : 'Expand post'}</button>)}
      </div>
        
    )
} 
export default PostLikes