import { useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { addNewPost } from '../features/posts/postsSlice'
import { StyledForm } from "../styles/Form.styled";
import { StyledReactions } from '../styles/Reactions.styled';

const Form = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.users)
    const creator = user? user.nickname : <p>Not logged in</p>
    

    const [ postData, setPostData] = useState({
        title: '',
        text: '',
        image: '',
        author: creator,
        
      })    

    const { title, text, image, author } = postData
  
    const onPostFormChange = (e) => {
      setPostData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))  
    }  


    const [ addRequestStatus, setAddRequestStatus] = useState('idle')

    const canSave = [ title, text, image, author].every(Boolean) && addRequestStatus === 'idle'

    const onSaveClicked = () => {
      
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost(postData))

                setPostData({
                    title: '',
                    text: '',
                    image: '',
                    author: creator,
                  })    
               
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
           
        }
    }




 



    return (
       
    <section style={{"display": 'block'}}>
       <StyledForm>
        <form>
            <div>
            <label htmlFor="postTitle">Post Title: </label>
            <input 
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={onPostFormChange}
            />
            </div>

            <div>
            <label htmlFor="postContent">Content: </label>

            <textarea 
                id="text"
                name="text"
                value={text}
                onChange={onPostFormChange}
                rows="3"
            />
            </div>


            <div>
            <label htmlFor="postImage">Image: </label>
            <textarea 
                id="image"
                name="image"
                value={image}
                onChange={onPostFormChange}
                placeholder='Paste here your image url'
            />
            </div>

            
            {/* <StyledFlex>
            <label htmlFor="postAuthor">Author: {user? author : null} </label>
            </StyledFlex> */}
           
            



            <StyledReactions>
            <button 
                type="button"
                onClick={onSaveClicked}
                disabled={!user}
                
                >
                Publish Post 
            </button>

            {!user? <p>You must be logged in in order to add a post.</p>: <p>Share your thoughts with the world.</p>}
            </StyledReactions>
        </form>



                </StyledForm>

           

          
    </section>

 

    )
} 

export default Form