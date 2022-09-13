import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {selectAllPosts, getPostsStatus, getPostsError, fetchPosts} from '../features/posts/postsSlice'
import Spinner from "./Spinner"
import SinglePost from "./SinglePost"



const PostsList = () => {

  


    const dispatch = useDispatch()

    const posts = useSelector(selectAllPosts)
    const reversedPosts = [...posts].reverse()
    const postsStatus = useSelector(getPostsStatus)
    const postsError = useSelector(getPostsError)

  
    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])




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
            postsContent = <Spinner />
           

    }


    return (

        <div>

       
       
        {postsContent}
       
       
        </div>



    )
} 

export default PostsList