import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {NavLink, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { logout, reset } from '../features/users/usersSlice'
import { StyledNavbar } from '../styles/Navbar.styled'


const Navbar = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.users)
    const nickname  = user? user.nickname : null

  
 
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }


    return (
        <StyledNavbar>
        <NavLink to="/"><p> MERN CRUD </p></NavLink>
        <ul>            
        <div className='navUl'>
             { user? (
            <>
            <li>{nickname}</li> 
            <li><NavLink to="/myprofile"> <FaUser /> My Profile</NavLink></li>
            <li onClick={onLogout}> <FaSignOutAlt /> Logout</li>
            
            </>
            ) : 
            ( <>
            <li><NavLink to="/signin"> <FaSignInAlt /> Sign In</NavLink></li> 
            <li><NavLink to="/signup"> <FaUser /> Sign Up</NavLink></li> 
            </>) }
            </div>
        </ul>
        </StyledNavbar>
        
    )
} 
export default Navbar