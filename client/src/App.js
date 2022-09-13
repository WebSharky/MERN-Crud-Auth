import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Navbar} from './components'
import { Homepage, Login, Register, MyProfile, UserProfile} from './pages'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StyledContainer } from './styles/Container.styled'
import { StyledInnerContainer } from './styles/InnerContainer.styled'
import './reset.css' 






const App = () => {
    
    return (
        <>
        

        <BrowserRouter>
        <Navbar />

        <StyledContainer>
        <StyledInnerContainer>
            <Routes>
                <Route exact path='/' element={<Homepage />} />
                <Route exact path='/signin' element={<Login />} />
                <Route exact path='/signup' element={<Register />} />
                <Route exact path='/myprofile' element={<MyProfile />} />
                <Route exact path={'/userprofile/:nickname'} element={<UserProfile />} />
            </Routes>
        </StyledInnerContainer>
        </StyledContainer>

        </BrowserRouter>
        <ToastContainer />
        </>
    )
}

export default App