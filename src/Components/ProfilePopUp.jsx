import React, { useContext, useState } from 'react';
import defUser from '../assets/default.png';
import { AppContext } from '../Context/AppContext';

const ProfilePopUp = (props) => {

  const {userData, messagesId, chatUser, messages, setMessages} = useContext(AppContext) ;

  return (
    <div
      className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 z-50"
      onClick={props.onClose}
    >
      <div
        className="bg-blue-950 text-white shadow-lg max-w-sm w-full p-4 relative mt-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Profile Section */}
        <div className="text-center mb-6">
          <img
            className="w-24 h-24 rounded-full border-4 border-gray-300 mx-auto"
            src={defUser}
            alt="User Profile"
          />
          <p className="text-lg font-bold mt-3 flex items-center justify-center gap-1">
            {chatUser.userData.name}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M.676 6.941A12.964 12.964 0 0 1 10 3c3.657 0 6.963 1.511 9.324 3.941a.75.75 0 0 1-.008 1.053l-.353.354a.75.75 0 0 1-1.069-.008C15.894 6.28 13.097 5 10 5 6.903 5 4.106 6.28 2.106 8.34a.75.75 0 0 1-1.069.008l-.353-.354a.75.75 0 0 1-.008-1.053Zm2.825 2.833A8.976 8.976 0 0 1 10 7a8.976 8.976 0 0 1 6.499 2.774.75.75 0 0 1-.011 1.049l-.354.354a.75.75 0 0 1-1.072-.012A6.978 6.978 0 0 0 10 9c-1.99 0-3.786.83-5.061 2.165a.75.75 0 0 1-1.073.012l-.354-.354a.75.75 0 0 1-.01-1.05Zm2.82 2.84A4.989 4.989 0 0 1 10 11c1.456 0 2.767.623 3.68 1.614a.75.75 0 0 1-.022 1.039l-.354.354a.75.75 0 0 1-1.085-.026A2.99 2.99 0 0 0 10 13c-.88 0-1.67.377-2.22.981a.75.75 0 0 1-1.084.026l-.354-.354a.75.75 0 0 1-.021-1.039Zm2.795 2.752a1.248 1.248 0 0 1 1.768 0 .75.75 0 0 1 0 1.06l-.354.354a.75.75 0 0 1-1.06 0l-.354-.353a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {chatUser.userData.bio}
          </p>
        </div>

        <hr className="border-gray-500 mb-6" />

        {/* Media Section */}
        <div className="text-sm">
          <p className="font-bold text-gray-300">Media</p>
          <div className="flex flex-wrap gap-2 mt-3 max-h-40 overflow-y-scroll">
            {/* In future */}
          </div>
        </div>

        <div className='flex justify-center items-center mt-4'>
          <button className='bg-blue-700 px-4 py-2 hover:bg-blue-600'>Remove User</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopUp;
