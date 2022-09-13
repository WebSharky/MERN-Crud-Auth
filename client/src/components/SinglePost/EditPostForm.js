import { StyledUpdateForm } from "../../styles/UpdateForm.styled"
import { StyledReactions } from "../../styles/Reactions.styled"


const EditPostForm = ({postData, onPostFormChange, handleUpdatePost, user}) => {

    return (
        <StyledUpdateForm>

        <form>
            <div>
            <label htmlFor="postTitle">Post Title: </label>
            <input 
                type="text"
                id="title"
                name="title"
                value={postData.title}
                onChange={onPostFormChange}
            />
            </div>
        
            <div>
            <label htmlFor="postContent">Content: </label>
            <textarea 
                id="text"
                name="text"
                value={postData.text}
                onChange={onPostFormChange}
                rows="3"
            />
            </div>
            <div>
            <label htmlFor="postImage">Image: </label>
            <textarea 
                id="image"
                name="image"
                value={postData.image}
                onChange={onPostFormChange}
                placeholder='Paste here your image url'
            />
            </div>
            <StyledReactions>
            <button 
                type="button"
                onClick={handleUpdatePost}
                disabled={!user}
                
                >
                Update Post 
            </button>
            </StyledReactions>
        </form>
        </StyledUpdateForm>
        
    )
} 
export default EditPostForm