"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.webp";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("User created successfully.");
        router.push("/sign-in"); // Redirect to login after successful signup
      } else {
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setErrorMessage("Failed to create an account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full bg-[#381D61]" id="section3">
      {/* Background Gradient */}

      {/* Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url('/bg-signin.png')` }}
      ></div> */}

      {/* Content */}
      <div className="flex flex-col justify-center items-center w-full py-20 text-white">
        {/* Logo */}
        <Image src={logo} height={100} width={100} alt="Logo" />

        {/* Form Container */}
        <div className=" p-5 lg:p-12 rounded-lg  w-full max-w-lg mt-8">
          {/* <h2 className="text-sm font-bold text-center mb-6 text-[#666666]">
            Please fill in your signup details below
          </h2> */}

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email Field */}
             {/* Name Field */}
             <div className=" text-black">
              {/* <label
                htmlFor="name"
                className="block text-sm font-medium text-[#666666]"
              >
                Name
              </label> */}
              <input
                type="text"
                id="name"
                className="bg-oohpoint-grey-200 mt-2 w-full px-3 py-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent border-none"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" text-black">
              {/* <label
                htmlFor="email"
                className="block text-sm font-medium text-[#666666]"
              >
                Email Address
              </label> */}
              
              <input
                type="email"
                id="email"
                className=" w-full px-3 py-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-oohpoint-grey-200 mt-2 border-none"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className=" text-black">
              {/* <label
                htmlFor="password"
                className="block text-sm font-medium text-[#666666]"
              >
                Password
              </label> */}
              <input
                type="password"
                id="password"
                className="bg-oohpoint-grey-200 mt-2 w-full px-3 py-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent border-none"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

           

            {/* Error and Success Messages */}
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm text-center">
                {successMessage}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 mt-6 submit-button hover:bg-purple-700 text-white font-semibold  shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <div class="flex items-center">
  <hr class="flex-1 border-[#B2B0B0]" />
  <span class="px-2 text-[#B2B0B0]">or</span>
  <hr class="flex-1 border-[#B2B0B0]" />
</div>

<button className="flex items-center justify-center   bg-transparent border border-white">
        {/* <img
          src="/googlelogo.png"
          alt="Google Logo"
          className=" border-r border-[#ACA9A9] w-14 p-2"
        /> */}
                <Image src="/Googlelogo.png" height={14} width={54} alt="Logo" className=" border-r border-[#ACA9A9] w-14 p-2" />

        <span className="ml-3 text-[#BAB3B3] font-medium flex-1">Sign Up with Google</span>
      </button>
          <p className="text-center py-6">By signing in you accept the <span  className="  cursor-pointer text-[#567EFF]">terms of Services</span> and <span  className="  cursor-pointer text-[#567EFF]">Privacy Policy</span> </p>
          </form>
          
          <h2 className="text-sm font-bold text-center mt-6 ">
            Already have an account? <span className=" pl-1 cursor-pointer text-[#567EFF]" onClick={() => router.push("/sign-in")}>Login</span>
          </h2>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
