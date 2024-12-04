import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
import Profile from './pages/Profile/Profile'
import ProfilePopUp from './Components/ProfilePopUp'

function App() {
  return (
    <div className='overflow-none'>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/friend' element={<ProfilePopUp/>}/>
      </Routes>
    </div>
  )
}

export default App
