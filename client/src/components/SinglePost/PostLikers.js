import { NavLink } from "react-router-dom"

const PostLikers = ({likers, dislikers}) => {

    return (
        <>
        { (likers.length > 0 ) && (
        
            <p>Liked this post: {likers.map((liker) => {
                return(
                    <NavLink key={liker} to={`/userprofile/${liker}`}> {liker}</NavLink>
                )
            })}</p>
            
            )}
            
            { (dislikers.length > 0 ) && (
            
            <p>Haters: {dislikers.map((disliker) => {
                return(
                    <NavLink key={disliker} to={`/userprofile/${disliker}`}> {disliker}</NavLink>
                )
            })}</p>
            
            )}
        </>
    )
} 
export default PostLikers

