import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
import Profile from './pages/Profile/Profile'
import ProfilePopUp from './Components/ProfilePopUp'
import { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { signup, login, logout, auth, db } from './Config/firebase.js'
import { AppContext } from './Context/AppContext.jsx';

function App() {

  const nav = useNavigate();
  const {loadUserData} = useContext(AppContext);

  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        nav('/chat');
        await loadUserData(user.uid);
      }
      else{
        nav('/');
      }
    })
  }, []);

  return (
    <div className='overflow-none'>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/profile' element={<Profile/>}/>
          {/* <Route path='/friend' element={<ProfilePopUp/>}/> */}
      </Routes>
    </div>
  )
}

export default App
