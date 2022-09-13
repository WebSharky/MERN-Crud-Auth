import { useState, useEffect } from "react"
import { FaSignInAlt} from 'react-icons/fa'
import Spinner from "../components/Spinner"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import { login, reset } from "../features/users/usersSlice"
import { StyledForm } from "../styles/Form.styled"

const Login = () => {
  
  const [ loginData, setLoginData] = useState({
   userLogin: '',
   password: ''
  })

  const { userLogin, password } = loginData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])



  const onChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      login: userLogin,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
        
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please Sign In</p>
      </section>

      <section className='form'>
        <StyledForm>
        <form onSubmit={onSubmit}>

        <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='userLogin'
              name='userLogin'
              value={userLogin}
              placeholder='Enter your login'
              onChange={onChange}
            />
          </div>

          
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block' >
              Submit
            </button>
          </div>
        </form>
        </StyledForm>
      </section>
    </> )

   
   
} 

export default Login