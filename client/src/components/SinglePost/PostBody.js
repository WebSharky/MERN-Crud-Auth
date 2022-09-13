
const PostBody = ({title, text, fullPost}) => {

    const excerptMaxLength = 400
    const postLength = text.length

    return (
        <div >
        {title? <h3>{title}</h3> : <h3>no title available</h3>}
        {text? <p style={{"transitionDuration": "150ms"}}>{!fullPost? (text.substring(0, excerptMaxLength)) : text}</p> : <h3>ni ma ciała postu</h3>}
        </div>
        
    )
} 
export default PostBody