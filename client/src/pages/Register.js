import {useState, useEffect} from 'react'
import { FaUser} from 'react-icons/fa'
import { useSelector, useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset} from '../features/users/usersSlice'
import Spinner from '../components/Spinner'
import { StyledForm } from '../styles/Form.styled'

const Register = () => {
  
  
  const [ registerData, setRegisterData] = useState({
    login: '',
    nickname: '',
    description: '',
    email: '',
    password: '',
    confirmPassword: ''
  })    
  
  const { login, nickname, description, email, password, confirmPassword } = registerData
  
  const onChange = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))  
  }  
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
    
    
    const onSubmit = (e) => {
    e.preventDefault()
 

    if (password !== confirmPassword) {
      toast.error('Please reapeat the password')
    } else {
      const userData = {
        login,
        nickname,
        description,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
   
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Let's create an account</p>
      </section>

      <section className='form'>
    <StyledForm>
        <form onSubmit={onSubmit}>

        <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='login'
              name='login'
              value={login}
              placeholder='Enter your login ( unvisible for other )'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='nickname'
              value={nickname}
              placeholder='Enter your nickname ( visible for other users )'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='description'
              name='description'
              value={description}
              placeholder='Enter a brief summary of your person'
              onChange={onChange}
            />
          </div>




          
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email ( unvisible for other users)'
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
            <input
              type='password'
              className='form-control'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </StyledForm>
      </section>
    </>
  )
}

export default Register