import {useDispatch} from 'react-redux'
import { logout } from '../store/authSlice';
import {useNavigate} from 'react-router-dom'
function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutHandler = () => {
        dispatch(logout()); //state mein update krne kliye
        localStorage.removeItem("token")
        navigate('/')
  };
  return (
    <button
      className={`inline-bock md:px-6  py-2 duration-200 hover:bg-teal-500 rounded-full text-xl ${className}`}
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
