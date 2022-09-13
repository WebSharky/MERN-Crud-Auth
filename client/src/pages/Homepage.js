import { Form, PostsList} from '../components'
import { StyledInnerContainer } from '../styles/InnerContainer.styled'

const Homepage = () => {

    const mode = 'allPosts' 
    return (
        <>
        <StyledInnerContainer>
        <br/>
        <Form />
        <PostsList mode={mode}/>
        </StyledInnerContainer>
        </>
    )
} 
export default Homepage



