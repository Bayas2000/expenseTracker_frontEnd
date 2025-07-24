import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import GroupHeader from "./GroupHeader";
import { useSelector } from "react-redux";
import BottomBar from "../Sidebar/GroupBottombar";

const DashboardLayout = () => {
  const sidebarToggle = useSelector(
    (state) => state.sidebar.groupSidebarToggle
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className={`z-9999 hidden lg:block`}>
          <Sidebar />
        </div>
        <main className="flex-1 bg-gray-100">
          <GroupHeader />
          <div
            className={`min-h-screen bg-gray-50 ${
              sidebarToggle ? "lg:w-[81%] ml-64" : "lg:ml-8 lg:pl-6 pt-0 pr-0"
            }`}
          >
            <Outlet />
          </div>
        </main>
      </div>

      {/* BottomBar for mobile */}
      <BottomBar />
    </div>
  );
};

export default DashboardLayout;
