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

const Main = () => {
  const state = useSelector((state) => state.sidebar?.sidebarToggle);
  const mode = useSelector((state) => state.theme.mode);

  const isLargeScreen = useIsLargeScreen();

  const renderContent = () => {
    switch (state) {
      case "home":
        return <Content />;
      case "stats":
        return <Stats />;
      case "profile":
        return <Profile />;
      case "setting":
        return <Setting />;
      default:
        return null;
    }
  };

  return (
    <div className="w-[100%] lg:pb-0  pb-[4rem]">
      <Header />
      <div
        className={`w-full flex  ${
          mode == "dark" ? "bg-[#1D2730] text-[#F1F1F1]" : "bg-[#f5f6fa]"
        }`}
      >
        {isLargeScreen ? (
          <div className=" w-[20%] flex justify-center mt-[8%] ">
            <Sidebar />
          </div>
        ) : null}

        {state == "home" ? (
          <div
            className={`lg:w-[90%] w-[100%] min-h-screen ${
              !isLargeScreen ? "w-[100%]" : ""
            }`}
          >
            <Content />
          </div>
        ) : state == "stats" ? (
          <div
            className={`lg:w-[90%] w-[100%] min-h-screen ${
              !isLargeScreen ? "w-[100%]" : ""
            }`}
          >
            <Stats />
          </div>
        ) : state == "profile" ? (
          <div
            className={`lg:w-[90%] w-[100%] h-screen overflow-hidden  ${
              !isLargeScreen ? "w-[100%]" : ""
            }`}
          >
            <Profile />
          </div>
        ) : state == "setting" ? (
          <div
            className={`lg:w-[90%] w-[100%] h-screen ${
              !isLargeScreen ? "w-[100%]" : ""
            }`}
          >
            <Setting />
          </div>
        ) : null}
      </div>
      {/* <div className=" bg-blue-300 w-[100%]">
      {state == "home" ? (
          <div className={` ${!isLargeScreen ? "w-[100%]" : ""}`}>
            <Content />
          </div>
        ) : state == "stats" ? (
          <div className="">
            <Stats />
          </div>
        ) : state == "profile" ? (
          <div className=" ">
            <Profile />
          </div>
        ) : state == "setting" ? (
          <div className=" ">
            <Setting />
          </div>
        ) : null}
      </div> */}
      {!isLargeScreen && (
        <div className=" w-[100%]  flex justify-center fixed bottom-0 left-0 z-50">
          <BottomBar />
        </div>
      )}
    </div>
  );
};

export default Main;
