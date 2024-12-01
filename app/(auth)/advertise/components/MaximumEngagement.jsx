"use client";
import { useRouter } from "next/navigation";
export default function MaximumEngagement() {
    const router = useRouter();
    return (
        <div className=" w-full text-center theme text-white  flex justify-center ">
            <div className="py-44 flex flex-col justify-center items-center  space-y-8 ">

            <div className="sm:w-[650px] space-y-7">
            <h1 className="md:text-5xl text-3xl font-bold space-y-4  text-center ">Maximize Engagement at Your Next Big Event!</h1>
            </div>
            <p>Explore our focused communities designed to cater to different professional needs</p>

            <div className="flex justify-center items-center">
                <button onClick={() => router.push('/sign-up')} className="p-4 border shadow-lg rounded text-white">Advertise Now</button>
            </div>
            </div>   
           </div>
    );
    }