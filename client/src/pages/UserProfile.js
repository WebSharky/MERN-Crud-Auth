
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAllPostsOfUser, getPostsStatus, getPostsError, fetchPostsByUser } from "../features/posts/postsSlice"
import SinglePost from '../components/SinglePost'
import Spinner from '../components/Spinner'


const UserProfile = () => {

    const params = useParams()
    const { nickname } = params

    const dispatch = useDispatch()
    const userPosts = useSelector(selectAllPostsOfUser)
    const reversedPosts = [...userPosts].reverse()
    const postsStatus = useSelector(getPostsStatus)
    const postsError = useSelector(getPostsError)

  
    useEffect(() => {
        dispatch(fetchPostsByUser({nickname}))
    }, [nickname, dispatch])

    // useEffect(() => {
    //     if (postsStatus === 'idle') {
    //         dispatch(fetchPostsByUser({nickname}))
    //     }
    //     console.log(userPosts)
    // }, [postsStatus, dispatch, nickname, params])




    let postsContent
    switch (postsStatus) {
        case 'loading':
            postsContent = <Spinner />
            break
        case 'succeeded':
            postsContent = reversedPosts.map( post => <SinglePost key = {post._id} post = {post}/>)
         
            break
        case 'failed':
            postsContent = <p>{postsError}</p>
            break
        default:
            postsContent = <p><Spinner /></p>
           

    }







    return (
        <div>
        <h1>{`This is user's profile of ${nickname}`}</h1>
        <p>User's photo or just user image</p>
        <p>User's description</p>

        
        <p>This user has NUMBER_OF_POSTS posts</p>
        {postsContent}

        </div>
    )
} 

export default UserProfile