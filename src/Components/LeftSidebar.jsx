import React, { useContext, useState } from 'react';
import logo from '../assets/profile2.svg';
import defUser from '../assets/default.png';
import { db, logout } from '../Config/firebase';
import { useNavigate } from 'react-router-dom';
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import {AppContext} from '../Context/AppContext.jsx'
import { toast } from 'react-toastify';

const LeftSidebar = () => {
  const nav = useNavigate();
  const {userData, chatData, chatUser, setChatUser, setMessagesId, messagesId} = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);


  // Search Bar

  const inputHandler = async (e) => {
    try {
      const input = e.target.value.trim();
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, 'users');
        const q = query(userRef, where('username', '==', input.toLowerCase()));
        const querySnap = await getDocs(q);
  
        if (!querySnap.empty) {
          const queriedUser = querySnap.docs[0];

          if (queriedUser.id !== userData.id) {
            let userExist = false;
            chatData.map((user) => {
              if(user.rId === queriedUser.data().id){
                userExist = true;
              }
            })

            if(!userExist){
              setUser(queriedUser.data());
            }

          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      console.error('Error searching for user:', error);
    }
  };
  
  // Add chat to firebase

  const addChat = async () =>{
    const msgRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");
    try {
      const newMessageRef = doc(msgRef);

      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages:[]
      })

      await updateDoc(doc(chatsRef, user.id),{
        chatsData:arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updatedAt: Date.now(),
          messageSeen:true,
        })
      })

      await updateDoc(doc(chatsRef, userData.id),{
        chatsData:arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: user.id,
          updatedAt: Date.now(),
          messageSeen:true,
        })
      })
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  // Set Chat Data

  const setChat = async (item) => {
    setMessagesId(item.messageId);
    setChatUser(item);
  }

  // menu Click

  const profileClick = () => {
    nav('/profile');
  };

  return (
    <div className="bg-[#001030] text-white h-screen max-w-[20vw] flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="p-6">
        {/* Logo and Menu */}
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="QwikChat Logo" className="w-10" />
            <p className="text-[22px] font-semibold">QwikChat</p>
          </div>

          {/* Menu Icon */}
          <div className="relative group cursor-pointer opacity-70 hover:opacity-100 transition-opacity px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>

            {/* Dropdown Menu */}
            <div className="absolute top-[100%] right-0 hidden group-hover:block w-[200px] p-3 rounded-sm bg-blue-200 text-black shadow-lg z-10">
              <p className="cursor-pointer text-[15px] hover:font-bold" onClick={profileClick}>
                Edit Profile
              </p>
              <hr className="border-gray-300 my-2" />
              <p className="cursor-pointer text-[15px] hover:font-bold" onClick={() => logout()}>
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-[#002670] flex items-center rounded-lg px-3 py-2 mt-6 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-gray-300"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent text-white placeholder-gray-400 outline-none ml-3 w-full"
            onChange={inputHandler}
          />
        </div>

        {/* Friends Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Friends</h2>
          <div className="space-y-2 overflow-y-scroll h-80 pr-2">
          {showSearch && user
          ? (
            <div className="flex items-center gap-3 p-2 bg-[#002670] rounded-lg hover:bg-gradient-to-br from-blue-800 via-blue-600 to-pink-400 hover:text-white transition" onClick={addChat}>
              <img
                src={defUser}
                alt="Searched User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{user.username}</p>
                <span className="text-sm text-gray-400">{user.name}</span>
              </div>
            </div>
          )
         : (
            chatData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 bg-[#002670] rounded-lg hover:bg-gradient-to-br from-blue-800 via-blue-600 to-pink-400 hover:text-white transition"
                onClick={()=>{setChat(item)}}
              >
                <img
                  src={defUser}
                  alt={`${index + 1}`}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{item.userData.name}</p>
                  <span className="text-sm text-gray-400 hover:text-white">
                    {item.lastMessage}
                  </span>
                </div>
              </div>
            ))
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
