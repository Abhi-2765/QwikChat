import React from 'react';
import logo from '../assets/profile2.svg';
import defUser from '../assets/default.png';

const LeftSidebar = () => {
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
              <p className="cursor-pointer text-[15px] hover:font-bold">Edit Profile</p>
              <hr className="border-gray-300 my-2" />
              <p className="cursor-pointer text-[15px] hover:font-bold">Logout</p>
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
          />
        </div>

        {/* Friends Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Friends</h2>
          <div className="space-y-2 overflow-y-scroll h-80 pr-2">
            {/* Friend Item */}
            {Array(12)
              .fill("")
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 bg-[#002670] rounded-lg hover:bg-gradient-to-br from-blue-800 via-blue-600 to-pink-400 hover:text-white transition"
                >
                  <img
                    src={defUser}
                    alt={`Friend ${index + 1}`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Friend {index + 1}</p>
                    <span className="text-sm text-gray-400 hover:text-white">
                      Hello, how are you?
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
