import React, { useState } from 'react';
import defUser from '../assets/default.png';
import nature from '../assets/nature.jpg';
import ProfilePopUp from './ProfilePopUp';

const Chatbox = () => {

  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <div className="h-screen relative bg-blue-200 flex flex-col">
      {/* Chat Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b bg-blue-300 shadow-sm cursor-pointer" onClick={()=>{setShowPopUp(true)}}>
        <img
          className="w-12 h-12 rounded-full border-2 border-gray-300"
          src={defUser}
          alt="User"
        />
        <p className="flex-1 font-semibold text-lg text-black">User</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
        >
          <path
            fillRule="evenodd"
            d="M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 0 1-.522 1.756.75.75 0 0 0 .584 1.143 5.976 5.976 0 0 0 3.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-2-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {showPopUp && <ProfilePopUp onClose={()=>{setShowPopUp(false)}}/>}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-scroll px-4 py-2 bg-blue-100">
        {/* Sender's Message */}
        <div className="flex justify-end gap-2 mb-4">
          <div className="text-right">
            <p className="bg-blue-400 text-white font-medium text-sm px-4 py-2 rounded-lg max-w-80">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique totam mollitia deleniti natus eligendi expedita ea dolor molestiae dicta. Ipsam praesentium odio minima hic provident tenetur dolore exercitationem maiores optio?
            </p>
            <p className="text-xs text-gray-400 mt-1">9:45 AM</p>
          </div>
          <img
            className="w-8 h-8 rounded-full"
            src={defUser}
            alt="Sender"
          />
        </div>

        {/* Sender's Image Message */}
        <div className="flex justify-end gap-2 mb-1">
          <div className="text-right">
            <img
              className="max-w-60 rounded-md"
              src={nature}
              alt="Nature"
            />
            <p className="text-xs text-gray-400 mt-1">9:47 AM</p>
          </div>
          <img
            className="w-8 h-8 rounded-full"
            src={defUser}
            alt="Sender"
          />
        </div>

        {/* Receiver's Message */}
        <div className="flex justify-start gap-2 mb-4">
          <img
            className="w-8 h-8 rounded-full"
            src={defUser}
            alt="Receiver"
          />
          <div className="text-left">
            <p className="bg-gray-200 text-black font-medium text-sm px-4 py-2 rounded-lg max-w-80">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, ex quam sequi commodi, maiores veritatis voluptatibus beatae dolorum repellendus iste modi. Magnam ipsum eius sint inventore, fugiat eum velit eaque.
            </p>
            <p className="text-xs text-gray-400 mt-1">9:50 AM</p>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white shadow-md">
        <input
          className="flex-1 px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Send a message..."
        />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image" className="cursor-pointer text-gray-600 hover:text-blue-500 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
