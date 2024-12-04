import React, { useState } from 'react'; // Importing useState
import { useForm } from 'react-hook-form'; // Importing useForm from react-hook-form
import defUser from '../../assets/default.png';
import Icon from '../../assets/profile2.svg';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [image, setImage] = useState(null); // State to handle profile image

  const onSubmit = (data) => {
    console.log(data); // Log submitted data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-pink-400 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-lg">
        {/* Header Section */}
        <div className="bg-blue-500 text-white py-4 px-6 text-center">
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
            <label htmlFor="image" className="relative cursor-pointer group">
              <img
                src={image ? URL.createObjectURL(image) : defUser} // Dynamically show selected image or default
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
              accept="image/*" // Accept only image files
              {...register('image')}
              onChange={(e) => setImage(e.target.files[0])} // Update image state
            />
          </div>

          {/* Username Input */}
          <div>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('UserName', {
                required: 'Username is required',
                minLength: {
                  value: 6,
                  message: 'Must be at least 6 characters',
                },
                maxLength: {
                  value: 15,
                  message: 'Must be at most 15 characters',
                },
              })}
              placeholder="Your Name"
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
              {...register('bio', { required: 'Bio is required' })}
              placeholder="Write a short bio about yourself..."
              rows="4"
            ></textarea>
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
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
