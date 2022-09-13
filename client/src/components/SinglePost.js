import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteOwnedPost, updateOwnedPost, likePost, dislikePost } from '../features/posts/postsSlice'
import { FaTrash, FaRegEdit } from 'react-icons/fa'
import { StyledReactions } from '../styles/Reactions.styled'
import { StyledArticle } from '../styles/Article.styled'
import { StyledExcerpt } from '../styles/Excerpt.styled'
import { useSelector } from 'react-redux'
import { StyledUpdateForm } from '../styles/UpdateForm.styled'
import { EditPostForm, PostBody, PostDetails, PostImage, PostLikes, PostLikers } from './'


const SinglePost = ( {post}) => {

    ///rozdziel na dwa komponenty --> excerptData i excerptEdit ( w zależności czy editing działa)
    // form do updatu w osobnym komponencie koniecznie!!!!   <<<<<<<<<=========
    
    const { user } = useSelector((state) => state.users)
    const nickname = user? user.nickname : null


    const [postData, setPostData ] = useState({
        title: post.title,
        text: post.text,
        image: post.image,
        author: post.author,
        _id: post._id,
        createdAt: post.createdAt,
        likes: post.likes,
        dislikes: post.dislikes,
        likers: post.likers,
        dislikers: post.dislikers
        
      })    

    const id = post._id


    const dispatch = useDispatch()

    const [fullPost, setFullPost ] = useState(false) 

    const [ editing, setEditing] = useState( false)

    const handleShowFullPost = () => {
        setFullPost((prevState) => !prevState)
    }


    const handleUpdatePost = () => {
       
        setEditing((prevState) => !prevState)

      
        if (editing) {
          
            dispatch(updateOwnedPost(postData))
        }
    }

    const handleLikePost = () => {
        dispatch(likePost({id, nickname}))
        
    }

    const handleDislikePost = () => {
        dispatch(dislikePost({id, nickname}))
    }

    const excerptMaxLength = 400
    const postLength = post.text.length
    const isShowMoreButton = postLength > excerptMaxLength

    const shortTitle = ( title) => {
        const shortTitle = title.substring(0,15).toUpperCase()
        return shortTitle
    }

    //to do formu 
    const onPostFormChange = (e) => {
        setPostData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))  
      }  

   


    const isOwner = nickname === post.author
    const editOptions = isOwner? (
        <div className="flex">       
            <p style={{cursor: 'pointer', color: '#ff5c8a', transform: 'scale(1.4)'}} onClick={() => {
            dispatch(deleteOwnedPost(post._id))}}
            ><FaTrash /></p> 

            <p style={{cursor: 'pointer', color: '#80c99c',transform: 'scale(1.4)'}} onClick={ handleUpdatePost }
            ><FaRegEdit /></p>
        </div>
    ) : null

    return (
      
        <StyledArticle >
                <PostImage image={post.image}/>

            {editing && (
                <StyledUpdateForm>
                    <EditPostForm 
                    postData={postData} 
                    onPostFormChange={onPostFormChange} 
                    handleUpdatePost={handleUpdatePost} 
                    user={user}/> 
                </StyledUpdateForm>
            )}

            {!editing && (
                <StyledExcerpt>
                    <PostBody title={post.title} text={post.text} fullPost={fullPost} />
                    <StyledReactions>
                        <PostDetails author = {post.author} createdAt={post.createdAt}/>
                        <PostLikes 
                            likes={post.likes} 
                            dislikes={post.dislikes} 
                            fullPost={fullPost} 
                            handleDislikePost={handleDislikePost} 
                            handleLikePost={handleLikePost } 
                            isShowMoreButton={isShowMoreButton} 
                            handleShowFullPost={handleShowFullPost} 
                        />
                    </StyledReactions>
                    {editOptions}
                    <hr style={{"margin": "2rem 2rem"}}/>
                    <PostLikers likers={post.likers} dislikers={post.dislikers}/>
                </StyledExcerpt>
            )}

                <p className='shortTitle'>{shortTitle(post.title)}</p> 
                <div className="gradientCircle"></div>
            </StyledArticle>


        
    )
}

export default SinglePost