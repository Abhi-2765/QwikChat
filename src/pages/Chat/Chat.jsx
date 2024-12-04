import React from 'react'
import LeftSidebar from '../../Components/LeftSidebar'
import Chatbox from '../../Components/Chatbox'

const Chat = () => {
  return (
    <div className='h-[100%] bg-gradient-to-br from-blue-800 via-blue-600 to-pink-400 flex  overflow-none'>
      {/* Sidebar */}
      <div className='w-[20vw]'>
        <LeftSidebar />
      </div>

      {/* Chatbox */}
      <div className='flex-1'>
        <Chatbox />
      </div>
    </div>
  )
}

export default Chat
