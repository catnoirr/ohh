"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { CiBellOn, CiFileOn, CiHome, CiLogout, CiShop } from "react-icons/ci";
import { MdOutlineInsights } from "react-icons/md";
import { IoBackspaceOutline, IoMailUnreadOutline } from "react-icons/io5";
import {
  PiHandshakeLight,
  PiHexagonLight,
  PiUsersThreeLight,
} from "react-icons/pi";
import { MyContext } from "@/context/MyContext";

const Sidebar = () => {
  const router = useRouter();
  const { isOpen, setIsOpen } = useContext(MyContext);
  const pathname = usePathname();
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`h-screen w-[19rem] text-oohpoint-grey-300 bg-oohpoint-primary-1 rounded-r-[3rem] md:relative justify-center items-start p-4 md:flex ${
        isOpen
          ? "flex fixed z-50 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
          : "hidden"
      }`}
    >
      <IoBackspaceOutline
        onClick={() => setIsOpen(false)}
        className=" text-3xl absolute top-4 left-4 md:hidden block"
      />
      <div
        className="absolute inset-0 bg-design-bg bg-contain bg-center bg-repeat"
        style={{
          filter: "opacity(0.2)",
        }}
      ></div>
      <div className=" flex gap-8 justify-center items-center flex-col z-10">
        <Image
          src="/logo.webp"
          alt="logo"
          width={1000}
          height={1000}
          className=" h-16 w-auto mt-4"
        />
        <div className="flex flex-col gap-4 justify-center items-start">
          <div
            onClick={() => router.push("/")}
            className={`flex gap-4 justify-center items-center cursor-pointer relative ${
              pathname === "/" ? "text-white" : ""
            }`}
          >
            <CiHome className="text-3xl" />
            <p>Dashboard</p>
            <div
              className={`absolute w-1 h-12 bg-oohpoint-grey-100 -left-20 ${
                pathname === "/" ? "block" : "hidden"
              }`}
            ></div>
          </div>

          <div
            onClick={() => router.push("/vendors")}
            className={`flex gap-4 justify-center items-center cursor-pointer relative ${
              pathname === "/vendors" ? "text-white" : ""
            }`}
          >
            <PiHandshakeLight className="text-3xl" />
            <p>Vendors</p>
            <div
              className={`absolute w-1 h-12 bg-oohpoint-grey-100 -left-20 ${
                pathname === "/vendors" ? "block" : "hidden"
              }`}
            ></div>
          </div>

          <div
            onClick={() => router.push("/users")}
            className={`flex gap-4 justify-center items-center cursor-pointer relative ${
              pathname === "/users" ? "text-white" : ""
            }`}
          >
            <PiUsersThreeLight className="text-3xl" />
            <p>Users</p>
            <div
              className={`absolute w-1 h-12 bg-oohpoint-grey-100 -left-20 ${
                pathname === "/users" ? "block" : "hidden"
              }`}
            ></div>
          </div>

          <div
            onClick={() => router.push("/brands")}
            className={`flex gap-4 justify-center items-center cursor-pointer relative ${
              pathname === "/brands" ? "text-white" : ""
            }`}
          >
            <PiHexagonLight className="text-3xl" />
            <p>Brands</p>
            <div
              className={`absolute w-1 h-12 bg-oohpoint-grey-100 -left-20 ${
                pathname === "/brands" ? "block" : "hidden"
              }`}
            ></div>
          </div>

          <div
            onClick={() => router.push("/campaigns")}
            className={`flex gap-4 justify-center items-center cursor-pointer relative ${
              pathname === "/campaigns" ? "text-white" : ""
            }`}
          >
            <CiShop className="text-3xl" />
            <p>Campaigns</p>
            <div
              className={`absolute w-1 h-12 bg-oohpoint-grey-100 -left-20 ${
                pathname === "/campaigns" ? "block" : "hidden"
              }`}
            ></div>
          </div>

          <div
            onClick={() => router.push("/content")}
            className={`flex gap-4 justify-center items-center cursor-pointer relative ${
              pathname === "/content" ? "text-white" : ""
            }`}
          >
            <CiFileOn className="text-3xl" />
            <p>Content</p>
            <div
              className={`absolute w-1 h-12 bg-oohpoint-grey-100 -left-20 ${
                pathname === "/content" ? "block" : "hidden"
              }`}
            ></div>
          </div>

          <div
            onClick={() => router.push("/queries")}
            className={`flex gap-4 justify-center items-center cursor-pointer relative ${
              pathname === "/queries" ? "text-white" : ""
            }`}
          >
            <CiBellOn className="text-3xl" />
            <p>Queries</p>
            <div
              className={`absolute w-1 h-12 bg-oohpoint-grey-100 -left-20 ${
                pathname === "/queries" ? "block" : "hidden"
              }`}
            ></div>
          </div>

          <div
            onClick={() => router.push("/notifications")}
            className={`flex gap-4 justify-center items-center cursor-pointer relative ${
              pathname === "/notifications" ? "text-white" : ""
            }`}
          >
            <IoMailUnreadOutline className="text-3xl" />
            <p>Notifications</p>
            <div
              className={`absolute w-1 h-12 bg-oohpoint-grey-100 -left-20 ${
                pathname === "/notifications" ? "block" : "hidden"
              }`}
            ></div>
          </div>

          <div
            onClick={() => router.push("/reports")}
            className={`flex gap-4 justify-center items-center cursor-pointer relative ${
              pathname === "/reports" ? "text-white" : ""
            }`}
          >
            <MdOutlineInsights className="text-3xl" />
            <p>Reports</p>
            <div
              className={`absolute w-1 h-12 bg-oohpoint-grey-100 -left-20 ${
                pathname === "/reports" ? "block" : "hidden"
              }`}
            ></div>
          </div>

          <div
            onClick={() => router.push("/login")}
            className="flex gap-4 justify-center items-center cursor-pointer absolute bottom-[2rem]"
          >
            <CiLogout className="text-3xl" />
            <p>Log out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
