import { NavLink } from "react-router-dom"

const PostDetails = ({author, createdAt}) => {



    return (
        <div className="flex">
        <NavLink to={`/userprofile/${author}`}>
        {author? (<p>{author}</p>): <p>unknown to mankind</p>}
        </NavLink>
        <p>{createdAt}</p>
        </div>
        
    )
} 
export default PostDetails