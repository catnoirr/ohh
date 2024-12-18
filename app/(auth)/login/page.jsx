"use client"

import React from "react";
import  { useEffect, useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "@/firebase";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

import { FaArrowRight } from "react-icons/fa";
import {useRouter} from 'next/navigation'
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter()
    const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const credential = provider.credentialFromResult(result);
        const token = credential.accessToken;
        setUser(result.user); // Save user info
        console.log("Logged in user:", result.user);
  
        // Redirect to the Users section
        router.push("/users"); // Assuming '/users' is your Users section route
      } catch (error) {
        console.error("Error during sign-in:", error);
      }
    };
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
    <div className="flex flex-col md:flex-row  signup h-screen mb-10 ">
        <div className=" w-full md:w-[700px] bg-white ">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center bg-gradient-to-b signup  text-white px-16 py-16 rounded-br-[80px] h-full  ">
      <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="w-16 mb-6 self-start relative right-12 bottom-10"
          />
     
        <div className="text-center">
          
          <div className="relative  mx-auto">
            <div className="w-80 h-80  rounded-full shadow-2xl relative bottom-20 " style={{background: 'linear-gradient(180deg, rgba(157, 92, 255, 0.3) 0%, rgba(250, 250, 250, 0.3) 100%)'
}}>
            <img
              src="/boy.png" // Replace with the image path of the person and icons
              alt="Social Media Engagement"
              className="w-[300px] relative top-20  left-4 "
            />
            
          </div>
          </div>
        </div>
        <p className="mt-8 mb-4 text-xs">Dont have an account?</p>
        <div class="flex items-center justify-center  ">
  <button class="group relative flex items-center  bg-white text-black font-medium px-6 py-2  overflow-hidden transition-all duration-300 w-40 hover:w-52 rounded-lg hover:rounded-r-3xl">
    <span class="flex-1 text-center group-hover:text-black transition duration-300 text-black" onClick={() => router.push('/signup')}>Sign Up</span>
    <span
      class="flex items-center justify-center bg-white text-purple-800 w-8 h-8 rounded-full ml-3 transition-all duration-300  group-hover:text-white group-hover:bg-[#4D1B99] "
    >
      <FaArrowRight />
    </span>
  </button>
</div>

      </div>

      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center w-full  p-40   rounded-tl-[80px] bg-white">
        <div className="w-full max-w-md ">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Log In</h2>
          <form className="space-y-4 "  onSubmit={handleSubmit}>
            
            <input
              type="email"
              placeholder="Email"
              className="w-full  bg-[#F2F0F5]  p-2 focus:outline-none focus:ring-2 focus:ring-oohpoint-primary-3"
              required
               
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full  bg-[#F2F0F5]  p-2 focus:outline-none focus:ring-2 focus:ring-oohpoint-primary-3"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full submit-button text-white py-3 rounded-lg hover:bg-purple-700"
              disabled={loading}
            >
             {loading ? "Loging in..." : "Log In"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="w-full bg-[#25417D] text-white  text-sm font-base rounded-lg flex   mb-4 justify-evenly">
            <div className=" h-12 w-12 flex justify-center items-center bg-[#3A559F]">
            <img
              src="/call.png" // Replace with Truecaller icon
              alt="Truecaller"
              className="w-5 h-5 "
            />
            </div>
            <div className="flex-1 p-3">
            Log In with Truecaller
            </div>
          </button>
          <button className="w-full  text-gray-400 border  text-sm font-base flex   mb-4 justify-evenly" onClick={handleGoogleSignIn}>
            <div className=" h-12 w-12 flex justify-center items-center border-r ">
            <img
              src="/Googlelogo.png" // Replace with Truecaller icon
              alt="Truecaller"
              className="w-5 h-5 "
            />
            </div>
            <div className="flex-1 p-3">
            Log In with Google
            </div>
          </button>

          <p className="text-sm text-gray-600 mt-4 text-center">
            By signing up, you accept the{" "}
            <a href="/terms" className="text-[#567EFF] underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[#567EFF] underline">
              Privacy Policy
            </a>.
          </p>

          
        </div>
      </div>
    </div>
  );
};

export default SignUp;
