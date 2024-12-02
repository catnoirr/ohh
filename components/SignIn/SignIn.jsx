"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.webp";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase"; // Assuming you have Firebase initialized in a file called firebase.js
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already logged in, redirect to dashboard
        // toast.success("Already logged in...");
        router.push("/users"); // Adjust the route as per your application
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // Using Firebase auth to sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        toast.success("Login successful.");
        router.push("/users"); // Adjust the route as per your application
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full bg-[#381D61] " id="section3">
      {/* Background Gradient */}
      <div className="  bg-[#381D61]"></div>

      {/* Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url('/bg-signin.png')` }}
      ></div> */}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center py-24 pb-40   w-full text-white">
        {/* Logo */}
        <Image src={logo} height={100} width={100} alt="Logo" />

        {/* Form Container */}
        <div className=" p-5 lg:p-12 rounded-lg  w-full max-w-lg mt-8">
          {/* <h2 className="text-sm font-bold text-center mb-6 text-[#666666]">
            Please fill in your unique admin login details below
          </h2> */}

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="text-black">
              {/* <label
                htmlFor="email"
                className="block text-sm font-medium text-[#666666]"
              >
                Email Address
              </label> */}
              <input
                type="email"
                id="email"
                className="w-full px-3 py-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-oohpoint-grey-200 mt-2 border-none shadow-lg "
                placeholder="Email"
                required
               
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="text-black">
              {/* <label
                htmlFor="password"
                className="block text-sm font-medium text-[#666666]"
              >
                Password
              </label> */}
              <input
                type="password"
                id="password"
                className="bg-oohpoint-grey-200 mt-2 w-full px-3 py-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent border-none shadow-lg"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

           
            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 mt-6 submit-button hover:bg-purple-700 text-white font-semibold  shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? "Loging in..." : "Log In"}
            </button>
            <div
              onClick={() => router.push("/forget-password")}
              className="w-full flex justify-center cursor-pointer"
            >
              <h3 className="text-sm font-medium text-[#567EFF]">
                Forgot Password?
              </h3>
            </div>
            <div class="flex items-center">
  <hr class="flex-1 border-[#B2B0B0]" />
  <span class="px-2 text-[#B2B0B0]">or</span>
  <hr class="flex-1 border-[#B2B0B0]" />
</div>
   {/* Google authentication */}

   
      <button className="flex items-center justify-center   bg-transparent border border-white">
      <Image src="/googlelogo.png" height={14} width={54} alt="Logo" className=" border-r border-[#ACA9A9] w-14 p-2" />
        <span className="ml-3 text-[#BAB3B3] font-medium flex-1">Log In with Google</span>
      </button>
     

          </form>
          <h2 className="text-sm font-bold text-center mt-6 text-white">
            Don't have an account?{" "} 
            <span
              className="pl-1  cursor-pointer text-[#567EFF]"
              onClick={() => router.push("/sign-up")}
            >
             Sign Up
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
