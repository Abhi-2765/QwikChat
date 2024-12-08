import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../Config/firebase";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) =>{
    
    const nav = useNavigate();
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState([]);
    const [messagesId, setMessagesId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatUser, setChatUser] = useState(null);

    const loadUserData = async(uid) =>{
        try {

            //Since user data is used every where we created appContext and name is in userdata so we kept nav to profile
            //here and not in app.jsx
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            setUserData(userData);
            {/* Add && userData.avatar in future*/}
            if(userData.name ){
                nav('/chat');
            }
            else{
                nav('/profile');
            }

            await updateDoc(userRef,{
                lastSeen:Date.now()
            })
            setInterval(async ()=>{
                if(auth.chatUser){
                    await updateDoc(userRef, {
                        lastSeen:Date.now()
                    })
                }
            }, 60000)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if(userData){
            const chatRef = doc(db, "chats", userData.id);
            const unSub = onSnapshot(chatRef, async (res)=>{
                const chatItems = res.data().chatsData;
                const tempData = [];
                for(const item of chatItems){
                    const userRef = doc(db, 'users', item.rId);
                    const userSnap = await getDoc(userRef);
                    const userData = userSnap.data();
                    tempData.push({...item, userData});
                }
                setChatData(tempData.sort((a, b)=>{b.updatedAt - a.updatedAt}));
            })
            return () => {
                unSub();
            }
        }
    }, [userData])

    const value = {
        userData, setUserData,
        chatData, setChatData,
        loadUserData,
        messages,setMessages,
        chatUser,setChatUser,
        messagesId, setMessagesId
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider