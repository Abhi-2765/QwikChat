import React, { useState } from 'react';
import Icon from '../../assets/profile2.svg';
import { useForm } from "react-hook-form";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Submit Function
  async function Submit(data) {
    await new Promise((resolve) => setTimeout(resolve, 3000)); 
    console.log("Submitted data:", data);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly h-screen w-screen bg-gradient-to-br from-blue-800 via-blue-600 to-pink-400">
      {/* Icon */}
      <img className="w-[30%] max-w-[300px] mb-8 md:mb-0" src={Icon} alt="icon" />

      {/* Form */}
      <form
        className="flex flex-col items-center gap-6 bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md"
        onSubmit={handleSubmit(Submit)}
      >
        <h1 className="font-bold text-xl">{currState}</h1>

        {/* Username Field */}
        {currState === "Sign Up" && (
          <div className="w-full">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("UserName", {
                required: "Username is required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Must be at most 15 characters",
                },
              })}
              placeholder="Username"
            />
            {errors.UserName && (
              <p className="text-red-500 text-sm mt-1">{errors.UserName.message}</p>
            )}
          </div>
        )}

        {/* Email Field */}
        <div className="w-full">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 6 characters",
              },
              pattern:{
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                message: 'Password must contain uppercase letters,lowercase letters, numbers, special characters'
              }
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Terms Checkbox for Sign Up */}
        {currState === "Sign Up" && (
          <div className="w-full flex items-center gap-3">
            <input
              type="checkbox"
              {...register("terms", { required: "You must agree to the terms" })}
              className="h-4 w-4"
            />
            <label className="text-gray-700 text-sm">
              Agree to the terms of use & privacy policy
            </label>
          </div>
        )}
        {errors.terms && (
          <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {/* Submit */}
        <p className="text-sm">
          {currState === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            className="text-blue-800 underline cursor-pointer"
            onClick={() =>
              setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")
            }
          >
            {currState === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
