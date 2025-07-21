import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { useSelector } from "react-redux";
import Stats from "./Stats";
import Profile from "./Profile";
import Setting from "./Setting";
import Header from "./Header";
import useIsLargeScreen from "./hooks/useLargeScreen";
import BottomBar from "./BottomBar";
import Goals from "./goals/Goals";
const Main = () => {
  const state = useSelector((state) => state.sidebar?.sidebarToggle);
  const mode = useSelector((state) => state.theme.mode);

  const isLargeScreen = useIsLargeScreen();

  // return (
  //   <div className="w-[100%] lg:pb-0  pb-[4rem]">
  //     {/* <Header /> */}
  //     <div
  //       className={`w-full flex  ${
  //         mode == "dark" ? "bg-[#1D2730] text-[#F1F1F1]" : "bg-[#f5f6fa]"
  //       }`}
  //     >
  //       {isLargeScreen ? (
  //         <div className=" w-[20%]">
  //           <Sidebar />
  //         </div>
  //       ) : null}

  //       {state == "home" ? (
  //         <div
  //           className={`lg:w-[90%] w-[100%] min-h-screen ${
  //             !isLargeScreen ? "w-[100%]" : ""
  //           }`}
  //         >
  //           <Content />
  //         </div>
  //       ) : state == "stats" ? (
  //         <div
  //           className={`lg:w-[90%] w-[100%] min-h-screen ${
  //             !isLargeScreen ? "w-[100%]" : ""
  //           }`}
  //         >
  //           <Stats />
  //         </div>
  //       ) : state == "profile" ? (
  //         <div
  //           className={`lg:w-[90%] w-[100%] h-screen overflow-hidden  ${
  //             !isLargeScreen ? "w-[100%]" : ""
  //           }`}
  //         >
  //           <Profile />
  //         </div>
  //       ) : state == "goals" ? (
  //         <div
  //           className={`lg:w-[90%] w-[100%] min-h-screen   ${
  //             !isLargeScreen ? "w-[100%]" : ""
  //           }`}
  //         >
  //           <Goals />
  //         </div>
  //       ) : state == "setting" ? (
  //         <div
  //           className={`lg:w-[90%] w-[100%] h-screen ${
  //             !isLargeScreen ? "w-[100%]" : ""
  //           }`}
  //         >
  //           <Setting />
  //         </div>
  //       ) : null}
  //     </div>
      
  //     {!isLargeScreen && (
  //       <div className=" w-[100%]  flex justify-center fixed bottom-0 left-0 z-50">
  //         <BottomBar />
  //       </div>
  //     )}
  //   </div>
  // );
  return (
  <div
    className={`flex min-h-screen w-full ${
      mode === "dark" ? "bg-[#1D2730] text-[#F1F1F1]" : "bg-[#f5f6fa]"
    }`}
  >
    {/* Sidebar (visible on large screens) */}
    {isLargeScreen && (
      <div className="w-[20%]">
        <Sidebar />
      </div>
    )}

    {/* Main Content Area */}
    <div className={`${isLargeScreen ? "w-[80%]" : "w-full"} pb-[4rem] lg:pb-0`}>
      {state === "home" && <Content />}
      {state === "stats" && <Stats />}
      {state === "profile" && <Profile />}
      {state === "goals" && <Goals />}
      {state === "setting" && <Setting />}
    </div>

    {/* Bottom Navigation Bar for Small Screens */}
    {!isLargeScreen && (
      <div className="w-full fixed bottom-0 left-0 z-50">
        <BottomBar />
      </div>
    )}
  </div>
);

};

export default Main;
