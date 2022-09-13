import { useSelector} from 'react-redux'


const MyProfile = () => {

    const { nickname } = useSelector((state) => state.users.user)

    return (
        <>
        <h1>My Profile</h1>
        <p>Hello {nickname? nickname : null}</p>
        <p>You can edit your account's details here</p>
        </>
    )
} 

export default MyProfile