import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
	apiKey: "AIzaSyADjb67RCLQD4W__vYDuNFaqaQWVo_a2d4",
	authDomain: "qwikchat-27.firebaseapp.com",
	projectId: "qwikchat-27",
	storageBucket: "qwikchat-27.firebasestorage.app",
	messagingSenderId: "213554428038",
	appId: "1:213554428038:web:820d6801c4d3e314fbf907",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		console.log(res);
		const user = res.user;
		await setDoc(doc(db, "users", user.uid), {
			id: user.uid,
			username: username ? username.toLowerCase() : "",
			email,
			name: "",
			avatar: "",
			bio: "Hey there I am using QwikChat!",
			lastSeen: Timestamp.now(),
		});
		await setDoc(doc(db, "chats", user.uid), {
			chatsData: [],
		});
	} catch (error) {
		console.error(error);
		toast.error(error.code.split("/")[1].split("-").join(" "));
	}
};

const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.error(error);
		toast.error(error.code.split("/")[1].split("-").join(" "));
	}
};

const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error(error);
		toast.error(error.code.split("/")[1].split("-").join(" "));
	}
};

export { signup, login, logout, auth, db };
