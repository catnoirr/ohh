import Sidebar from "@/components/Sidebar";
import "@/app/globals.css";
import Header from "@/components/Header";
import { MyProvider } from "@/context/MyContext";
import { Toaster } from "react-hot-toast";
import Redirect from "@/components/Redirect";
import BottomBar from "@/components/BottomBar";
import MagicMenuIndicator from "@/components/bottombar/page";

export const metadata = {
  title: "OOH POINT",
  description: "OOH POINT USER",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className="bg-white mb-24">
        <MyProvider>
          <Toaster />
          <Redirect/>
          {children}
          {/* <div className="flex justify-between items-center w-full h-screen">
            <Sidebar />
            <div className="flex flex-col justify-start items-center md:w-[calc(100%-19rem)] w-full bg-oohpoint-grey-200 h-screen overflow-y-scroll">
              <Header />
              {children}
            </div>
          </div> */}
          <div className="sm:max-w-[30rem] w-full fixed bottom-0 left-[50%] transform -translate-x-[50%]">
            <BottomBar/>
            {/* <MagicMenuIndicator/> */}
          </div>
        </MyProvider>
      </body>
    </html>
  );
}
