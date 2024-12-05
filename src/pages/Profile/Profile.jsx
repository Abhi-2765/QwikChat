import React, { useContext, useEffect, useState } from 'react'; 
import { useForm } from 'react-hook-form';
import defUser from '../../assets/default.png';
import Icon from '../../assets/profile2.svg';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../Config/firebase';
import { toast } from 'react-toastify';
import { AppContext } from '../../Context/AppContext';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const nav = useNavigate();
  const [image, setImage] = useState(null); 
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const {setUserData} = useContext(AppContext);

  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        setUid(user.uid);
        const docReference = doc(db, "users", user.uid);
        const docSnap = await getDoc(docReference);

        if( docSnap.data().name){
          setName( docSnap.data().name);
        }
        if( docSnap.data().bio){
          setBio( docSnap.data().bio);
        }
      }
      else{
        nav('/');
      }
    })
  }, [])

  //OnSubmit
  const onSubmit = async () => {
    try {
      const docReference = doc(db, 'users', uid);
      await updateDoc(docReference,{
        bio: bio,
        name: name
      })

      const snap = await getDoc(docReference);
      setUserData(snap.data());
      console.log(snap.data());
      nav('/chat')
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-pink-400 filter brightness-75 contrast-90 sepia-30 flex items-center justify-center px-4">
      <div className="bg-blue-100 rounded-lg shadow-xl overflow-hidden w-full max-w-lg">
        {/* Header Section */}
        <div className="bg-[#001030] text-white py-4 px-6 text-center">
          <div className="flex justify-center items-center">
            <img src={Icon} alt="QwikChat Logo" className="w-10 h-10 mr-3" />
            <span className="text-2xl font-semibold">QwikChat</span>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center">Your Profile</h2>

          {/* Profile Image Upload */}
          <div className="flex flex-col items-center gap-2">
            {/* How?? */}
            <label htmlFor="image" className="relative cursor-pointer group">
              <img
                src={image ? URL.createObjectURL(image) : defUser} // Show curr or def img
                alt="Default User"
                className="w-24 h-24 rounded-full border-4 border-gray-300 group-hover:border-blue-500 transition-all"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 text-white text-sm font-semibold">
                Upload
              </span>
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              {...register('image')}
              onChange={(e) => setImage(e.target.files[0])} // Explain
            />
          </div>

          {/* Username Input */}
          <div>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('UserName', {
                required: 'Username is required',
                minLength: {
                  value: 4,
                  message: 'Must be at least 4 characters',
                },
                maxLength: {
                  value: 15,
                  message: 'Must be at most 15 characters',
                },
              })}
              placeholder="Your Name"
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
            {errors.UserName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.UserName.message}
              </p>
            )}
          </div>

          {/* Bio Input */}
          <div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              {...register('bio')}
              placeholder="Write a short bio about yourself..."
              rows="4"
              onChange={(e)=>setBio(e.target.value)}
              value={bio}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
