import React, { useContext, useEffect, useState } from 'react'
import LeftSidebar from '../../Components/LeftSidebar'
import Chatbox from '../../Components/Chatbox'
import { AppContext } from '../../Context/AppContext';
import logo from '../../../public/profile.svg'

const Chat = () => {
  const {chatData, userData} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ 
    if(chatData && userData){
      setLoading(false);
    }
  }, [chatData, userData])

  return (
    <div className='h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-pink-400 flex overflow-hidden'>
      {loading ? (
        <div className='w-full h-full flex justify-center items-center'>
          <img src={logo} alt="" className='size-20 flex animate-pulse'/>
          <p className='text-4xl text-white'>Loading...</p>
        </div>
      ) : (
        <div className='flex w-full h-full'>
          <div className='w-[20vw]'>
            <LeftSidebar />
          </div>
          <div className='flex-1'>
            <Chatbox />
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat