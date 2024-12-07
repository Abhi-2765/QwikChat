import React, { useContext, useEffect, useRef, useState } from "react";
import defUser from "../assets/default.png";
import logo from "../../public/profile.svg";
import ProfilePopUp from "./ProfilePopUp";
import { AppContext } from "../Context/AppContext";
import { doc, onSnapshot, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { toast } from "react-toastify";

const Chatbox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } = useContext(AppContext);
  const [input, setInput] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data()?.messages || []);
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId, setMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    try {
      if (input.trim() && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input.trim(),
            createdAt: new Date(),
          }),
        });

        const userIDs = [chatUser.rId, userData.id];
        for (const id of userIDs) {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );

            if (chatIndex !== -1) {
              userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
              userChatData.chatsData[chatIndex].updatedAt = Date.now();

              if (userChatData.chatsData[chatIndex].rId === userData.id) {
                userChatData.chatsData[chatIndex].messageSeen = false;
              }

              await updateDoc(userChatsRef, {
                chatsData: userChatData.chatsData,
              });
            }
          }
        }
        setInput("");
      }
    } catch (error) {
      toast.error(`Error sending message: ${error.message}`);
    }
  };

  const convertTimeStamp = (timestamp) => {
    const date = timestamp.toDate();
    const hour = date.getHours();
    const min = date.getMinutes().toString().padStart(2, "0");
    return hour > 12
      ? `${hour - 12}:${min} PM`
      : `${hour}:${min} AM`;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  

  return chatUser ? (
    <div className="h-screen relative bg-blue-200 flex flex-col">
      <div
        className="px-4 py-3 flex items-center gap-3 border-b bg-blue-300 shadow-sm cursor-pointer"
        onClick={() => setShowPopUp(true)}
      >
        <img
          className="w-12 h-12 rounded-full border-2 border-gray-300"
          src={defUser}
          alt="User"
        />
        <p className="flex-1 font-semibold text-lg text-black">
          {chatUser?.userData?.name}
        </p>
      </div>

      {showPopUp && <ProfilePopUp onClose={() => setShowPopUp(false)} />}

      <div className="flex-1 overflow-y-scroll px-4 py-2 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sId === userData.id ? "justify-end" : "justify-start"
            } gap-2 mb-4`}
          >
            {msg.sId !== userData.id && (
              <img
                className="w-8 h-8 rounded-full"
                src={defUser}
                alt="Receiver"
              />
            )}
            <div className={`text-${msg.sId === userData.id ? "right" : "left"}`}>
              <p
                className={`${
                  msg.sId === userData.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                } font-medium text-sm px-4 py-2 rounded-lg max-w-xs`}
              >
                {msg.text}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {convertTimeStamp(msg.createdAt)}
              </p>
            </div>
            {msg.sId === userData.id && (
              <img
                className="w-8 h-8 rounded-full"
                src={defUser}
                alt="Sender"
              />
            )}
          </div>
        ))}
        {/* Add a div to track the bottom of the messages */}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-3 px-4 py-3 bg-white shadow-md">
        <input
          className="flex-1 px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Send a message..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyDown={handleKeyPress}
        />
        <button
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white"
          onClick={sendMessage}
        >
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
  ) : (
    <div className="h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-pink-400 flex flex-col justify-center items-center text-center">
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-10 shadow-2xl max-w-md">
        <img
          src={logo}
          alt="QwikChat"
          className="mx-auto w-32 h-32 mb-6 animate-pulse"
        />
        <h1 className="text-4xl font-bold text-white mb-4 tracking-wide">
          Welcome to QwikChat!
        </h1>
        <p className="text-xl text-white/80 mb-6">
          Chat anytime, anywhere with anyone
        </p>
      </div>
    </div>
  );
};

export default Chatbox;
