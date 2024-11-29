"use client";
import { MyContext } from "@/context/MyContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { PiBellLight } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const router = useRouter();
  const { isOpen, setIsOpen } = useContext(MyContext);
  return (
    <div className=" md:min-h-[6rem] min-h-[10rem] w-full flex md:flex-row justify-between items-center py-4 md:px-12 px-2 flex-col-reverse gap-4 bg-white">
      <div className="flex gap-4 items-center justify-center">
        <p className=" font-semibold">Sort:</p>
        <select className="rounded-lg border border-oohpoint-grey-200 py-1 px-2 text-[0.9rem] text-oohpoint-grey-300">
          <option value="week">Last week</option>
          <option value="month">Last month</option>
          <option value="year">Last year</option>
        </select>
      </div>
      <div className="flex gap-2 items-center justify-around sm:justify-center sm:gap-8 sm:w-auto w-full">
        <RxHamburgerMenu
          onClick={() => setIsOpen(!isOpen)}
          className=" text-3xl  md:hidden block text-oohpoint-grey-300"
        />
        <div
          onClick={() => router.push("/notifications")}
          className=" relative cursor-pointer"
        >
          <PiBellLight className=" text-3xl text-oohpoint-grey-300" />
          <div className=" absolute top-0 right-0 size-3 bg-red-500 rounded-full border-2 border-white"></div>
        </div>
        <div className=" flex gap-4 justify-center items-center">
          <div className="relative">
            <Image
              src="/profile.png"
              alt="profile"
              width={1000}
              height={1000}
              className=" size-16 rounded-full"
            />
            <div className=" absolute top-0 right-0 size-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className=" flex flex-col justify-center items-start">
            <p className=" font-bold text-lg text-oohpoint-primary-1">Pankaj</p>
            <p className=" text-[0.9rem] text-oohpoint-grey-300 font-light">
              pankaj@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
