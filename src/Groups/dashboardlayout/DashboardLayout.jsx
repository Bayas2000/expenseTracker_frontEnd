import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import GroupHeader from "./GroupHeader";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const sidebarToggle = useSelector(
    (state) => state.sidebar.groupSidebarToggle
  );

  return (
    <div className="flex min-h-screen">
      <div className={`z-9999 `}>
        <Sidebar />
      </div>
      <main className="flex-1 bg-gray-100 ">
        <GroupHeader />

        <div
          className={` min-h-screen bg-gray-50 ${
            sidebarToggle ? "lg:w-[81%] ml-64 " : "ml-8 p-6 pt-0 pr-0"
          } `}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
